import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function FormularioObra({ handleSubmit, clientes }) {
  const [nombreObra, setNombreObra] = useState('');
  const [descripcionObra, setDescripcionObra] = useState('');
  const [selectedCliente, setSelectedCliente] = useState([]);
  const [valor, setValor] = useState(''); // Añadir estado para el valor

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedCliente.length > 0) {
      handleSubmit({ 
        Nombre_obra: nombreObra, 
        Descripcion_obra: descripcionObra, 
        ClienteID: selectedCliente[0].id,
        Valor: valor // Incluir el valor en el objeto enviado
      });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formNombreObra">
        <Form.Label>Nombre de la obra</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el nombre de la obra"
          value={nombreObra}
          onChange={(e) => setNombreObra(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescripcionObra">
        <Form.Label>Descripción de la obra</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa una descripción de la obra"
          value={descripcionObra}
          onChange={(e) => setDescripcionObra(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formClienteID">
        <Form.Label>Seleccionar cliente</Form.Label>
        <Typeahead
          id="cliente-typeahead"
          labelKey={option => `${option.Nombre} ${option.Apellido}`}
          onChange={(selected) => setSelectedCliente(selected)}
          options={clientes}
          placeholder="Buscar cliente..."
          selected={selectedCliente}
          minLength={1}
          highlightOnlyResult
        />
      </Form.Group>

      <Form.Group controlId="formValor">
        <Form.Label>Valor de la Obra</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingresa el valor de la obra"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Enviar
      </Button>
    </Form>
  );
}

export default FormularioObra;
