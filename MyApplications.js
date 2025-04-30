import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Button, 
  Card, 
  ListGroup, 
  Alert, 
  Spinner,
  Badge,
  Row,
  Col,
  Tab,
  Tabs
} from 'react-bootstrap';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  InfoCircle
} from 'react-bootstrap-icons';
import { getUserApplications, getServices } from '../../services/firestoreService';
import './MyApplications.css'; // Custom CSS for additional styling

const MyApplications = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchServices = async () => {
            const fetchedServices = await getServices();
            setServices(fetchedServices);
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            if (currentUser) {
                try {
                    const userApplications = await getUserApplications(currentUser.uid);
                    setApplications(userApplications);
                } catch (err) {
                    console.error("Error fetching applications:", err);
                    setError("Failed to fetch applications");
                }
            }
            setLoading(false);
        };
        fetchApplications();
    }, [currentUser]);

    // Filter applications based on status
    const filteredApplications = applications.filter(app => {
      if (activeTab === 'all') return true;
      if (activeTab === 'pending') return app.status === 'pending';
      if (activeTab === 'approved') return app.status === 'approved';
      if (activeTab === 'rejected') return app.status === 'rejected';
      return true;
    });

    const getStatusBadge = (status) => {
      switch(status) {
        case 'approved':
          return <Badge bg="success" className="d-flex align-items-center"><CheckCircle className="me-1" size={14} /> Approved</Badge>;
        case 'rejected':
          return <Badge bg="danger" className="d-flex align-items-center"><XCircle className="me-1" size={14} /> Rejected</Badge>;
        default:
          return <Badge bg="warning" className="d-flex align-items-center text-dark"><Clock className="me-1" size={14} /> Pending</Badge>;
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
        <Container className="my-4">
            <Button 
              variant="outline-primary" 
              onClick={() => navigate('/user/dashboard')}
              className="mb-4 d-flex align-items-center"
            >
              <ArrowLeft className="me-2" /> Back to Dashboard
            </Button>

            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>My Applications</span>
                  <Badge bg="primary" pill>{applications.length}</Badge>
                </Card.Title>
                
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  <Tab eventKey="all" title="All Applications" />
                  <Tab eventKey="pending" title="Pending" />
                  <Tab eventKey="approved" title="Approved" />
                  <Tab eventKey="rejected" title="Rejected" />
                </Tabs>

                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading your applications...</p>
                  </div>
                ) : error ? (
                  <Alert variant="danger" className="d-flex align-items-center">
                    <InfoCircle className="me-2" size={20} />
                    {error}
                  </Alert>
                ) : filteredApplications.length > 0 ? (
                  <ListGroup variant="flush">
                    {filteredApplications.map(application => {
                      const service = services.find(s => s.id === application.serviceId);
                      return (
                        <ListGroup.Item key={application.id} className="py-3 px-0">
                          <Row className="align-items-center">
                            <Col md={8}>
                              <div className="d-flex align-items-center mb-2">
                                <h5 className="mb-0 me-3">{service?.name || 'Unknown Service'}</h5>
                                {getStatusBadge(application.status)}
                              </div>
                              <p className="text-muted mb-2">
                                <small>Applied on: {formatDate(application.appliedAt?.toDate())}</small>
                              </p>
                              {service?.description && (
                                <p className="mb-1">{service.description}</p>
                              )}
                            </Col>
                            <Col md={4} className="text-md-end mt-3 mt-md-0">
                              <Button 
                                variant="outline-primary" 
                                size="sm" 
                                onClick={() => navigate(`/user/application-details/${application.id}`)}
                              >
                                View Details
                              </Button>
                            </Col>
                          </Row>
                          
                          {/* Additional information that appears on click (you can make this expandable) */}
                          <div className="mt-3 pt-3 border-top">
                            <Row>
                              <Col md={6}>
                                <h6 className="text-muted mb-2">
                                  <FileText className="me-2" />
                                  Required Documents
                                </h6>
                                <ul className="small">
                                  {service?.documents?.split(',').map((doc, i) => (
                                    <li key={i}>{doc.trim()}</li>
                                  ))}
                                </ul>
                              </Col>
                              <Col md={6}>
                                <h6 className="text-muted mb-2">
                                  <InfoCircle className="me-2" />
                                  Eligibility Criteria
                                </h6>
                                <p className="small">{service?.eligibility}</p>
                              </Col>
                            </Row>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <Alert variant="info" className="d-flex align-items-center">
                    <InfoCircle className="me-2" size={20} />
                    {activeTab === 'all' 
                      ? "You haven't submitted any applications yet." 
                      : `No ${activeTab} applications found.`}
                  </Alert>
                )}
              </Card.Body>
            </Card>
        </Container>
    );
};

export default MyApplications;