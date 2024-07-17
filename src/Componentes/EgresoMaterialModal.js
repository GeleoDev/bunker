import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EgresoMaterialModal = ({ show, handleClose, handleSubmit }) => {
  const [proveedores, setProveedores] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [formData, setFormData] = useState({
    ProveedorID: '',
    MaterialesID: '',
    MontoEgr: 0,
    Descripcion_Egreso: '',
    Tarjeta: false
  });

  useEffect(() => {
    fetch('/api/proveedores')
      .then(res => res.json())
      .then(data => setProveedores(data));

    fetch('/api/materiales')
      .then(res => res.json())
      .then(data => setMateriales(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Egreso de Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formProveedorID">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control as="select" name="ProveedorID" onChange={handleInputChange} required>
              <option value="">Seleccione un proveedor</option>
              {proveedores.map(proveedor => (
                <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre_prov} {proveedor.apellido_prov}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMaterialesID">
            <Form.Label>Nombre del Material</Form.Label>
            <Form.Control as="select" name="MaterialesID" onChange={handleInputChange} required>
              <option value="">Seleccione un material</option>
              {materiales.map(material => (
                <option key={material.id} value={material.id}>{material.NombreMaterial}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMontoEgr">
            <Form.Label>Monto</Form.Label>
            <Form.Control type="number" name="MontoEgr" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formDescripcionEgreso">
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" name="Descripcion_Egreso" onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group controlId="formTarjeta">
            <Form.Check type="checkbox" label="Tarjeta" name="Tarjeta" onChange={handleCheckboxChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EgresoMaterialModal;
