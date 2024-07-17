import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ServicioModal = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    NombreServicio: '',
    Descripcion_Servicio: '',
    MontoServicio: 0,
    Tarjeta: false
  });

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
        <Modal.Title>Agregar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formNombreServicio">
            <Form.Label>Nombre del Servicio</Form.Label>
            <Form.Control type="text" name="NombreServicio" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formDescripcionServicio">
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" name="Descripcion_Servicio" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formMontoServicio">
            <Form.Label>Monto</Form.Label>
            <Form.Control type="number" name="MontoServicio" onChange={handleInputChange} required />
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

export default ServicioModal;
