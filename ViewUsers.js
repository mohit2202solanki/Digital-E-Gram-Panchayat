import React, { useEffect, useState } from 'react';
import { viewAllUsers } from '../../services/firestoreService';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Alert, 
  Button, 
  Card, 
  Spinner,
  Badge,
  InputGroup,
  FormControl,
  Row,
  Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faArrowLeft, 
  faSearch,
  faUser,
  faUserShield,
  faPhone,
  faEnvelope,
  faHome,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await viewAllUsers();
        const filteredUsers = userData.filter(user => user.role === 'user');
        setUsers(filteredUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile?.includes(searchTerm)
  );

  const renderRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return <Badge bg="danger">Admin</Badge>;
      case 'user':
        return <Badge bg="primary">User</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger">
        <Alert.Heading>Error Loading Users</Alert.Heading>
        <p>{error}</p>
      </Alert>
      <Button variant="primary" onClick={() => navigate('/admin/dashboard')}>
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back to Dashboard
      </Button>
    </Container>
  );

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            <span className="h4 mb-0">User Management</span>
          </div>
          <Button 
            variant="light" 
            onClick={() => navigate('/admin/dashboard')}
            size="sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
            Dashboard
          </Button>
        </Card.Header>

        <Card.Body>
          <InputGroup className="mb-4">
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              placeholder="Search users by name, email or phone..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </InputGroup>

          {filteredUsers.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredUsers.map(user => (
                <Col key={user.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                          {user.fullName || 'N/A'}
                        </h5>
                        {renderRoleBadge(user.role)}
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          Email
                        </small>
                        <p className="text-truncate">{user.email}</p>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faPhone} className="me-2" />
                          Mobile
                        </small>
                        <p>{user.mobile || 'N/A'}</p>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faHome} className="me-2" />
                          Address
                        </small>
                        <p className="text-truncate">{user.address || 'N/A'}</p>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => {/* Add view/edit functionality */}}
                        className="w-100"
                      >
                        <FontAwesomeIcon icon={faIdCard} className="me-1" />
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info" className="text-center">
              {searchTerm ? 'No matching users found' : 'No users available'}
            </Alert>
          )}

          <div className="mt-3 text-muted text-center">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </Card.Body>

        <Card.Footer className="bg-light d-flex justify-content-between">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate('/admin/dashboard')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back to Dashboard
          </Button>
          <div className="text-muted">
            Last updated: {new Date().toLocaleString()}
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ViewUsers;