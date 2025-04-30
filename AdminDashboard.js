import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCogs, faPlusCircle, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Container className="py-5">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h2 className="mb-0">Admin Dashboard</h2>
                </Card.Header>
                
                <Card.Body>
                    {currentUser && (
                    <Alert variant="info" className="mb-4">
                        Welcome back, <strong>{currentUser.fullName ? currentUser.fullName : currentUser.email}</strong>!
                    </Alert>
                    )}
                    
                    <h4 className="mb-4">Quick Actions</h4>
                    
                    <Row className="g-4">
                        <Col md={6} lg={3}>
                            <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faUsers} size="3x" className="text-primary mb-3" />
                                    <h5>User Management</h5>
                                    <Link to="/admin/users">
                                        <Button variant="outline-primary" className="mt-2 w-100">
                                            View Users
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={6} lg={3}>
                            <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faCogs} size="3x" className="text-secondary mb-3" />
                                    <h5>Services</h5>
                                    <Link to="/admin/update_services">
                                        <Button variant="outline-secondary" className="mt-2 w-100">
                                            Manage Services
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={6} lg={3}>
                            <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faPlusCircle} size="3x" className="text-success mb-3" />
                                    <h5>Create Service</h5>
                                    <Link to="/admin/services">
                                        <Button variant="outline-success" className="mt-2 w-100">
                                            New Service
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={6} lg={3}>
                            <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                                <Card.Body className="text-center">
                                    <FontAwesomeIcon icon={faUser} size="3x" className="text-info mb-3" />
                                    <h5>Profile</h5>
                                    <Link to="/admin/profile">
                                        <Button variant="outline-info" className="mt-2 w-100">
                                            My Profile
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
                
                <Card.Footer className="bg-light d-flex justify-content-end">
                    <Button 
                        variant="danger" 
                        onClick={handleLogout}
                        className="d-flex align-items-center"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Logout
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default AdminDashboard;