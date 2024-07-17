import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalEmpleado = ({ show, handleClose, handleSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');
  const [notas, setNotas] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      Nombre_Empleado: nombre,
      Apellido_Empleado: apellido,
      Domicilio: domicilio,
      Telefono: telefono,
      Documento: documento,
      Notas_Adicionales: notas
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ingresar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDomicilio">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el domicilio"
              value={domicilio}
              onChange={(e) => setDomicilio(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDocumento">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNotas">
            <Form.Label>Notas Adicionales</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa las notas adicionales"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Guardar Empleado
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEmpleado;

