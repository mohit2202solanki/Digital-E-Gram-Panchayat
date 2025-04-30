import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import "animate.css";
import './Home.css';

const Home = () => {
  const buttons = [
    { path: "/login", text: "User Login", variant: "primary", delay: "0s", icon: "👤" },
    { path: "/signup", text: "User Register", variant: "success", delay: "0.2s", icon: "📝" },
    { path: "/staff/login", text: "Staff Login", variant: "warning", delay: "0.4s", icon: "👔" },
    { path: "/admin/login", text: "Admin Login", variant: "dark", delay: "0.6s", icon: "🔒" }
  ];

  return (
    <div className="home-background">
      <div className="overlay"></div>
      <Container className="home-container">
        <div className="text-center header-content animate__animated animate__fadeIn">
          <h1 className="main-title animate__animated animate__fadeInDown">
            <span className="highlight">E-Gram</span> Panchayat
          </h1>
          <p className="subtitle animate__animated animate__fadeIn animate__delay-0.5s">
            Digital Transformation for Rural Governance
          </p>
        </div>

        <Row className="button-row justify-content-center">
          {buttons.map((btn, index) => (
            <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
              <RouterLink to={btn.path} className="text-decoration-none">
                <Button
                  variant={btn.variant}
                  className={`action-button animate__animated animate__fadeInUp animate__delay-${btn.delay}`}
                >
                  <span className="button-icon">{btn.icon}</span>
                  {btn.text}
                </Button>
              </RouterLink>
            </Col>
          ))}
        </Row>

        <div className="features-section animate__animated animate__fadeIn animate__delay-1s">
          <Row className="justify-content-center">
            <Col md={4} className="text-center feature-item">
              <div className="feature-icon">🚀</div>
              <h4>Fast Services</h4>
              <p>Quick access to government services</p>
            </Col>
            <Col md={4} className="text-center feature-item">
              <div className="feature-icon">🔍</div>
              <h4>Transparency</h4>
              <p>Track all applications in real-time</p>
            </Col>
            <Col md={4} className="text-center feature-item">
              <div className="feature-icon">📱</div>
              <h4>Mobile Friendly</h4>
              <p>Access from any device</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;