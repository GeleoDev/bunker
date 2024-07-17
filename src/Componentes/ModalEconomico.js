import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalEconomico = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
      tipo: 'INGRESO',
      descripcion: '',
      valor: '',
      fecha: '',
      tarjeta: false,
      nombre_cliente: '',
      material: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Insertar en la tabla resumen
          await axios.post('http://localhost:3001/contabilidad', {
            tipo: formData.tipo,
            descripcion: formData.descripcion,
            valor: formData.valor,
            fecha: formData.fecha,
            tarjeta: formData.tarjeta,
          });
        
          if (formData.tipo === 'INGRESO') {
            await axios.post('http://localhost:3001/ingresos', {
              MontoIng: formData.valor,
              Obra: formData.descripcion,
              fecha_ingreso: formData.fecha,
              tarjeta: formData.tarjeta,
              nombre_cliente: formData.nombre_cliente,
            });