import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.role === 'user') {
      navigate("/user/dashboard");
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      // Redirection handled by useEffect on currentUser change
    } catch (err) {
      setError(err.message || "Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className="login-page">
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="login-card">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="login-header">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      ref={emailRef}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        ref={passwordRef}
                        required
                        className="form-control-lg"
                      />
                      <Button
                        variant="link"
                        className="show-password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="remember-me"
                    />
                    <Link to="/forgot-password" className="forgot-password">
                      Forgot password?
                    </Link>
                  </div>

                  <Button variant="primary" className="w-100 login-btn py-3" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "SIGN IN"}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="signup-text">
                      Don't have an account?{" "}
                      <Link to="/signup" className="signup-link">
                        Sign up
                      </Link>
                    </p>
                    <Button variant="link" onClick={() => navigate('/')} className="back-to-home-btn">
                      ← Back to Home
                    </Button>
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
