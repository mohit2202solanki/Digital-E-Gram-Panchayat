import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getServices, updateService } from '../../services/firebaseService'; // Assuming these functions exist


const UpdateService = () => {
  const { id } = useParams();
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const services = await getServices();
        const service = services.find(s => s.id === id);

        setServiceName(service.name);
        setDescription(service.description);
        setFee(service.fee);
      } catch (error) {
        setError('Failed to fetch service details.');
      }
    };

    fetchService();
  }, [id]);

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      await updateService(id, { name: serviceName, description, fee });
      navigate('/admin/dashboard'); // Redirect after successful update
    } catch (error) {
      setError('Failed to update service. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Service</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleUpdateService}>
              <Form.Group className="mb-3">
                <Form.Label>Service Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={serviceName} 
                  onChange={(e) => setServiceName(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type="text" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fee</Form.Label>
                <Form.Control 
                  type="number" 
                  value={fee} 
                  onChange={(e) => setFee(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Update Service
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default UpdateService;
