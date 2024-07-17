import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Estilos/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigateToObras = () => {
    navigate('/obras');
  };

  const handleNavigateToAdmin = () => {
    navigate('/admin');
  };

  const handleNavigateToContabilidad = () => {
    navigate('/contabilidad');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">Bunker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/admin" className="custom-nav-link" onClick={handleNavigateToAdmin}>Administración</Nav.Link>
          <Nav.Link as={Link} to="/obras" className="custom-nav-link" onClick={handleNavigateToObras}>Obras</Nav.Link>
          <Nav.Link as={Link} to="/contabilidad" className="custom-nav-link" onClick={handleNavigateToContabilidad}>Contabilidad</Nav.Link>
          <Nav.Link as={Link} to="/clientes" className="custom-nav-link">Clientes</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;