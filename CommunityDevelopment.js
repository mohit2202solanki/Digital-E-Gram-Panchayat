import React, { useEffect, useState } from 'react';
import { fetchCommunityProposals, addCommunityProposal } from '../../services/firestoreService';
import { Form, Button, ListGroup } from 'react-bootstrap';

const CommunityDevelopment = () => {
    const [proposals, setProposals] = useState([]);
    const [newProposal, setNewProposal] = useState({ title: '', description: '', budget: '', contact: '' });

    useEffect(() => {
        const getProposals = async () => {
            const fetchedProposals = await fetchCommunityProposals();
            setProposals(fetchedProposals);
        };
        getProposals();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProposal({ ...newProposal, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCommunityProposal(newProposal);
        setNewProposal({ title: '', description: '', budget: '', contact: '' }); // Reset form
        const updatedProposals = await fetchCommunityProposals(); // Refresh the list
        setProposals(updatedProposals);
    };

    return (
        <div>
            <h2>Community Development Services</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newProposal.title}
                        onChange={handleInputChange}
                        placeholder="Proposal Title"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={newProposal.description}
                        onChange={handleInputChange}
                        placeholder="Proposal Description"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="budget"
                        value={newProposal.budget}
                        onChange={handleInputChange}
                        placeholder="Estimated Budget"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="contact"
                        value={newProposal.contact}
                        onChange={handleInputChange}
                        placeholder="Contact Information"
                        required
                    />
                </Form.Group>
                <Button type="submit">Submit Proposal</Button>
            </Form>
            <h3>Existing Proposals</h3>
            <ListGroup>
                {proposals.map((proposal) => (
                    <ListGroup.Item key={proposal.id}>
                        <strong>{proposal.title}</strong>: {proposal.description} (Budget: {proposal.budget}, Contact: {proposal.contact})
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default CommunityDevelopment;
