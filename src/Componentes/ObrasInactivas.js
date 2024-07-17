import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ModalObra from './ModalObra';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function ObrasInactivas({ clientes, obras, onEdit, onDelete, onActivate }) {
  const [selectedObra, setSelectedObra] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleActivate = (id) => {
    onActivate(id); // Aquí llamamos a la función pasada por props con el id correcto
  };

  const handleEdit = (obra) => {
    setSelectedObra(obra);
    setShowModal(true);
  };

  const handleSubmit = (obra) => {
    onEdit(obra);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedObra(null);
  };

  return (
    <div>
      <h3>Obras Inactivas</h3>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de la Obra</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(obras) && obras.length > 0 ? (
            obras.map(obra => (
              <tr key={obra.id}>
                <td>{obra.Nombre_obra}</td>
                <td>{obra.Cliente ? `${obra.Cliente.Nombre} ${obra.Cliente.Apellido}` : 'Sin cliente asignado'}</td>
                <td>
                  <Button variant="success" onClick={() => handleActivate(obra.id)} className="action-button">
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                  <Button variant="warning" onClick={() => handleEdit(obra)} className="action-button">
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(obra.id)} className="action-button">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No hay obras inactivas</td>
            </tr>
          )}
        </tbody>
      </Table>
      {selectedObra && (
        <ModalObra
          show={showModal}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          obra={selectedObra}
          clientes={clientes}
        />
      )}
    </div>
  );
}

export default ObrasInactivas;

