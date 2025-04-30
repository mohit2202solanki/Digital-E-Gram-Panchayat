import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Button, 
  Card, 
  Row, 
  Col, 
  Nav, 
  Navbar, 
  Dropdown, 
  Badge,
  Image,
  Alert
} from 'react-bootstrap';
import { 
  Gear, 
  Person, 
  Search, 
  ListTask, 
  BoxArrowRight,
  Bell,
  Envelope
} from 'react-bootstrap-icons';
import './UserDashboard.css'; // Custom CSS file for additional styling

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Sample data - replace with actual data from your backend
  const notifications = [
    { id: 1, text: "Your application was approved", read: false },
    { id: 2, text: "New service available in your area", read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <Navbar bg="white" expand="lg" className="dashboard-navbar shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/user/dashboard" className="fw-bold text-primary">
            ServiceConnect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Dropdown className="mx-2">
                <Dropdown.Toggle variant="light" id="dropdown-notifications">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-sm">
                  {notifications.map(notification => (
                    <Dropdown.Item 
                      key={notification.id} 
                      className={!notification.read ? 'fw-bold' : ''}
                    >
                      {notification.text}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/user/notifications">
                    View all notifications
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <Dropdown className="ms-3">
                <Dropdown.Toggle variant="light" id="dropdown-profile">
                  <Image 
                    src={currentUser?.photoURL || 'https://via.placeholder.com/30'} 
                    roundedCircle 
                    width={30}
                    height={30}
                    className="me-2"
                  />
                  {currentUser?.displayName || 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-sm">
                  <Dropdown.Item as={Link} to="/user/profile">
                    <Person className="me-2" /> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/user/settings">
                    <Gear className="me-2" /> Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <BoxArrowRight className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <Row>
          <Col md={3}>
            {/* Sidebar Navigation */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/user/dashboard" className="active">
                    <ListTask className="me-2" /> Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user/search-services">
                    <Search className="me-2" /> Search Services
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user/my-applications">
                    <ListTask className="me-2" /> My Applications
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user/messages">
                    <Envelope className="me-2" /> Messages
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user/settings">
                    <Gear className="me-2" /> Settings
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Card>
            
            {/* Quick Stats */}
            <Card className="shadow-sm">
              <Card.Body>
                <h6 className="text-muted mb-3">Quick Stats</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Active Applications:</span>
                  <Badge bg="primary">3</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Pending Requests:</span>
                  <Badge bg="warning">2</Badge>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Completed Services:</span>
                  <Badge bg="success">5</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9}>
            {/* Welcome Banner */}
            <Card className="shadow-sm mb-4 bg-primary text-white">
              <Card.Body>
                <h4>Welcome back, {currentUser?.displayName || 'User'}!</h4>
                <p className="mb-0">
                  You have 3 active applications and 2 new messages.
                </p>
              </Card.Body>
            </Card>
            
            {/* Recent Activity */}
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title>Recent Activity</Card.Title>
                <Alert variant="info" className="d-flex align-items-center">
                  <ListTask size={20} className="me-3" />
                  <div>
                    Your application for "Plumbing Services" was approved.
                    <div className="text-muted small">2 hours ago</div>
                  </div>
                </Alert>
                <Alert variant="light" className="d-flex align-items-center">
                  <Envelope size={20} className="me-3" />
                  <div>
                    New message from Service Provider.
                    <div className="text-muted small">1 day ago</div>
                  </div>
                </Alert>
              </Card.Body>
            </Card>
            
            {/* Quick Actions */}
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Quick Actions</Card.Title>
                <Row>
                  <Col md={4} className="mb-3">
                    <Button 
                      as={Link} 
                      to="/user/search-services" 
                      variant="outline-primary" 
                      className="w-100 py-3 d-flex flex-column align-items-center"
                    >
                      <Search size={24} className="mb-2" />
                      Search Services
                    </Button>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Button 
                      as={Link} 
                      to="/user/my-applications" 
                      variant="outline-success" 
                      className="w-100 py-3 d-flex flex-column align-items-center"
                    >
                      <ListTask size={24} className="mb-2" />
                      My Applications
                    </Button>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Button 
                      as={Link} 
                      to="/user/profile" 
                      variant="outline-info" 
                      className="w-100 py-3 d-flex flex-column align-items-center"
                    >
                      <Person size={24} className="mb-2" />
                      My Profile
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;