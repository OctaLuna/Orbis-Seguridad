import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// --- Componente de Alerta Re-diseñado ---
// Ahora está completamente integrado con tu paleta de colores.
const StatusAlert = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';

  // Usamos 'accent' para éxito y un rojo estándar de UI para error.
  const accentColor = isSuccess ? 'bg-accent' : 'bg-red-600';
  const icon = isSuccess ? '✓' : '✕';
  const title = isSuccess ? '¡Éxito!' : '¡Error!';

  return (
    <motion.div
      className="fixed inset-0 bg-primary bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-surface p-8 rounded-lg shadow-2xl text-center max-w-sm w-full relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-1.5 ${accentColor}`}></div>
        <div className="flex justify-center mb-4">
          <div className={`text-6xl ${isSuccess ? 'text-accent' : 'text-red-600'}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bodoni text-primary mb-3">{title}</h3>
        <p className="font-miles text-text-main mb-6">{message}</p>
        <motion.button
          onClick={onClose}
          className={`${accentColor} text-white font-bodoni py-2 px-8 rounded-md hover:bg-opacity-80 transition-all duration-200`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Aceptar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


// --- Componente Principal Re-diseñado ---
const RegistroEmpresa = ({ ancho = '100%', alto = '100%', onRegistroExitoso }) => {
  const [formulario, setFormulario] = useState({
    denominacion_social: '',
    nombre_comercial: '',
    fecha_fundacion: '',
    nit: '',
    vision: '',
    mision: '',
    descripcion: '',
    url: '',
    direccion_web: '',
    id_actividad: '',
    id_tamanio: '',
  });

  const [actividades, setActividades] = useState([]);
  const [tamanios, setTamanios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('');

  const handleShowAlert = (message, type) => {
    setMensajeAlerta(message);
    setTipoAlerta(type);
    setMostrarAlerta(true);
  };

  const handleAlertClose = () => {
    setMostrarAlerta(false);
    if (tipoAlerta === 'success') {
      setFormulario({
        denominacion_social: '', nombre_comercial: '', fecha_fundacion: '', nit: '',
        vision: '', mision: '', descripcion: '', url: '', direccion_web: '',
        id_actividad: '', id_tamanio: '',
      });
      onRegistroExitoso?.();
    }
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [actRes, tamRes] = await Promise.all([
          axios.get('http://localhost:3000/actividades'),
          axios.get('http://localhost:3000/tamanios')
        ]);
        setActividades(actRes.data.actividades || actRes.data || []);
        setTamanios(tamRes.data.tamanios || []);
      } catch (error) {
        handleShowAlert('Error al cargar datos. Intenta de nuevo.', 'error');
      }
    };
    fetchDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const requiredFields = {
        denominacion_social: 'La denominación social es obligatoria.',
        nombre_comercial: 'El nombre comercial es obligatorio.',
        fecha_fundacion: 'La fecha de fundación es obligatoria.',
        nit: 'El NIT válido es obligatorio.',
        id_actividad: 'Debes seleccionar una actividad.',
        id_tamanio: 'Debes seleccionar un tamaño.',
    };
    for (const field in requiredFields) {
        if (!formulario[field] || (field === 'nit' && isNaN(Number(formulario.nit)))) {
            handleShowAlert(requiredFields[field], 'error');
            return false;
        }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const payload = {
        ...formulario,
        nit: Number(formulario.nit),
        id_actividad: Number(formulario.id_actividad),
        id_tamanio: Number(formulario.id_tamanio),
        fecha_fundacion: new Date(formulario.fecha_fundacion).toISOString().split('T')[0],
      };
      await axios.post('http://localhost:3000/ingresarEmpresa', payload);
      handleShowAlert('Empresa registrada exitosamente.', 'success');
    } catch (error) {
      handleShowAlert('Error al registrar empresa. Intenta nuevamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Clases reutilizables para los inputs del formulario
  const inputStyles = "w-full bg-background border border-stroke rounded-md px-3 py-2 font-miles text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200";

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto" style={{ width: ancho, height: alto, overflowY: 'auto' }}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <h1 className="text-3xl font-bodoni text-center text-primary tracking-wider">Registro de Empresa</h1>
        
        <div>
            <label className="block mb-2 font-bodoni text-text-main">Denominación Social *</label>
            <input type="text" name="denominacion_social" value={formulario.denominacion_social} onChange={handleChange} className={inputStyles} required disabled={loading} />
        </div>

        <div>
            <label className="block mb-2 font-bodoni text-text-main">Nombre Comercial *</label>
            <input type="text" name="nombre_comercial" value={formulario.nombre_comercial} onChange={handleChange} className={inputStyles} required disabled={loading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block mb-2 font-bodoni text-text-main">Fecha Fundación *</label>
                <input type="date" name="fecha_fundacion" value={formulario.fecha_fundacion} onChange={handleChange} className={inputStyles} required disabled={loading} />
            </div>
            <div>
                <label className="block mb-2 font-bodoni text-text-main">NIT *</label>
                <input type="number" name="nit" value={formulario.nit} onChange={handleChange} className={inputStyles} required disabled={loading} />
            </div>
        </div>

        <div>
            <label className="block mb-2 font-bodoni text-text-main">Visión</label>
            <input type="text" name="vision" value={formulario.vision} onChange={handleChange} className={inputStyles} disabled={loading} />
        </div>

        <div>
            <label className="block mb-2 font-bodoni text-text-main">Misión</label>
            <textarea name="mision" value={formulario.mision} onChange={handleChange} className={inputStyles} rows={3} disabled={loading} />
        </div>
        
        <div>
            <label className="block mb-2 font-bodoni text-text-main">Descripción</label>
            <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} className={inputStyles} rows={3} disabled={loading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block mb-2 font-bodoni text-text-main">Nombre de Imagen (URL)</label>
                <input type="text" name="url" value={formulario.url} onChange={handleChange} className={inputStyles} disabled={loading} />
            </div>
            <div>
                <label className="block mb-2 font-bodoni text-text-main">Dirección Web</label>
                <input type="text" name="direccion_web" value={formulario.direccion_web} onChange={handleChange} className={inputStyles} disabled={loading} />
            </div>
        </div>

        <div>
            <label className="block mb-2 font-bodoni text-text-main">Actividad *</label>
            <select name="id_actividad" value={formulario.id_actividad} onChange={handleChange} className={inputStyles} required disabled={loading}>
                <option value="">-- Seleccione una actividad --</option>
                {actividades.map(act => (
                    <option key={act.id_actividad} value={act.id_actividad}>{act.nombre_actividad}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="block mb-2 font-bodoni text-text-main">Tamaño *</label>
            <select name="id_tamanio" value={formulario.id_tamanio} onChange={handleChange} className={inputStyles} required disabled={loading}>
                <option value="">-- Seleccione un tamaño --</option>
                {tamanios.map(tam => (
                    <option key={tam.id_tamanio} value={tam.id_tamanio}>{tam.nombre_tamanio}</option>
                ))}
            </select>
        </div>
        
        <button type="submit" disabled={loading} className={`w-full py-3 mt-4 rounded-lg font-bodoni text-lg transition-all duration-300 ${loading ? 'bg-stroke text-text-muted cursor-not-allowed' : 'bg-accent text-primary hover:bg-opacity-80'}`}>
          {loading ? 'Registrando...' : 'Registrar Empresa'}
        </button>
      </form>

      <AnimatePresence>
        {mostrarAlerta && <StatusAlert message={mensajeAlerta} type={tipoAlerta} onClose={handleAlertClose} />}
      </AnimatePresence>
    </div>
  );
};

export default RegistroEmpresa;
