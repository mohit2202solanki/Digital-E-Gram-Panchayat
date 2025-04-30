import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Create this CSS file

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/admin/dashboard");
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setAlertVisible(false);
    setError('');
    setLoading(true);
    try {
      const { userData, role } = await login(emailRef.current.value, passwordRef.current.value);
      if (!userData || role !== 'admin') {
        setAlertVisible(true);
        setError('You do not have admin access.');
        await Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have admin access.',
          confirmButtonColor: '#3085d6'
        });
      } else {
        // Navigate to admin dashboard if login and role check succeed
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(error.message);
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid credentials. Please try again.',
        confirmButtonColor: '#3085d6'
      });
    }
    setLoading(false);
  }

  return (
    <div className="admin-login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="admin-login-card">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="admin-login-title">Admin Portal</h2>
                  <p className="text-muted">Enter your credentials to access the admin dashboard</p>
                </div>

                {alertVisible && currentUser && currentUser.role !== 'admin' && (
                  <Alert variant="warning" className="text-center">
                    Attempting to log in...
                  </Alert>
                )}
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                <Form onSubmit={handleSubmit} className="admin-login-form">
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      placeholder="Enter your admin email"
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        ref={passwordRef}
                        placeholder="Enter your password"
                        required
                        className="form-control-lg"
                      />
                      <Button
                        variant="link"
                        className="show-password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="remember-me"
                    />
                    <Link to="/forgot-password" className="forgot-password-link">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    disabled={loading}
                    variant="primary"
                    type="submit"
                    className="w-100 admin-login-btn py-3"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login to Admin Dashboard'
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="signup-text">
                      Need an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}