import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ModalCliente from './ModalCliente';
import ModalObra from './ModalObra';
import ModalProveedor from './ModalProveedor';
import ModalEmpleado from './ModalEmpleado'; // Importar ModalEmpleado
import ObrasInactivas from './ObrasInactivas';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShop, faArrowRight, faIndustry, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AdminPage() {
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showObraModal, setShowObraModal] = useState(false);
  const [showProveedorModal, setShowProveedorModal] = useState(false);
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [obras, setObras] = useState([]);
  const navigate = useNavigate();

  const handleShowClienteModal = () => setShowClienteModal(true);
  const handleCloseClienteModal = () => setShowClienteModal(false);

  const handleShowObraModal = () => setShowObraModal(true);
  const handleCloseObraModal = () => setShowObraModal(false);

  const handleShowProveedorModal = () => setShowProveedorModal(true);
  const handleCloseProveedorModal = () => setShowProveedorModal(false);

  const handleShowEmpleadoModal = () => setShowEmpleadoModal(true);
  const handleCloseEmpleadoModal = () => setShowEmpleadoModal(false);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3300/clients');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const fetchObras = async () => {
    try {
      const response = await fetch('http://localhost:3300/obras/inactive');
      const data = await response.json();
      setObras(data);
    } catch (error) {
      console.error('Error al obtener las obras:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchObras();
  }, []);

  const handleClienteSubmit = (cliente) => {
    fetch('http://localhost:3300/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Cliente creado:', data);
        fetchClientes(); // Actualiza la lista de clientes
        handleCloseClienteModal();
      })
      .catch(error => console.error('Error al crear el cliente:', error));
  };

  const handleObraSubmit = (obra) => {
    fetch('http://localhost:3300/obras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obra),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Obra creada:', data);
        fetchObras(); // Actualiza la lista de obras
        handleCloseObraModal();
      })
      .catch(error => console.error('Error al crear la obra:', error));
  };

  const handleObraUpdate = (obra) => {
    fetch(`http://localhost:3300/obras/${obra.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obra),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Obra actualizada:', data);
        fetchObras(); // Actualiza la lista de obras
        handleCloseObraModal();
      })
      .catch(error => console.error('Error al actualizar la obra:', error));
  };

  const handleObraDelete = (id) => {
    fetch(`http://localhost:3300/obras/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Obra eliminada:', data);
        fetchObras(); // Actualiza la lista de obras
      })
      .catch(error => console.error('Error al eliminar la obra:', error));
  };

  const handleObraActivate = (id) => {
    fetch(`http://localhost:3300/obras/activar/${id}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Obra activada:', data);
        fetchObras(); // Actualiza la lista de obras
      })
      .catch(error => console.error('Error al activar la obra:', error));
  };

  const handleProveedorSubmit = (proveedor) => {
    fetch('http://localhost:3300/proveedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Proveedor creado:', data);
        handleCloseProveedorModal();
      })
      .catch(error => console.error('Error al crear el proveedor:', error));
  };

  const handleEmpleadoSubmit = (empleado) => {
    fetch('http://localhost:3300/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleado),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Empleado creado:', data);
        handleCloseEmpleadoModal();
      })
      .catch(error => console.error('Error al crear el empleado:', error));
  };

  const handleNavigateToObras = () => {
    navigate('/obras');
  };

  return (
    <div className="App">
      <NavBar />
      <div className="container mt-4">
        <div className="button-container">
          <Button
            variant="primary"
            onClick={handleShowClienteModal}
            className="square-button"
          >
            <br/>
            <FontAwesomeIcon icon={faUser} size="2x" className="fa-icon" />
            <br/>
            <span>Ingresar Cliente</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleShowObraModal}
            className="square-button"
          >
            <br/>
            <FontAwesomeIcon icon={faShop} size="2x" className="fa-icon" />
            <br/>
            <span>Ingresar Obra</span>
          </Button>
          <Button
            variant="success"
            onClick={handleNavigateToObras}
            className="square-button"
          >
            <br/>
            <FontAwesomeIcon icon={faArrowRight} size="2x" className="fa-icon" />
            <br/>
            <span>Ver Obras Activas</span>
          </Button>
          <Button
            variant="warning"
            onClick={handleShowProveedorModal}
            className="square-button"
          >
            <br/>
            <FontAwesomeIcon icon={faIndustry} size="2x" className="fa-icon" />
            <br/>
            <span>Ingresar Proveedor</span>
          </Button>
          <Button
            variant="info"
            onClick={handleShowEmpleadoModal}
            className="square-button"
          >
            <br/>
            <FontAwesomeIcon icon={faBuilding} size="2x" className="fa-icon" />
            <br/>
            <span>Ingresar Empleado</span>
          </Button>
        </div>
        <hr />
        <ObrasInactivas
          clientes={clientes}
          obras={obras}
          onEdit={handleObraUpdate}
          onDelete={handleObraDelete}
          onActivate={handleObraActivate} // Activar la obra
        />
      </div>
      <ModalCliente
        show={showClienteModal}
        handleClose={handleCloseClienteModal}
        handleSubmit={handleClienteSubmit}
      />
      <ModalObra
        show={showObraModal}
        handleClose={handleCloseObraModal}
        handleSubmit={handleObraSubmit}
        clientes={clientes}
      />
      <ModalProveedor
        show={showProveedorModal}
        handleClose={handleCloseProveedorModal}
        handleSubmit={handleProveedorSubmit}
      />
      <ModalEmpleado
        show={showEmpleadoModal}
        handleClose={handleCloseEmpleadoModal}
        handleSubmit={handleEmpleadoSubmit}
      />
    </div>
  );
}

export default AdminPage;
