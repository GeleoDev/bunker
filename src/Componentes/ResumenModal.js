import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ResumenModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    valor: '',
    tarjeta: false,
    clienteID: '',
    obraID: '',
    proveedorID: '',
    materialID: '',
    empleadoID: '',
    nombreGasto: '',
    descripcionGasto: '',
    nombreServicio: '',
    descripcionServicio: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos a la tabla resumen
      await axios.post('http://localhost:3300/api/resumen', formData);

      // Enviar datos a la tabla específica según el tipo
      switch (formData.tipo) {
        case 'INGRESO':
          await axios.post('http://localhost:3300/api/ingresos', {
            ClienteID: formData.clienteID,
            ObraID: formData.obraID,
            MontoIng: formData.valor,
            Tarjeta: formData.tarjeta,
          });
          break;
        case 'MATERIALES':
          await axios.post('http://localhost:3300/api/egreso_material', {
            ProveedorID: formData.proveedorID,
            MaterialesID: formData.materialID,
            MontoEgr: formData.valor,
            Descripcion_Egreso: formData.descripcion,
            Tarjeta: formData.tarjeta,
          });
          break;
        case 'SUELDOS':
          await axios.post('http://localhost:3300/api/egreso_sueldo', {
            EmpleadoID: formData.empleadoID,
            MontoSueldo: formData.valor,
            Tarjeta: formData.tarjeta,
          });
          break;
        case 'GASTOS EXTRAS':
          await axios.post('http://localhost:3300/api/gastos_extra', {
            NombreGasto: formData.nombreGasto,
            Descripcion_Gasto: formData.descripcionGasto,
            MontoGasto: formData.valor,
            Tarjeta: formData.tarjeta,
          });
          break;
        case 'SERVICIOS':
          await axios.post('http://localhost:3300/api/servicios', {
            NombreServicio: formData.nombreServicio,
            Descripcion_Servicio: formData.descripcionServicio,
            MontoServicio: formData.valor,
            Tarjeta: formData.tarjeta,
          });
          break;
        default:
          break;
      }

      handleClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Resumen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control as="select" name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="">Seleccione un tipo</option>
              <option value="INGRESO">Ingreso</option>
              <option value="MATERIALES">Materiales</option>
              <option value="SUELDOS">Sueldos</option>
              <option value="GASTOS EXTRAS">Gastos Extras</option>
              <option value="SERVICIOS">Servicios</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formValor">
            <Form.Label>Valor</Form.Label>
            <Form.Control type="number" name="valor" value={formData.valor} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formTarjeta">
            <Form.Check type="checkbox" name="tarjeta" label="Tarjeta" checked={formData.tarjeta} onChange={handleChange} />
          </Form.Group>

          {/* Campos adicionales basados en el tipo seleccionado */}
          {formData.tipo === 'INGRESO' && (
            <>
              <Form.Group controlId="formClienteID">
                <Form.Label>Cliente ID</Form.Label>
                <Form.Control type="text" name="clienteID" value={formData.clienteID} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formObraID">
                <Form.Label>Obra ID</Form.Label>
                <Form.Control type="text" name="obraID" value={formData.obraID} onChange={handleChange} required />
              </Form.Group>
            </>
          )}
          {formData.tipo === 'MATERIALES' && (
            <>
              <Form.Group controlId="formProveedorID">
                <Form.Label>Proveedor ID</Form.Label>
                <Form.Control type="text" name="proveedorID" value={formData.proveedorID} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formMaterialID">
                <Form.Label>Material ID</Form.Label>
                <Form.Control type="text" name="materialID" value={formData.materialID} onChange={handleChange} required />
              </Form.Group>
            </>
          )}
          {formData.tipo === 'SUELDOS' && (
            <Form.Group controlId="formEmpleadoID">
              <Form.Label>Empleado ID</Form.Label>
              <Form.Control type="text" name="empleadoID" value={formData.empleadoID} onChange={handleChange} required />
            </Form.Group>
          )}
          {formData.tipo === 'GASTOS EXTRAS' && (
            <>
              <Form.Group controlId="formNombreGasto">
                <Form.Label>Nombre del Gasto</Form.Label>
                <Form.Control type="text" name="nombreGasto" value={formData.nombreGasto} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formDescripcionGasto">
                <Form.Label>Descripción del Gasto</Form.Label>
                <Form.Control as="textarea" name="descripcionGasto" value={formData.descripcionGasto} onChange={handleChange} required />
              </Form.Group>
            </>
          )}
          {formData.tipo === 'SERVICIOS' && (
            <>
              <Form.Group controlId="formNombreServicio">
                <Form.Label>Nombre del Servicio</Form.Label>
                <Form.Control type="text" name="nombreServicio" value={formData.nombreServicio} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formDescripcionServicio">
                <Form.Label>Descripción del Servicio</Form.Label>
                <Form.Control as="textarea" name="descripcionServicio" value={formData.descripcionServicio} onChange={handleChange} required />
              </Form.Group>
            </>
          )}

          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResumenModal;

