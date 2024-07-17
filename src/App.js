import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel, Button, Row, Col, Form } from 'react-bootstrap';
import AdminPage from './Componentes/AdminPage';
import ModalLogin from './Componentes/ModalLogin';
import ObrasPage from './Componentes/ObrasPage';
import './App.css';
import ContabilidadPage from './Componentes/ContabilidadPage';

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Bunker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#contact">Contactanos</Nav.Link>
            <Button variant="link" className="nav-link" onClick={handleShowLoginModal}>Ingresar</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="hero-section text-center my-5">
        <h1>Bienvenido a Bunker</h1>
        <p>Proveemos las mejores soluciones en aberturas, ventanas y puertas.</p>
      </div>

      <div id="contact" className="contact-section my-5">
        <Container>
          <Row>
            <Col md={6}>
              <h2>Contactanos</h2>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu nombre" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Ingresa tu email" />
                </Form.Group>
                <Form.Group controlId="formMessage">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <footer className="footer bg-dark text-white text-center py-3">
        <Container>
          <Row>
            <Col>&copy; 2024 Bunker. Todos los derechos reservados.</Col>
          </Row>
        </Container>
      </footer>

      <ModalLogin show={showLoginModal} handleClose={handleCloseLoginModal} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" element={<ModalLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/obras" element={<ObrasPage />} /> 
        <Route path="/contabilidad" element={<ContabilidadPage />} />{/* Ruta para obras activas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


