import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import NavBar from './NavBar';
import '../App.css';

const ObrasPage = () => {
  const [obras, setObras] = useState([]);
  const [filteredObras, setFilteredObras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showClientModal, setShowClientModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

  const fetchObrasActivas = async () => {
    try {
      const response = await fetch('http://localhost:3300/obras/activas');
      const data = await response.json();
      if (Array.isArray(data)) {
        setObras(data);
        setFilteredObras(data);
      } else {
        setObras([]);
        setFilteredObras([]);
      }
    } catch (error) {
      console.error('Error al obtener las obras activas:', error);
      setObras([]);
      setFilteredObras([]);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3300/clients');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  useEffect(() => {
    fetchObrasActivas();
    fetchClientes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredObras(obras);
    } else {
      setFilteredObras(
        obras.filter((obra) =>
          obra.Nombre_obra.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleClientSubmit = () => {
    if (selectedClient.length > 0) {
      const clientId = selectedClient[0].id;
      setFilteredObras(obras.filter((obra) => obra.ClienteID === clientId));
    }
    setShowClientModal(false);
  };

  const handleStatusSubmit = () => {
    if (statusFilter !== '') {
      setFilteredObras(obras.filter((obra) => obra[statusFilter]));
    }
    setShowStatusModal(false);
  };

  const handleCategorySubmit = () => {
    if (categoryFilter !== '') {
      setFilteredObras(obras.filter((obra) => obra[categoryFilter]));
    }
    setShowCategoryModal(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedClient([]);
    setStatusFilter('');
    setCategoryFilter('');
    setFilteredObras(obras);
  };

  const handleCloseClientModal = () => setShowClientModal(false);
  const handleCloseStatusModal = () => setShowStatusModal(false);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleChangeStatus = async (id, status) => {
    try {
      const updatedObra = obras.find((obra) => obra.id === id);
      if (!updatedObra) return;

      updatedObra.EnCola = status === 'EnCola';
      updatedObra.EnProgreso = status === 'EnProgreso';
      updatedObra.Finalizado = status === 'Finalizado';
      updatedObra.Entregado = status === 'Entregado';

      await fetch(`http://localhost:3300/obras/estado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EnCola: updatedObra.EnCola,
          EnProgreso: updatedObra.EnProgreso,
          Finalizado: updatedObra.Finalizado,
          Entregado: updatedObra.Entregado,
        }),
      });

      fetchObrasActivas();
    } catch (error) {
      console.error('Error al cambiar el estado de la obra:', error);
    }
  };

  const handleChangeCategory = async (id, category) => {
    try {
      const updatedObra = obras.find((obra) => obra.id === id);
      if (!updatedObra) return;

      updatedObra[category] = !updatedObra[category];

      await fetch(`http://localhost:3300/obras/estado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [category]: updatedObra[category],
        }),
      });

      fetchObrasActivas();
    } catch (error) {
      console.error('Error al cambiar la categoría de la obra:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        <h2>Obras Activas</h2>
        <hr />
        <Form.Control
          type="text"
          placeholder="Buscar obra..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="button-container mt-3">
          <Button variant="primary" onClick={() => setShowClientModal(true)}>
            Buscar por Cliente
          </Button>
          <Button variant="secondary" onClick={() => setFilteredObras([...filteredObras].sort((a, b) => a.Nombre_obra.localeCompare(b.Nombre_obra)))}>
            Ordenar Alfabéticamente
          </Button>
          <Button variant="info" onClick={() => setShowStatusModal(true)}>
            Filtrar por Estado
          </Button>
          <Button variant="warning" onClick={() => setShowCategoryModal(true)}>
            Filtrar por Categoría
          </Button>
          <Button variant="danger" onClick={handleClearFilters}>
            Quitar filtro
          </Button>
        </div>
        <Row className="mt-4">
          {Array.isArray(filteredObras) && filteredObras.map((obra) => (
            <Col key={obra.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className={
                obra.EnCola ? 'bg-info' :
                obra.EnProgreso ? 'bg-warning' :
                obra.Finalizado ? 'bg-success' :
                obra.Entregado ? 'bg-danger' : ''
              }>
                <Card.Body>
                  <Card.Title>{obra.Nombre_obra}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {obra.Cliente ? `${obra.Cliente.Nombre} ${obra.Cliente.Apellido}` : ''}
                  </Card.Subtitle>
                  <Card.Text as="div">
                    <hr />
                    <Form.Group controlId={`formStateSelect-${obra.id}`}>
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        as="select"
                        value={
                          obra.EnCola ? 'EnCola' :
                          obra.EnProgreso ? 'EnProgreso' :
                          obra.Finalizado ? 'Finalizado' :
                          obra.Entregado ? 'Entregado' : ''
                        }
                        onChange={(e) => handleChangeStatus(obra.id, e.target.value)}
                      >
                        <option value="EnCola">En Cola</option>
                        <option value="EnProgreso">En Proceso</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Entregado">Entregado</option>
                      </Form.Control>
                    </Form.Group>
                    <div>
                      <Form.Check
                        type="checkbox"
                        label="Vidrio"
                        checked={obra.Vidrio}
                        onChange={() => handleChangeCategory(obra.id, 'Vidrio')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Carpintería"
                        checked={obra.Carpinteria}
                        onChange={() => handleChangeCategory(obra.id, 'Carpinteria')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Premarco"
                        checked={obra.Premarco}
                        onChange={() => handleChangeCategory(obra.id, 'Premarco')}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Otros"
                        checked={obra.Otros}
                        onChange={() => handleChangeCategory(obra.id, 'Otros')}
                      />
                    </div>
                    <p>Valor: {obra.Valor}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showClientModal} onHide={handleCloseClientModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar por Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formClientSearch">
            <Form.Label>Seleccionar Cliente</Form.Label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClientModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClientSubmit}>
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showStatusModal} onHide={handleCloseStatusModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar por Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formStatusFilter">
            <Form.Label>Seleccionar Estado</Form.Label>
            <Form.Control
              as="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="EnCola">En Cola</option>
              <option value="EnProgreso">En Progreso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Entregado">Entregado</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatusModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleStatusSubmit}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar por Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCategoryFilter">
            <Form.Label>Seleccionar Categoría</Form.Label>
            <Form.Control
              as="select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="Vidrio">Vidrio</option>
              <option value="Carpinteria">Carpintería</option>
              <option value="Premarco">Premarco</option>
              <option value="Otros">Otros</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCategoryModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCategorySubmit}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ObrasPage;


