import React, { useEffect, useState } from 'react';
import { 
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Image,
  Row,
  Col,
  Modal,
  Badge
} from 'react-bootstrap';
import { 
  PencilSquare,
  XCircle,
  CheckCircle,
  PersonCircle,
  Telephone,
  GeoAlt,
  Envelope,
  Camera,
  ArrowLeft
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchStaffData, updateStaffProfile } from '../../services/firestoreService';

const StaffProfile = () => {
  const { currentUser } = useAuth();
  const [staffData, setStaffData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStaffData(currentUser.uid);
        setStaffData(data);
        setFullName(data.fullName || '');
        setMobile(data.mobile || '');
        setAddress(data.address || '');
        setPhotoURL(data.photoURL || '');
      } catch (error) {
        setError('Failed to load profile data');
      }
    };

    fetchData();
  }, [currentUser.uid]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await updateStaffProfile({ 
        id: currentUser.uid, 
        fullName, 
        mobile, 
        address,
        photoURL
      });
      
      const updatedData = await fetchStaffData(currentUser.uid);
      setStaffData(updatedData);
      setSuccess('Profile updated successfully');
      setEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    // Implement photo upload logic here
    const file = e.target.files[0];
    if (file) {
      // Process and set the new photo URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-3"
      >
        <ArrowLeft className="me-2" /> Back
      </Button>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom-0">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">
                  <PersonCircle className="me-2" />
                  Staff Profile
                </h3>
                {!editMode && (
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setEditMode(true)}
                  >
                    <PencilSquare className="me-1" /> Edit Profile
                  </Button>
                )}
              </div>
            </Card.Header>

            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {editMode ? (
                <Form onSubmit={handleUpdateProfile}>
                  <Row className="mb-4">
                    <Col md={4} className="text-center">
                      <div className="position-relative d-inline-block">
                        <Image 
                          src={photoURL || 'https://via.placeholder.com/150'} 
                          roundedCircle 
                          width={150}
                          height={150}
                          className="border mb-3"
                        />
                        <label 
                          htmlFor="profile-photo" 
                          className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 cursor-pointer"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <Camera size={20} />
                          <input 
                            id="profile-photo" 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoChange}
                            className="d-none"
                          />
                        </label>
                      </div>
                    </Col>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={fullName} 
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          value={currentUser.email || ''} 
                          disabled 
                          plaintext
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Telephone className="me-2" />
                      Mobile Number
                    </Form.Label>
                    <Form.Control 
                      type="tel" 
                      value={mobile} 
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <GeoAlt className="me-2" />
                      Address
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setEditMode(false)}
                      disabled={loading}
                    >
                      <XCircle className="me-1" /> Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner 
                          as="span" 
                          animation="border" 
                          size="sm" 
                          className="me-2"
                        />
                      ) : (
                        <CheckCircle className="me-1" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </Form>
              ) : (
                <Row>
                  <Col md={4} className="text-center">
                    <Image 
                      src={staffData?.photoURL || 'https://via.placeholder.com/150'} 
                      roundedCircle 
                      width={150}
                      height={150}
                      className="border mb-3"
                    />
                    <h4>{staffData?.fullName || 'Staff Member'}</h4>
                    <Badge bg="info" className="mb-3">
                      {currentUser.email}
                    </Badge>
                  </Col>
                  <Col md={8}>
                    <div className="mb-4">
                      <h5 className="text-muted mb-3">Personal Information</h5>
                      <div className="ps-3">
                        <p>
                          <strong>
                            <PersonCircle className="me-2 text-primary" />
                            Full Name:
                          </strong> {staffData?.fullName || 'Not provided'}
                        </p>
                        <p>
                          <strong>
                            <Envelope className="me-2 text-primary" />
                            Email:
                          </strong> {currentUser.email || 'Not provided'}
                        </p>
                        <p>
                          <strong>
                            <Telephone className="me-2 text-primary" />
                            Mobile:
                          </strong> {staffData?.mobile || 'Not provided'}
                        </p>
                        <p>
                          <strong>
                            <GeoAlt className="me-2 text-primary" />
                            Address:
                          </strong> {staffData?.address || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffProfile;