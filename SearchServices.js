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
  Form,
  InputGroup,
  Accordion
} from 'react-bootstrap';
import { 
  ArrowLeft,
  Search as SearchIcon,
  InfoCircle,
  FileText,
  CheckCircle,
  Clock,
  Envelope,
  Telephone,
  CurrencyDollar,
  PersonCheck
} from 'react-bootstrap-icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getUserApplications, applyForService } from '../../services/firestoreService';

const SearchServices = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const db = getFirestore();
            const servicesCollection = collection(db, 'services');
            try {
                const servicesSnapshot = await getDocs(servicesCollection);
                const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(servicesList);
                setFilteredServices(servicesList);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to fetch services");
            }
            setLoading(false);
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const results = services.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredServices(results);
    }, [searchTerm, services]);

    const handleApply = async (serviceId) => {
        if (!currentUser) {
            console.error("User not authenticated");
            return;
        }
        try {
            const userApplications = await getUserApplications(currentUser.uid);
            const alreadyApplied = userApplications.some(app => app.serviceId === serviceId);

            if (alreadyApplied) {
                alert("You have already applied for this service.");
                return;
            }

            await applyForService(serviceId, currentUser.uid, {
                name: currentUser.displayName,
                email: currentUser.email,
            });
            alert("Application submitted successfully!");
        } catch (error) {
            console.error("Error applying for service: ", error);
            alert("Failed to submit application. Please try again.");
        }
    };

    // Color palette
    const colors = {
        primary: '#4361ee',      // Vibrant blue
        secondary: '#3f37c9',    // Darker blue
        accent: '#4cc9f0',       // Light blue
        success: '#4bb543',      // Green
        warning: '#ffbe0b',      // Yellow
        danger: '#f72585',       // Pink
        light: '#f8f9fa',
        dark: '#212529',
        background: '#f0f2f5',
        cardBackground: '#ffffff',
        textPrimary: '#2b2d42',
        textSecondary: '#6c757d'
    };

    // Styles with new color scheme
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            backgroundColor: colors.background
        },
        backButton: {
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: colors.light,
            color: colors.primary,
            borderColor: colors.primary,
            ':hover': {
                backgroundColor: colors.primary,
                color: colors.light
            }
        },
        searchCard: {
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
            backgroundColor: colors.cardBackground,
            border: 'none'
        },
        serviceCard: {
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            borderLeft: `4px solid ${colors.primary}`,
            transition: 'all 0.3s ease',
            backgroundColor: colors.cardBackground,
            border: 'none',
            overflow: 'hidden'
        },
        serviceCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 25px rgba(${colors.primary}, 0.15)`
        },
        serviceHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 20px',
            backgroundColor: colors.light,
            borderBottom: `1px solid rgba(${colors.textSecondary}, 0.1)`,
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
        },
        serviceBody: {
            padding: '20px'
        },
        detailItem: {
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '12px',
            color: colors.textPrimary
        },
        detailIcon: {
            marginRight: '12px',
            color: colors.primary,
            minWidth: '20px',
            marginTop: '2px'
        },
        applyButton: {
            marginTop: '20px',
            fontWeight: '500',
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            ':hover': {
                backgroundColor: colors.secondary,
                borderColor: colors.secondary
            }
        },
        spinner: {
            display: 'flex',
            justifyContent: 'center',
            padding: '50px'
        },
        emptyState: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 20px',
            textAlign: 'center',
            color: colors.textSecondary,
            backgroundColor: colors.cardBackground,
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        },
        searchInput: {
            borderRight: 'none',
            padding: '12px 15px',
            borderColor: `rgba(${colors.primary}, 0.2)`,
            ':focus': {
                boxShadow: `0 0 0 0.2rem rgba(${colors.primary}, 0.2)`,
                borderColor: colors.primary
            }
        },
        searchButton: {
            backgroundColor: colors.light,
            borderLeft: 'none',
            borderColor: `rgba(${colors.primary}, 0.2)`,
            color: colors.primary,
            ':hover': {
                backgroundColor: `rgba(${colors.primary}, 0.1)`
            }
        },
        accordionHeader: {
            backgroundColor: 'transparent',
            padding: '0'
        },
        accordionButton: {
            padding: '0',
            color: colors.primary,
            textDecoration: 'none',
            fontWeight: '500',
            ':hover': {
                color: colors.secondary
            }
        },
        title: {
            color: colors.textPrimary,
            marginBottom: '25px',
            fontWeight: '600'
        },
        badge: {
            backgroundColor: colors.accent,
            color: colors.dark,
            fontWeight: '500'
        }
    };

    return (
        <Container style={styles.container} fluid>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/user/dashboard')}
                    style={styles.backButton}
                >
                    <ArrowLeft style={{ marginRight: '8px' }} /> Back to Dashboard
                </Button>

                <Card style={styles.searchCard}>
                    <Card.Body>
                        <h2 style={styles.title}>Available Services</h2>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Search services..."
                                aria-label="Search services"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={styles.searchInput}
                            />
                            <Button 
                                variant="outline-secondary" 
                                style={styles.searchButton}
                            >
                                <SearchIcon />
                            </Button>
                        </InputGroup>
                    </Card.Body>
                </Card>

                {loading ? (
                    <div style={styles.spinner}>
                        <Spinner animation="border" style={{ color: colors.primary }} />
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="d-flex align-items-center">
                        <InfoCircle style={{ marginRight: '10px', color: colors.danger }} /> 
                        {error}
                    </Alert>
                ) : filteredServices.length > 0 ? (
                    <ListGroup>
                        {filteredServices.map(service => (
                            <ListGroup.Item 
                                key={service.id} 
                                style={{ 
                                    ...styles.serviceCard,
                                    ':hover': styles.serviceCardHover 
                                }}
                                className="p-0"
                            >
                                <div style={styles.serviceHeader}>
                                    <h5 style={{ 
                                        margin: '0', 
                                        fontWeight: '600',
                                        color: colors.textPrimary
                                    }}>
                                        {service.name}
                                    </h5>
                                    <Badge pill style={styles.badge}>
                                        {service.category || 'General'}
                                    </Badge>
                                </div>
                                <div style={styles.serviceBody}>
                                    <p style={{ 
                                        color: colors.textSecondary, 
                                        marginBottom: '20px',
                                        lineHeight: '1.6'
                                    }}>
                                        {service.description}
                                    </p>
                                    
                                    <Row>
                                        <Col md={6}>
                                            <div style={styles.detailItem}>
                                                <Telephone style={styles.detailIcon} />
                                                <span>{service.contact || 'Contact not provided'}</span>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <CurrencyDollar style={styles.detailIcon} />
                                                <span>Fees: {service.fees ? `$${service.fees}` : 'Free'}</span>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div style={styles.detailItem}>
                                                <Clock style={styles.detailIcon} />
                                                <span>Processing time: {service.process || 'Varies'}</span>
                                            </div>
                                            <div style={styles.detailItem}>
                                                <CheckCircle style={styles.detailIcon} />
                                                <span>Status: {service.status || 'Available'}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Accordion flush>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header style={styles.accordionHeader}>
                                                <a style={styles.accordionButton}>
                                                    View Requirements & Eligibility
                                                </a>
                                            </Accordion.Header>
                                            <Accordion.Body style={{ padding: '15px 5px' }}>
                                                <div style={styles.detailItem}>
                                                    <FileText style={styles.detailIcon} />
                                                    <div>
                                                        <strong style={{ color: colors.textPrimary }}>
                                                            Required Documents:
                                                        </strong>
                                                        <ul style={{ 
                                                            marginTop: '8px', 
                                                            marginBottom: '0',
                                                            paddingLeft: '20px'
                                                        }}>
                                                            {service.documents?.split(',').map((doc, i) => (
                                                                <li key={i}>{doc.trim()}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div style={styles.detailItem}>
                                                    <PersonCheck style={styles.detailIcon} />
                                                    <div>
                                                        <strong style={{ color: colors.textPrimary }}>
                                                            Eligibility Criteria:
                                                        </strong>
                                                        <p style={{ 
                                                            marginTop: '8px', 
                                                            marginBottom: '0',
                                                            lineHeight: '1.6'
                                                        }}>
                                                            {service.eligibility}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleApply(service.id)}
                                        style={styles.applyButton}
                                        size="lg"
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <Card style={styles.emptyState}>
                        <InfoCircle size={48} style={{ 
                            color: colors.textSecondary, 
                            marginBottom: '20px',
                            opacity: '0.7'
                        }} />
                        <h5 style={{ color: colors.textPrimary, marginBottom: '10px' }}>
                            No services found
                        </h5>
                        <p style={{ color: colors.textSecondary }}>
                            Try adjusting your search or check back later for new services.
                        </p>
                        <Button 
                            variant="outline-primary" 
                            onClick={() => setSearchTerm('')}
                            style={{ marginTop: '15px' }}
                        >
                            Clear Search
                        </Button>
                    </Card>
                )}
            </div>
        </Container>
    );
};

export default SearchServices;