import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const IngresoModal = ({ show, handleClose, handleSubmit }) => {
  const [clientes, setClientes] = useState([]);
  const [obras, setObras] = useState([]);
  const [formData, setFormData] = useState({
    ClienteID: '',
    ObraID: '',
    MontoIng: 0,
    Tarjeta: false
  });

  useEffect(() => {
    // Fetch clients
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setClientes(data));

    // Fetch obras
    fetch('/api/obras')
      .then(res => res.json())
      .then(data => setObras(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Ingreso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formClienteID">
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control as="select" name="ClienteID" onChange={handleInputChange} required>
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.Nombre} {cliente.Apellido}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formObraID">
            <Form.Label>Nombre de la Obra</Form.Label>
            <Form.Control as="select" name="ObraID" onChange={handleInputChange} required>
              <option value="">Seleccione una obra</option>
              {obras.map(obra => (
                <option key={obra.id} value={obra.id}>{obra.Nombre_obra}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMontoIng">
            <Form.Label>Monto</Form.Label>
            <Form.Control type="number" name="MontoIng" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formTarjeta">
            <Form.Check type="checkbox" label="Tarjeta" name="Tarjeta" onChange={handleCheckboxChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IngresoModal;
