import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { createService } from '../../services/firestoreService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlusCircle, 
  faArrowLeft, 
  faInfoCircle,
  faMoneyBillWave,
  faUserCheck,
  faFileAlt,
  faListOl,
  faPhone
} from '@fortawesome/free-solid-svg-icons';

const CreateService = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fee: '',
    eligibility: '',
    documents: '',
    process: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createService({ 
        name: formData.name, 
        description: formData.description, 
        eligibility: formData.eligibility, 
        documents: formData.documents, 
        process: formData.process, 
        fees: formData.fee, 
        contact: formData.contact 
      });
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to create service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xl={8} lg={10}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                  Create New Service
                </h2>
                <Button 
                  variant="light" 
                  size="sm"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                  Dashboard
                </Button>
              </div>
            </Card.Header>
            
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              
              <Form onSubmit={handleCreateService}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                        Service Name
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter service name"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-primary" />
                        Service Fee
                      </Form.Label>
                      <Form.Control 
                        type="number" 
                        name="fee"
                        value={formData.fee} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter service fee"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-primary" />
                    Description
                  </Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="description"
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter detailed service description"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FontAwesomeIcon icon={faUserCheck} className="me-2 text-primary" />
                        Eligibility Criteria
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2}
                        name="eligibility"
                        value={formData.eligibility} 
                        onChange={handleChange} 
                        required 
                        placeholder="Who is eligible for this service?"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FontAwesomeIcon icon={faFileAlt} className="me-2 text-primary" />
                        Required Documents
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2}
                        name="documents"
                        value={formData.documents} 
                        onChange={handleChange} 
                        required 
                        placeholder="List all required documents"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FontAwesomeIcon icon={faListOl} className="me-2 text-primary" />
                        Application Process
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2}
                        name="process"
                        value={formData.process} 
                        onChange={handleChange} 
                        required 
                        placeholder="Step-by-step application process"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" />
                        Contact Information
                      </Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2}
                        name="contact"
                        value={formData.contact} 
                        onChange={handleChange} 
                        required 
                        placeholder="Contact details for inquiries"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="primary" 
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Service...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                        Create Service
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Cancel and Return
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateService;