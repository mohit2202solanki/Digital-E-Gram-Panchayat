import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Card, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchAdminData, updateAdminProfile } from '../../services/firestoreService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCog, 
  faArrowLeft, 
  faEdit, 
  faSave, 
  faTimes,
  faEnvelope,
  faMobileAlt,
  faHome,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';

const AdminProfile = () => {
  const { currentUser } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: ''
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdminData(currentUser.uid);
        setAdminData(data);
        setFormData({
          fullName: data.fullName || '',
          mobile: data.mobile || '',
          address: data.address || ''
        });
      } catch (error) {
        setError('Error fetching profile data');
      }
    };

    fetchData();
  }, [currentUser.uid]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateAdminProfile(currentUser.uid, formData);
      const updatedData = await fetchAdminData(currentUser.uid);
      setAdminData(updatedData);
      setEditMode(false);
    } catch (error) {
      setError('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Container className="py-5">
        <div className="d-flex justify-content-center">
          <Card className="shadow border-0" style={{ width: '100%', maxWidth: '650px', borderRadius: '15px' }}>
            <Card.Header className="bg-primary text-white py-3 text-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ width: '40px' }}></div>
                <h2 className="mb-0">
                  <FontAwesomeIcon icon={faUserCog} className="me-2" />
                  Admin Profile
                </h2>
                <Button 
                  variant="light" 
                  size="sm"
                  onClick={() => navigate('/admin/dashboard')}
                  style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
              </div>
            </Card.Header>
            
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="mb-4 text-center">{error}</Alert>}
              
              <div className="text-center mb-4">
                <div className="mx-auto mb-3" style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid #0d6efd'
                }}>
                  {adminData?.photoURL ? (
                    <Image 
                      src={adminData.photoURL} 
                      roundedCircle 
                      width="112"
                      height="112"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUserCog} size="3x" className="text-muted" />
                  )}
                </div>
                <h3 className="mb-1">{adminData?.fullName || 'Admin User'}</h3>
                <p className="text-muted mb-3">{currentUser?.email}</p>
                
                {!editMode && (
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setEditMode(true)}
                    className="mb-4"
                    style={{ borderRadius: '20px', padding: '5px 20px' }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {editMode ? (
                <Form onSubmit={handleUpdateProfile}>
                  <div className="mx-auto" style={{ maxWidth: '500px' }}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faIdCard} className="me-2 text-primary" />
                        Full Name
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="fullName"
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required
                        className="py-2"
                        style={{ borderRadius: '10px' }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faMobileAlt} className="me-2 text-primary" />
                        Mobile Number
                      </Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="mobile"
                        value={formData.mobile} 
                        onChange={handleChange} 
                        className="py-2"
                        style={{ borderRadius: '10px' }}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faHome} className="me-2 text-primary" />
                        Address
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3}
                        name="address"
                        value={formData.address} 
                        onChange={handleChange} 
                        className="py-2"
                        style={{ borderRadius: '10px' }}
                      />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-center gap-3">
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                        style={{ borderRadius: '20px', padding: '8px 25px' }}
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" className="me-2" />
                        ) : (
                          <FontAwesomeIcon icon={faSave} className="me-2" />
                        )}
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setEditMode(false)}
                        disabled={loading}
                        style={{ borderRadius: '20px', padding: '8px 25px' }}
                      >
                        <FontAwesomeIcon icon={faTimes} className="me-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              ) : (
                <div className="mx-auto" style={{ maxWidth: '500px' }}>
                  <div className="mb-4 p-3 bg-light rounded">
                    <div className="d-flex align-items-center mb-3">
                      <FontAwesomeIcon icon={faEnvelope} className="me-3 text-primary" />
                      <div>
                        <h6 className="mb-0 text-muted">Email</h6>
                        <p className="mb-0">{currentUser?.email || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FontAwesomeIcon icon={faMobileAlt} className="me-3 text-primary" />
                      <div>
                        <h6 className="mb-0 text-muted">Mobile</h6>
                        <p className="mb-0">{adminData?.mobile || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faHome} className="me-3 text-primary" />
                      <div>
                        <h6 className="mb-0 text-muted">Address</h6>
                        <p className="mb-0">{adminData?.address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!editMode && (
                <div className="text-center mt-4">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ borderRadius: '20px', padding: '8px 25px' }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Back to Dashboard
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AdminProfile;