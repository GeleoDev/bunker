import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EgresoSueldoModal = ({ show, handleClose, handleSubmit }) => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    EmpleadoID: '',
    MontoSueldo: 0,
    Tarjeta: false
  });

  useEffect(() => {
    fetch('/api/empleados')
      .then(res => res.json())
      .then(data => setEmpleados(data));
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
        <Modal.Title>Agregar Egreso de Sueldo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formEmpleadoID">
            <Form.Label>Nombre del Empleado</Form.Label>
            <Form.Control as="select" name="EmpleadoID" onChange={handleInputChange} required>
              <option value="">Seleccione un empleado</option>
              {empleados.map(empleado => (
                <option key={empleado.id} value={empleado.id}>{empleado.Nombre_Empleado} {empleado.Apellido_Empleado}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMontoSueldo">
            <Form.Label>Monto</Form.Label>
            <Form.Control type="number" name="MontoSueldo" onChange={handleInputChange} required />
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

export default EgresoSueldoModal;
