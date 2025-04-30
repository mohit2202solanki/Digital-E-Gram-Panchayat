import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { storeUserData, createAdmin, storeStaffData } from "../services/firestoreService";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const roleRef = useRef();
  const addressRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      // Signup user with email and password
      const userId = await signup(emailRef.current.value, passwordRef.current.value);

      // Store additional user data in Firestore
      const userData = {
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        mobile: mobileRef.current.value,
        role: roleRef.current.value,
        address: addressRef.current.value,
      };

      if (userData.role === "staff") {
        await storeStaffData(userData, userId, userId);
      } else if (userData.role === "admin") {
        await createAdmin(userData, userId);
      } else {
        await storeUserData(userData, userId, userId);
      }

      if (userData.role === "staff") {
        navigate("/staff/dashboard");
      } else if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">
      <Container className="signup-container">
        <Row className="justify-content-center">
          <Col lg={8} className="signup-column">
            <Card className="signup-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="signup-header">Register for E-Gram Panchayat</h2>
                  <p className="text-muted">Create your account to access services</p>
                </div>

                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                <Form onSubmit={handleSubmit} className="signup-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          ref={fullNameRef}
                          placeholder="Enter your full name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          ref={emailRef}
                          placeholder="Enter your email"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          ref={passwordRef}
                          placeholder="Create a password"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          ref={passwordConfirmRef}
                          placeholder="Confirm your password"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="tel"
                          ref={mobileRef}
                          placeholder="Enter mobile number"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" ref={roleRef} required>
                          <option value="">Select your role</option>
                          <option value="user">Citizen</option>
                          <option value="staff">Panchayat Staff</option>
                          {/* <option value="admin">Admin</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      ref={addressRef}
                      placeholder="Enter your complete address"
                      required
                    />
                  </Form.Group>

                  <Button 
                    disabled={loading} 
                    className="w-100 signup-button" 
                    type="submit"
                  >
                    {loading ? 'Creating Account...' : 'Register Now'}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="mb-2">
                    Already registered? <Link to="/login" className="login-link">Login here</Link>
                  </p>
                  <Link to="/" className="home-link">← Back to Home</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
