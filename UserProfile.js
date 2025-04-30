import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Button, 
  Image, 
  Alert, 
  Card, 
  Form, 
  Row, 
  Col,
  ListGroup,
  Modal,
  Badge
} from 'react-bootstrap';
import { PencilSquare, XCircle, CheckCircle, Envelope, Telephone, GeoAlt, Person } from 'react-bootstrap-icons';

const UserProfile = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [fullName, setFullName] = useState(currentUser.fullName || '');
    const [mobile, setMobile] = useState(currentUser.mobile || '');
    const [address, setAddress] = useState(currentUser.address || '');
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile({ fullName, mobile, address });
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }
    };

    // Emoji in circle component
    const EmojiCircle = ({ emoji, bgColor = 'primary' }) => (
        <Badge 
            pill 
            bg={bgColor} 
            className="d-flex align-items-center justify-content-center" 
            style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
        >
            {emoji}
        </Badge>
    );

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white position-relative">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">👤 User Profile</h4>
                                {!editMode && (
                                    <Button 
                                        variant="light" 
                                        size="sm"
                                        onClick={() => setEditMode(true)}
                                    >
                                        <PencilSquare className="me-1" /> Edit
                                    </Button>
                                )}
                            </div>
                            <div className="position-absolute top-0 start-50 translate-middle">
                                <EmojiCircle emoji="👤" bgColor="light" text="dark" />
                            </div>
                        </Card.Header>
                        
                        {error && <Alert variant="danger" className="m-3">{error}</Alert>}
                        
                        <Card.Body>
                            {editMode ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <EmojiCircle emoji="📷" bgColor="secondary" />
                                            <h5 className="ms-2 mb-0">Profile Photo</h5>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Image 
                                                src={currentUser.photoURL || 'https://via.placeholder.com/150'} 
                                                roundedCircle 
                                                width={80}
                                                height={80}
                                                className="me-3 border"
                                            />
                                            <Button variant="outline-secondary" size="sm">
                                                Change Photo
                                            </Button>
                                        </div>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <EmojiCircle emoji="👋" bgColor="info" />
                                            <h5 className="ms-2 mb-0">Personal Information</h5>
                                        </div>
                                        <Form.Control 
                                            type="text" 
                                            value={fullName} 
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <EmojiCircle emoji="📧" bgColor="warning" />
                                            <h5 className="ms-2 mb-0">Email</h5>
                                        </div>
                                        <Form.Control 
                                            type="email" 
                                            value={currentUser.email} 
                                            disabled 
                                            plaintext
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <div className="d-flex align-items-center mb-2">
                                            <EmojiCircle emoji="📱" bgColor="success" />
                                            <h5 className="ms-2 mb-0">Contact Details</h5>
                                        </div>
                                        <Form.Control 
                                            type="tel" 
                                            value={mobile} 
                                            onChange={(e) => setMobile(e.target.value)}
                                            placeholder="Enter mobile number"
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4">
                                        <div className="d-flex align-items-center mb-2">
                                            <EmojiCircle emoji="🏠" bgColor="danger" />
                                            <h5 className="ms-2 mb-0">Address</h5>
                                        </div>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3}
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                        />
                                    </Form.Group>
                                    
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={() => setEditMode(false)}
                                        >
                                            <XCircle className="me-1" /> Cancel
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            <CheckCircle className="me-1" /> Save Changes
                                        </Button>
                                    </div>
                                </Form>
                            ) : (
                                <>
                                    <div className="text-center mb-4">
                                        <Image 
                                            src={currentUser.photoURL || 'https://via.placeholder.com/150'} 
                                            roundedCircle 
                                            width={120}
                                            height={120}
                                            className="border shadow-sm"
                                        />
                                        <h4 className="mt-3">{currentUser.fullName || 'User'}</h4>
                                        <Badge pill bg="info" className="mt-1">
                                            {currentUser.email}
                                        </Badge>
                                    </div>
                                    
                                    <ListGroup variant="flush" className="mb-4">
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <EmojiCircle emoji="👋" bgColor="info" />
                                            <div className="ms-3">
                                                <h6 className="mb-0">Full Name</h6>
                                                <p className="mb-0">{currentUser.fullName || 'Not provided'}</p>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <EmojiCircle emoji="📱" bgColor="success" />
                                            <div className="ms-3">
                                                <h6 className="mb-0">Mobile</h6>
                                                <p className="mb-0">{currentUser.mobile || 'Not provided'}</p>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <EmojiCircle emoji="🏠" bgColor="danger" />
                                            <div className="ms-3">
                                                <h6 className="mb-0">Address</h6>
                                                <p className="mb-0">{currentUser.address || 'Not provided'}</p>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            )}
                        </Card.Body>
                        
                        <Card.Footer className="bg-light">
                            <div className="d-flex justify-content-between">
                                <Button 
                                    variant="outline-primary" 
                                    onClick={() => navigate('/user/dashboard')}
                                >
                                    ← Back to Dashboard
                                </Button>
                                <div>
                                    <Button 
                                        variant="outline-secondary" 
                                        className="me-2"
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        {editMode ? '👀 View Mode' : '✏️ Edit Profile'}
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        onClick={() => setShowLogoutModal(true)}
                                    >
                                        🔒 Logout
                                    </Button>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center">
                        <EmojiCircle emoji="⚠️" bgColor="warning" className="me-2" />
                        Confirm Logout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center">
                        <EmojiCircle emoji="😢" bgColor="light" className="me-3" />
                        <p className="mb-0">Are you sure you want to logout?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        ❌ Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {/* Add your logout logic here */}}>
                        ✅ Yes, Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserProfile;