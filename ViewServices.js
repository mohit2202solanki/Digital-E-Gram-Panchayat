import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { Container, Table, Alert } from 'react-bootstrap';
import { getServices } from '../../services/firestoreService'; // Assuming this function exists

const ViewServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Define navigate function


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        setError('Failed to fetch services.');
      }
    };

    fetchServices();
  }, []);

  return (
    <Container>
      <h2 className="text-center mb-4">Available Services</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Eligibility</th>
            <th>Documents</th>
            <th>Process</th>
            <th>Fees</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>

        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{services.indexOf(service) + 1}</td>

              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{service.eligibility}</td>
              <td>{service.documents}</td>
              <td>{service.process}</td>
              <td>{service.fees}</td>
              <td>{service.contact}</td>
              <td>
                {/* Add action buttons here if needed */}
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <div>
      <Button onClick={() => navigate('/staff/dashboard')}>Go to Dashboard</Button>
      </div>
    </Container>
  );
};

export default ViewServices;
