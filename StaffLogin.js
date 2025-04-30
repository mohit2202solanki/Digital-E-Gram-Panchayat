import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col
} from 'react-bootstrap';
import { Lock, Person } from 'react-bootstrap-icons';

const StaffLogin = () => {
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (currentUser) {
            navigate("/staff/dashboard");
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/staff/dashboard");
        } catch (err) {
            setError("Invalid email or password");
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow border-0">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block">
                                    <Lock size={24} className="text-primary" />
                                </div>
                                <h3 className="mt-3 mb-1">Staff Portal</h3>
                                <p className="text-muted">Enter your credentials</p>
                            </div>

                            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light">
                                            <Person className="text-muted" />
                                        </span>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="staff@example.com"
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light">
                                            <Lock className="text-muted" />
                                        </span>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </Form.Group>

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 mb-3 py-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                            />
                                            Authenticating...
                                        </>
                                    ) : "Login"}
                                </Button>

                                <div className="text-center">
                                    <Link to="/forgot-password" className="text-decoration-none small">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="bg-light text-center py-3">
                            <small className="text-muted">
                                Not staff? <Link to="/">Return to homepage</Link>
                            </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StaffLogin;