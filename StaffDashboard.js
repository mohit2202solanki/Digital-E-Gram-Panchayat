import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Dropdown,
  Alert,
  Badge,
  Modal
} from 'react-bootstrap';
import { 
  BoxArrowRight,
  PersonCircle,
  Clipboard2Check,
  Tree,
  People,
  Gear
} from 'react-bootstrap-icons';

const StaffDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);

    // Redirect to login page if the user is not authenticated
    useEffect(() => {
        if (!currentUser) {
            navigate("/staff/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/staff/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3 shadow">
                <Navbar.Brand as={Link} to="/staff/dashboard">
                    <span className="fw-bold">AgriConnect</span> Staff Portal
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <PersonCircle className="me-2" />
                            {currentUser?.email || 'Staff Account'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/staff/profile">
                                <Gear className="me-2" /> My Profile
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => setShowLogoutAlert(true)}>
                                <BoxArrowRight className="me-2" /> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>

            {/* Main Content */}
            <Container fluid className="mt-4">
                <Row className="mb-4">
                    <Col>
                        <h2 className="fw-bold">
                            <PersonCircle className="me-2" />
                            Staff Dashboard
                        </h2>
                        <p className="text-muted">
                            Welcome back, {currentUser?.fullName || 'Staff Member'}
                        </p>
                    </Col>
                </Row>

                {/* Dashboard Cards */}
                <Row className="g-4">
                    <Col md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                                    <Clipboard2Check size={32} className="text-primary" />
                                </div>
                                <Card.Title>Applications Management</Card.Title>
                                <Card.Text className="text-muted">
                                    Review and process farmer applications
                                </Card.Text>
                                <Button 
                                    as={Link} 
                                    to="/staff/view-applications" 
                                    variant="outline-primary"
                                    className="w-100"
                                >
                                    View Applications
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                                    <Tree size={32} className="text-success" />
                                </div>
                                <Card.Title>Agricultural Support</Card.Title>
                                <Card.Text className="text-muted">
                                    Manage agricultural support services
                                </Card.Text>
                                <Button 
                                    as={Link} 
                                    to="/staff/agricultural-support" 
                                    variant="outline-success"
                                    className="w-100"
                                >
                                    Services Portal
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <div className="bg-info bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                                    <People size={32} className="text-info" />
                                </div>
                                <Card.Title>Community Development</Card.Title>
                                <Card.Text className="text-muted">
                                    Coordinate community initiatives
                                </Card.Text>
                                <Button 
                                    as={Link} 
                                    to="/staff/community-development" 
                                    variant="outline-info"
                                    className="w-100"
                                >
                                    Development Hub
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Quick Actions Section */}
                <Row className="mt-5">
                    <Col>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <h5 className="fw-bold mb-4">Quick Actions</h5>
                                <div className="d-flex flex-wrap gap-3">
                                    <Button 
                                        as={Link} 
                                        to="/staff/profile" 
                                        variant="light" 
                                        className="d-flex align-items-center"
                                    >
                                        <PersonCircle className="me-2" /> My Profile
                                    </Button>
                                    <Button 
                                        variant="outline-secondary" 
                                        className="d-flex align-items-center"
                                    >
                                        <Clipboard2Check className="me-2" /> Recent Applications
                                    </Button>
                                    <Button 
                                        variant="outline-secondary" 
                                        className="d-flex align-items-center"
                                    >
                                        <People className="me-2" /> Community Reports
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutAlert} onHide={() => setShowLogoutAlert(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <BoxArrowRight className="me-2" />
                        Confirm Logout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to logout from the staff portal?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutAlert(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StaffDashboard;