import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const ModalObra = ({ show, handleClose, handleSubmit, clientes }) => {
  const [nombreObra, setNombreObra] = useState('');
  const [descripcionObra, setDescripcionObra] = useState('');
  const [clienteID, setClienteID] = useState([]);
  const [actividad, setActividad] = useState(false);
  const [valor, setValor] = useState(''); // Añadir estado para el valor

  const onSubmit = () => {
    if (clienteID.length > 0) {
      handleSubmit({
        Nombre_obra: nombreObra,
        Descripcion_obra: descripcionObra,
        ClienteID: clienteID[0].id,
        Actividad: actividad,
        Valor: valor // Incluir el valor en el objeto enviado
      });
      handleClose();
    }
  };

  useEffect(() => {
    if (!show) {
      setNombreObra('');
      setDescripcionObra('');
      setClienteID([]);
      setActividad(false);
      setValor(''); // Resetear el valor al cerrar
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ingresar Obra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombreObra">
            <Form.Label>Nombre de la Obra</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre de la obra"
              value={nombreObra}
              onChange={(e) => setNombreObra(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescripcionObra">
            <Form.Label>Descripción de la Obra</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa la descripción de la obra"
              value={descripcionObra}
              onChange={(e) => setDescripcionObra(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formClienteID">
            <Form.Label>Seleccionar Cliente</Form.Label>
            <Typeahead
              id="cliente-typeahead"
              labelKey={(cliente) => `${cliente.Nombre} ${cliente.Apellido}`}
              options={clientes}
              placeholder="Buscar cliente..."
              selected={clienteID}
              onChange={(selected) => setClienteID(selected)}
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

          <Form.Group controlId="formActividad">
            <Form.Check
              type="checkbox"
              label="Actividad"
              checked={actividad}
              onChange={(e) => setActividad(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Ingresar Obra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalObra;
