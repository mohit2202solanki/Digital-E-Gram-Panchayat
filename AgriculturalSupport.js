import React, { useEffect, useState } from 'react';
import { fetchAgriculturalInfo, addAgriculturalInfo } from '../../services/firestoreService';
import { Form, Button, ListGroup } from 'react-bootstrap'; // Import React Bootstrap components

const AgriculturalSupport = () => {
    const [agriculturalInfo, setAgriculturalInfo] = useState([]);
    const [newInfo, setNewInfo] = useState({ title: '', description: '' });

    useEffect(() => {
        const getAgriculturalInfo = async () => {
            const info = await fetchAgriculturalInfo();
            setAgriculturalInfo(info);
        };
        getAgriculturalInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInfo({ ...newInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addAgriculturalInfo(newInfo);
        setNewInfo({ title: '', description: '' }); // Reset form
        const updatedInfo = await fetchAgriculturalInfo(); // Refresh the list
        setAgriculturalInfo(updatedInfo);
    };

    return (
        <div>
            <h2>Agricultural Support Services</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newInfo.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={newInfo.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                    />
                </Form.Group>
                <Button type="submit">Add Information</Button>
            </Form>
            <h3>Existing Agricultural Information</h3>
            <ListGroup>
                {agriculturalInfo.map((info) => (
                    <ListGroup.Item key={info.id}>
                        <strong>{info.title}</strong>: {info.description}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default AgriculturalSupport;
