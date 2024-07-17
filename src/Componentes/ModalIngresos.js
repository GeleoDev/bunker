import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const IngresoModal = ({ show, handleClose, clientes, obras, handleSubmit }) => {
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedObra, setSelectedObra] = useState([]);
  const [monto, setMonto] = useState('');
  const [tarjeta, setTarjeta] = useState(false);

  useEffect(() => {
    if (selectedClient.length > 0) {
      // Fetch obras based on selected client
    }
  }, [selectedClient]);

  const onSubmit = () => {
    if (selectedClient.length > 0 && selectedObra.length > 0) {
      handleSubmit({
        ClienteID: selectedClient[0].id,
        ObraID: selectedObra[0].id,
        MontoIng: parseInt(monto, 10),
        Tarjeta: tarjeta,
      });
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ingreso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formClient">
            <Form.Label>Nombre del Cliente</Form.Label>
            <Typeahead
              id="client-typeahead"
              labelKey={(cliente) => `${cliente.Nombre} ${cliente.Apellido}`}
              options={clientes}
              placeholder="Buscar cliente..."
              selected={selectedClient}
              onChange={setSelectedClient}
              minLength={1}
              highlightOnlyResult
            />
          </Form.Group>
          <Form.Group controlId="formObra">
            <Form.Label>Nombre de la Obra</Form.Label>
            <Typeahead
              id="obra-typeahead"
              labelKey={(obra) => obra.Nombre_obra}
              options={obras}
              placeholder="Buscar obra..."
              selected={selectedObra}
              onChange={setSelectedObra}
              minLength={1}
              highlightOnlyResult
            />
          </Form.Group>
          <Form.Group controlId="formMonto">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              placeholder="Monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTarjeta">
            <Form.Check
              type="checkbox"
              label="Tarjeta"
              checked={tarjeta}
              onChange={(e) => setTarjeta(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Guardar Ingreso
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IngresoModal;
