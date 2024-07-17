// src/Componentes/FormularioCliente.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FormularioCliente({ handleSubmit }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ Nombre: nombre, Apellido: apellido, Direccion: direccion, Telefono: telefono, Documento: dni });
  };

  return (
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

      <Form.Group controlId="formDireccion">
        <Form.Label>Dirección (Opcional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa la dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
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

      <Form.Group controlId="formDNI">
        <Form.Label>DNI (Opcional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Enviar
      </Button>
    </Form>
  );
}

export default FormularioCliente;