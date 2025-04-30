import React, { useEffect, useState } from 'react';
import { getServices, updateService, deleteService } from '../../services/firestoreService';
import { 
  Container, 
  Alert, 
  Button, 
  Modal, 
  Form,
  Card,
  Spinner,
  Row,
  Col
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCogs, 
  faArrowLeft, 
  faSearch,
  faEdit,
  faTrash,
  faPlusCircle,
  faInfoCircle,
  faFileAlt,
  faListAlt,
  faMoneyBillWave,
  faPhone,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesData = await getServices();
      setServices(servicesData);
      setError('');
    } catch (error) {
      setError('Failed to fetch services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (service) => {
    setCurrentService(service);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentService(null);
  };

  const handleSave = async () => {
    try {
      await updateService(currentService.id, currentService);
      await fetchServices();
      setShowModal(false);
      setError('');
    } catch (error) {
      setError('Failed to update service. Please try again.');
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);
      await fetchServices();
      setConfirmDelete(null);
    } catch (error) {
      setError('Failed to delete service. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faCogs} className="me-2" />
            <span className="h4 mb-0">Manage Services</span>
          </div>
          <div>
            <Button 
              variant="light" 
              size="sm" 
              className="me-2"
              onClick={() => navigate('/admin/services/create')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="me-1" />
              Add New
            </Button>
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

        <Card.Body>
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search services..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </div>

          {filteredServices.length > 0 ? (
            <Slider {...sliderSettings} className="mb-4">
              {filteredServices.map((service) => (
                <div key={service.id} className="px-2">
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0 text-primary">{service.name}</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                          <strong>Description:</strong>
                        </small>
                        <p className="text-truncate-3">{service.description}</p>
                      </div>

                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faListAlt} className="me-2" />
                          <strong>Eligibility:</strong>
                        </small>
                        <p>{service.eligibility || 'N/A'}</p>
                      </div>

                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                          <strong>Documents:</strong>
                        </small>
                        <p>{service.documents || 'N/A'}</p>
                      </div>

                      <div className="mb-2">
                        <small className="text-muted d-block">
                          <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                          <strong>Fees:</strong>
                        </small>
                        <p>{service.fees || 'N/A'}</p>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <div className="d-flex justify-content-between">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEdit(service)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => setConfirmDelete(service.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="me-1" />
                          Delete
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </Slider>
          ) : (
            <Alert variant="info">
              {searchTerm ? 'No matching services found' : 'No services available'}
            </Alert>
          )}

          <div className="d-flex justify-content-center mt-3">
            <Button 
              variant="primary" 
              onClick={() => navigate('/admin/dashboard')}
              className="me-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back to Dashboard
            </Button>
            <Button 
              variant="success"
              onClick={() => navigate('/admin/services/create')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
              Create New Service
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Edit Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentService && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={currentService.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fees</Form.Label>
                    <Form.Control
                      type="text"
                      name="fees"
                      value={currentService.fees}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={currentService.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Eligibility</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="eligibility"
                      value={currentService.eligibility}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Required Documents</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="documents"
                      value={currentService.documents}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Application Process</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="process"
                      value={currentService.process}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Information</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="contact"
                      value={currentService.contact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={!!confirmDelete} onHide={() => setConfirmDelete(null)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this service? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(confirmDelete)}>
            Delete Service
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageServices;