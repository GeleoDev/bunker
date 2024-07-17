import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const GastoExtraModal = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    NombreGasto: '',
    Descripcion_Gasto: '',
    MontoGasto: 0,
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
        <Modal.Title>Agregar Gasto Extra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formNombreGasto">
            <Form.Label>Nombre del Gasto</Form.Label>
            <Form.Control type="text" name="NombreGasto" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formDescripcionGasto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" name="Descripcion_Gasto" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formMontoGasto">
            <Form.Label>Monto</Form.Label>
            <Form.Control type="number" name="MontoGasto" onChange={handleInputChange} required />
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

export default GastoExtraModal;
