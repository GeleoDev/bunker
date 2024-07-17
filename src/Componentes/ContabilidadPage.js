import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ResumenModal from './ResumenModal';
import NavBar from './NavBar';

const ContabilidadPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [resumen, setResumen] = useState([]);

  const fetchResumenData = async () => {
    try {
      const response = await axios.get('http://localhost:3300/api/resumen');
      setResumen(response.data);
    } catch (error) {
      console.error('Error fetching resumen data:', error);
    }
  };

  useEffect(() => {
    fetchResumenData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="container mt-4">
        <h2>Contabilidad</h2>
        <div className="button-container">
          <Button variant="primary" onClick={() => setShowModal(true)}>Agregar Resumen</Button>
        </div>
        <hr />
        <h3>Resumen</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Tarjeta</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(resumen) && resumen.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.tipo}</td>
                <td>{entry.descripcion}</td>
                <td>{entry.valor}</td>
                <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                <td>{entry.tarjeta ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ResumenModal show={showModal} handleClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default ContabilidadPage;

