import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalForm = ({ show, handleClose, handleSubmit, title, fields }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {};
    fields.forEach(field => {
      formData[field.name] = form[field.name].value;
    });
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {fields.map(field => (
            <Form.Group controlId={field.name} key={field.name}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control type={field.type} name={field.name} required={field.required} />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
