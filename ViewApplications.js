import React, { useEffect, useState } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserApplications } from '../../services/firestoreService'; // Updated import path
import { useAuth } from '../../contexts/AuthContext';

const ViewApplications = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Define navigate function

  useEffect(() => {
const fetchApplications = async () => {
    console.log("Fetching applications for user:", currentUser.uid); // Debugging log

      try {
        const apps = await getUserApplications(currentUser.uid);
        console.log("Fetched applications:", apps); // Debugging log
        setApplications(apps);

      } catch (error) {
        setError('Failed to fetch applications');
      }
    };

    fetchApplications();
  }, [currentUser]);

  return (
    <Container>
      <h2>View Applications</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Status</th>


            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.serviceName}</td>
              <td>{app.userName}</td>
              <td>{app.userEmail}</td>
              <td>{app.status}</td>


              <td>
                <Link to={`/staff/update-application/${app.id}`}>
                  <Button variant="info">Update Status</Button>
                </Link>
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

export default ViewApplications;
