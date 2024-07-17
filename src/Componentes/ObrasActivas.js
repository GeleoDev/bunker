import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const ObrasActivas = ({ obras }) => {
  return (
    <Container className="mt-4">
      <Row>
        {obras.map((obra) => (
          <Col key={obra.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{obra.Nombre_obra}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {obra.Cliente ? `${obra.Cliente.Nombre} ${obra.Cliente.Apellido}` : ''}
                </Card.Subtitle>
                <Card.Text>
                  <div>Vidrios: {obra.Vidrio ? '✔️' : '❌'}</div>
                  <div>Carpintería: {obra.Carpinteria ? '✔️' : '❌'}</div>
                  <div>Marcos: {obra.Premarco ? '✔️' : '❌'}</div>
                  <div>Otros: {obra.Otros ? '✔️' : '❌'}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ObrasActivas;