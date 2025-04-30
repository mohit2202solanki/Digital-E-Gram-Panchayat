import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserApplications, updateApplicationStatus } from '../../services/firebaseService'; // Assuming these functions exist

const UpdateApplicationStatus = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const applications = await getUserApplications(); // Fetch all user applications
        const application = applications.find(app => app.id === id); // Find the specific application by ID
        if (application) {
          setStatus(application.status);
        } else {
          setError('Application not found.');
        }
      } catch (error) {
        setError('Failed to fetch application details.');
      }
    };

    fetchApplication();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await updateApplicationStatus(id, { status });
      navigate('/staff/view-applications'); // Redirect after successful update
    } catch (error) {
      setError('Failed to update application status. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Application Status</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleUpdateStatus}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control 
                  type="text" 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Update Status
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default UpdateApplicationStatus;
