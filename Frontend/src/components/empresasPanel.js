import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import RegistroEmpresa from './registroEmpresa';
import MapaBolivia from './mapaBolivia';
import empresaPanelNuevo from './empresaPanelNuevo';

const EmpresasPanel = ({ loggedInUser }) => {
  
  // Estados para datos
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ordenAntiguedad, setOrdenAntiguedad] = useState('asc');
  const [filtroActivo, setFiltroActivo] = useState(null); // '50años'|'premio'|'rubro'|'departamento'
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalEditable, setModalEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  
  

  // Lista de rubros para mostrar (solo lectura)
  const [rubrosDisponibles, setRubrosDisponibles] = useState([]);
  
  // Base URL para Cloudinary
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

  // Roles para edición
  const esAdmin = loggedInUser?.idRol === 1;
  const esColaborador = loggedInUser?.idRol === 2;
  const puedeEditar = esAdmin || esColaborador;
  const recargarEmpresas = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/empresas/resumen');
      const mapped = data.map(mapEmpresaResumen);
      setFullEmpresas(mapped);
      setEmpresas(mapped);
    } catch (error) {
      console.error('Error recargando empresas:', error);
    }
  };

  // Mapear respuesta del API para resumen
  const mapEmpresaResumen = e => ({
    id: e.id_empresa,
    nombre: e.nombre_comercial,
    rubro: e.nombre_actividad || '',
    descripcion_actividad: e.descripcion_actividad || '',
    slogan: e.vision || '',
    descripcion: e.descripcion || '',
    fecha_fundacion: e.fecha_fundacion || '',
    fundacion: e.fecha_fundacion ? new Date(e.fecha_fundacion).getFullYear() : '',
    sede: e.sedes?.[0]?.ciudad || '',
    departamento: e.sedes?.[0]?.departamento || '',
    empleados: e.nombre_tamanio || '',
    sitioWeb: e.direccion_web || '',
    imagen: e.urlLogo
      ? (e.urlLogo.startsWith('http') ? e.urlLogo : `${CLOUDINARY_BASE_URL}/${e.urlLogo}`)
      : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
    tienePremios: e.premios?.length > 0 || false,
    rubros: e.rubros || [],
    operacionesInternacionales: e.operaciones_internacionales || [],
    familia: e.familia || [],
    premios: e.premios || [],
    id_actividad: e.id_actividad || 0,   // agrega id_actividad para uso interno
    id_tamanio: e.id_tamanio || 0
        // agrega id_tamano para uso interno
  });

  // Fetch inicial de empresas y rubros
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/empresas/resumen');
        const mapped = data.map(mapEmpresaResumen);
        setFullEmpresas(mapped);
        setEmpresas(mapped);
      } catch (error) {
        console.error('Error al cargar empresas:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRubros = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/rubros'); // Ajusta endpoint si necesario
        if (Array.isArray(data)) {
          setRubrosDisponibles(data);
        } else {
          setRubrosDisponibles([]);
        }
      } catch (error) {
        console.error('Error al cargar rubros:', error);
        setRubrosDisponibles([]);
      }
    };

    fetchEmpresas();
    fetchRubros();
  }, []);
// Dentro del componente EmpresasPanel (después de los hooks y funciones existentes):

const [showCrearModal, setShowCrearModal] = useState(false);
const [nuevoEmpresaData, setNuevoEmpresaData] = useState({
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

// Cargar actividades y tamanios para los combos en la creación
useEffect(() => {
  const fetchActividades = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/actividades');
      setActividades(data);
    } catch (error) {
      console.error('Error cargando actividades:', error);
    }
  };
  const fetchTamanios = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/tamanios');
      setTamanios(data);
    } catch (error) {
      console.error('Error cargando tamaños:', error);
    }
  };
  fetchActividades();
  fetchTamanios();
}, []);

  // Manejar cambios en formulario creación
  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpresaData(prev => ({ ...prev, [name]: value }));
  };

  const handleCrearEmpresa = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nuevoEmpresaData.denominacion_social.trim()) {
      alert('Denominación social es obligatoria');
      return;
    }
    if (!nuevoEmpresaData.nit || isNaN(Number(nuevoEmpresaData.nit))) {
      alert('NIT válido es obligatorio');
      return;
    }
    if (!nuevoEmpresaData.fecha_fundacion) {
      alert('Fecha de fundación es obligatoria');
      return;
    }
    if (!nuevoEmpresaData.id_actividad) {
      alert('Selecciona una actividad');
      return;
    }
    if (!nuevoEmpresaData.id_tamanio) {
      alert('Selecciona un tamaño');
      return;
    }

    try {
      const payload = {
        ...nuevoEmpresaData,
        id_usuario: loggedInUser.id_usuario,
        fecha_fundacion: new Date(nuevoEmpresaData.fecha_fundacion).toISOString(),
        nit: Number(nuevoEmpresaData.nit),
        id_actividad: Number(nuevoEmpresaData.id_actividad),
        id_tamanio: Number(nuevoEmpresaData.id_tamanio),
      };

      await axios.post('http://localhost:3000/ingresarEmpresa', payload);
      setShowCrearModal(false);
      // Recargar empresas
      const { data } = await axios.get('http://localhost:3000/empresas/resumen');
      setFullEmpresas(data.map(mapEmpresaResumen));
      setEmpresas(data.map(mapEmpresaResumen));
    } catch (error) {
      console.error('Error creando empresa:', error);
      alert('Error al crear empresa. Intenta nuevamente.');
    }
  };


  // Filtrar y ordenar
  useEffect(() => {
    let lista = [...fullEmpresas];
    const term = busqueda.trim().toLowerCase();

    if (term) {
      lista = lista.filter(e =>
        (e.nombre || '').toLowerCase().includes(term) ||
        (e.rubro || '').toLowerCase().includes(term) ||
        (e.departamento || '').toLowerCase().includes(term)
      );
    }

    lista.sort((a, b) => {
      const dateA = a.fecha_fundacion ? new Date(a.fecha_fundacion) : new Date(0);
      const dateB = b.fecha_fundacion ? new Date(b.fecha_fundacion) : new Date(0);
      return ordenAntiguedad === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setEmpresas(lista);
  }, [fullEmpresas, busqueda, ordenAntiguedad]);

  // Manejar filtros (sin cambios)
  const aplicarFiltro = (tipoFiltro) => {
    if (filtroActivo === tipoFiltro) {
      setEmpresas(fullEmpresas);
      setFiltroActivo(null);
      return;
    }

    setFiltroActivo(tipoFiltro);

    if (tipoFiltro === '50años') {
      const añoActual = new Date().getFullYear();
      const empresas50 = fullEmpresas.filter(e => añoActual - e.fundacion > 50);
      const otrasEmpresas = fullEmpresas.filter(e => añoActual - e.fundacion <= 50);
      setEmpresas(empresas50.concat(otrasEmpresas));
    }
    else if (tipoFiltro === 'premio') {
      const conPremios = fullEmpresas.filter(e => e.tienePremios);
      const sinPremios = fullEmpresas.filter(e => !e.tienePremios);
      setEmpresas(conPremios.concat(sinPremios));
    }
    else if (tipoFiltro === 'rubro') {
      const agrupadasPorRubro = fullEmpresas.reduce((acc, empresa) => {
        const rubro = empresa.rubro || 'Sin rubro';
        if (!acc[rubro]) acc[rubro] = [];
        acc[rubro].push(empresa);
        return acc;
      }, {});
      const listaAgrupada = Object.values(agrupadasPorRubro).flat();
      setEmpresas(listaAgrupada);
    }
    else if (tipoFiltro === 'departamento') {
      const agrupadasPorDepto = fullEmpresas.reduce((acc, empresa) => {
        const depto = empresa.departamento || 'Sin departamento';
        if (!acc[depto]) acc[depto] = [];
        acc[depto].push(empresa);
        return acc;
      }, {});
      const listaAgrupada = Object.values(agrupadasPorDepto).flat();
      setEmpresas(listaAgrupada);
    }
  };

  // Abrir modal detalle solo lectura (sin cambios)
  const openModal = async (empresa) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/empresa/${empresa.id}`);
      setSelectedEmpresa({
        id: data.id_empresa,
        denominacion_social: data.denominacion_social || '',
        nombre: data.nombre_comercial || '',
        slogan: data.vision || '',
        descripcion: data.descripcion || '',
        rubro: data.nombre_actividad || '',
        id_actividad: data.id_actividad || 0,
        descripcion_actividad: data.descripcion_actividad || '',
        fundacion: data.fecha_fundacion ? new Date(data.fecha_fundacion).getFullYear() : '',
        sede: data.sedes?.[0]?.ciudad || '',
        departamento: data.sedes?.[0]?.departamento || '',
        empleados: data.nombre_tamanio || '',
        sitioWeb: data.direccion_web || '',
        imagen: data.urlLogo ? (data.urlLogo.startsWith('http') ? data.urlLogo : `${CLOUDINARY_BASE_URL}/${data.urlLogo}`) : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
        premios: data.premios || [],
        rubros: data.rubros || [],
        operacionesInternacionales: data.operaciones_internacionales || [],
        familia: data.familia || [],
        id_tamano: data.id_tamano || 0
      });
      setModalEditable(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles de la empresa:', error);
    }
  };

  // Abrir modal editable (sin select para relaciones, solo texto y mantener id oculto)
  const openModalEditable = async (empresa) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/empresa/${empresa.id}`);
      console.log('Datos empresa para editar:', data); // <-- verificar que id_actividad esté correcto
      setSelectedEmpresa({
        id: data.id_empresa,
        denominacion_social: data.denominacion_social || '',
        nombre: data.nombre_comercial || '',
        slogan: data.vision || '',
        descripcion: data.descripcion || '',
        rubro: data.nombre_actividad || '',         // texto solo lectura
        id_actividad: data.id_actividad || 0,       // id oculto, no editable
        descripcion_actividad: data.descripcion_actividad || '',
        fundacion: data.fecha_fundacion ? new Date(data.fecha_fundacion).getFullYear() : '',
        sede: data.sedes?.[0]?.ciudad || '',
        departamento: data.sedes?.[0]?.departamento || '',
        empleados: data.nombre_tamanio || '',
        sitioWeb: data.direccion_web || '',
        imagen: data.urlLogo ? (data.urlLogo.startsWith('http') ? data.urlLogo : `${CLOUDINARY_BASE_URL}/${data.urlLogo}`) : '',
        premios: data.premios || [],
        rubros: data.rubros || [],
        operacionesInternacionales: data.operaciones_internacionales || [],
        familia: data.familia || [],
        id_tamano: data.id_tamano || 0              // id oculto, no editable
      });
      setModalEditable(true);
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles de la empresa para editar:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

const handleGuardarCambios = async (empresaEditada) => {
  try {
    setLoading(true);

    if (!empresaEditada.denominacion_social || empresaEditada.denominacion_social.trim() === '') {
      alert("Debe ingresar la denominación social.");
      setLoading(false);
      return;
    }

    if (!empresaEditada.nit || empresaEditada.nit === 0) {
      alert("Debe ingresar un NIT válido.");
      setLoading(false);
      return;
    }

    if (!empresaEditada.id) {
      alert("No se encontró el ID de la empresa para actualizar.");
      setLoading(false);
      return;
    }

    const payload = {
      id_usuario: loggedInUser.id_usuario || 0,
      denominacion_social: empresaEditada.denominacion_social.trim(),
      nombre_comercial: empresaEditada.nombre || '',
      fecha_fundacion: empresaEditada.fundacion ? new Date(empresaEditada.fundacion, 0, 1).toISOString() : null,
      nit: empresaEditada.nit,
      vision: empresaEditada.slogan || '',
      mision: empresaEditada.mision?.trim() || "No disponible",
      descripcion: empresaEditada.descripcion || '',
      url: empresaEditada.url?.trim() || "http://example.com",
      direccion_web: empresaEditada.sitioWeb || '',
      id_actividad: empresaEditada.id_actividad || 1,
      id_tamanio: empresaEditada.id_tamanio || 1,
    };

    console.log('Actualizando empresa id:', empresaEditada.id, 'con datos:', payload);

    await axios.put(`http://localhost:3000/actualizarEmpresa/${empresaEditada.id}`, payload);

    setFullEmpresas(prev => prev.map(e => e.id === empresaEditada.id ? {...e, ...empresaEditada} : e));
    setEmpresas(prev => prev.map(e => e.id === empresaEditada.id ? {...e, ...empresaEditada} : e));

    setShowModal(false);
  } catch (error) {
    console.error('Error al guardar cambios:', error);
    alert("Error al guardar los cambios. Intenta nuevamente.");
  } finally {
    setLoading(false);
  }
};


  const visitarSitio = () => {
    if (!selectedEmpresa?.sitioWeb) return;
    const url = selectedEmpresa.sitioWeb.startsWith('http')
      ? selectedEmpresa.sitioWeb
      : `https://${selectedEmpresa.sitioWeb}`;
    window.open(url, '_blank');
  };

  // EditableEmpresaModal - relaciones NO editables, solo mostrar como texto + ocultos para id_actividad y id_tamano
  const EditableEmpresaModal = ({ empresa, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...empresa });

    // Actualizar formData si cambia empresa
    useEffect(() => {
      setFormData({ ...empresa });
    }, [empresa]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      // Ignorar id_actividad y id_tamano si vienen de campos ocultos (no editables)
      if (name === 'id_actividad' || name === 'id_tamano') return;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-stroke">
          <h2 className="text-2xl font-bodoni font-bold text-primary uppercase tracking-wider">
            Modo de Edición
          </h2>
          <motion.button
            className="text-3xl text-text-muted hover:text-primary transition-colors duration-200"
            onClick={onClose}
            whileHover={{ scale: 1.2 }}
          >
            ×
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Denominación Social */}
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Denominación Social *
              </label>
              <input
                name="denominacion_social"
                type="text"
                value={formData.denominacion_social}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
                required
              />
            </div>

            {/* Nombre Comercial */}
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Nombre Comercial *
              </label>
              <input
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
                required
              />
            </div>

            {/* Eslogan / Visión */}
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Eslogan / Visión
              </label>
              <input
                name="slogan"
                type="text"
                value={formData.slogan}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
              />
            </div>

            {/* Año Fundación */}
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Año Fundación
              </label>
              <input
                name="fundacion"
                type="number"
                value={formData.fundacion}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear()}
                className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
              />
            </div>

            {/* NIT */}
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                NIT *
              </label>
              <input
                name="nit"
                type="number"
                value={formData.nit || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
                required
              />
            </div>

            {/* Sitio Web */}
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Sitio Web
              </label>
              <input
                name="sitioWeb"
                type="text"
                value={formData.sitioWeb}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bodoni font-bold text-primary mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
            />
          </div>

          {/* Actividad */}
          <div>
            <label className="block text-sm font-bodoni font-bold text-primary mb-2">
              Actividad
            </label>
            <textarea
              name="descripcion_actividad"
              value={formData.descripcion_actividad}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
            />
          </div>

          {/* Misión */}
          <div>
            <label className="block text-sm font-bodoni font-bold text-primary mb-2">
              Misión
            </label>
            <textarea
              name="mision"
              value={formData.mision || ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 border border-stroke rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
            />
          </div>

          {/* Campos de solo lectura */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Rubro (actividad)
              </label>
              <input
                type="text"
                value={formData.rubro || ''}
                className="w-full px-4 py-3 border border-stroke rounded-lg bg-surface text-text-muted font-miles cursor-not-allowed"
                disabled
                title="Campo no editable"
              />
            </div>

            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Tamaño (Empleados)
              </label>
              <input
                type="text"
                value={formData.empleados || ''}
                className="w-full px-4 py-3 border border-stroke rounded-lg bg-surface text-text-muted font-miles cursor-not-allowed"
                disabled
                title="Campo no editable"
              />
            </div>

            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Sede (Ciudad)
              </label>
              <input
                type="text"
                value={formData.sede}
                className="w-full px-4 py-3 border border-stroke rounded-lg bg-surface text-text-muted font-miles cursor-not-allowed"
                disabled
                title="Campo no editable"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-bodoni font-bold text-primary mb-2">
                Departamento
              </label>
              <input
                type="text"
                value={formData.departamento}
                className="w-full px-4 py-3 border border-stroke rounded-lg bg-surface text-text-muted font-miles cursor-not-allowed"
                disabled
                title="Campo no editable"
                readOnly
              />
            </div>
          </div>

          {/* Campos ocultos */}
          <input type="hidden" name="id_actividad" value={formData.id_actividad || 0} />
          <input type="hidden" name="id_tamano" value={formData.id_tamano || 0} />

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-6 border-t border-stroke">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-text-muted text-surface-elevated rounded-lg font-bodoni font-bold hover:bg-text-muted/80 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Cancelar
            </motion.button>
            <motion.button
              type="submit"
              className="px-8 py-3 bg-primary text-surface-elevated rounded-lg font-bodoni font-bold hover:bg-primary/90 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Guardar
            </motion.button>
          </div>
        </form>
      </>
    );
  };


// Modal solo lectura
const DetalleEmpresaModal = ({ empresa, onClose }) => {
  const visitarSitio = () => {
    const url = empresa.sitioWeb.startsWith('http') ? empresa.sitioWeb : `https://${empresa.sitioWeb}`;
    window.open(url, '_blank');
  };

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-stroke">
        <motion.h2 
          className="text-2xl font-bodoni font-bold text-primary"
          whileHover={{ scale: 1.03 }}
        >
          {empresa.nombre}
        </motion.h2>
        <motion.button
          className="text-3xl text-text-muted hover:text-primary transition-colors duration-200"
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
        >
          ×
        </motion.button>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-6">
          {empresa.slogan && (
            <motion.h3 
              className="text-lg font-bodoni font-bold text-accent italic"
              whileHover={{ scale: 1.03 }} 
              {...fadeIn}
            >
              {empresa.slogan}
            </motion.h3>
          )}

          {empresa.descripcion && (
            <motion.p 
              className="text-text-main font-miles leading-relaxed"
              {...fadeIn}
            >
              {empresa.descripcion}
            </motion.p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              className="bg-surface p-4 rounded-lg border border-stroke"
              {...fadeIn} 
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-miles text-text-main">
                <span className="font-bold text-primary">Rubro:</span> {empresa.rubro}
              </p>
            </motion.div>

            {empresa.descripcion_actividad && (
              <motion.div 
                className="bg-surface p-4 rounded-lg border border-stroke"
                {...fadeIn} 
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-miles text-text-main">
                  <span className="font-bold text-primary">Actividad:</span> {empresa.descripcion_actividad}
                </p>
              </motion.div>
            )}

            <motion.div 
              className="bg-surface p-4 rounded-lg border border-stroke"
              {...fadeIn} 
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-miles text-text-main">
                <span className="font-bold text-primary">Fundación:</span> {empresa.fundacion}
              </p>
            </motion.div>

            {empresa.sede && (
              <motion.div 
                className="bg-surface p-4 rounded-lg border border-stroke"
                {...fadeIn} 
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-miles text-text-main">
                  <span className="font-bold text-primary">Sede:</span> {empresa.sede}
                </p>
              </motion.div>
            )}

            {empresa.departamento && (
              <motion.div 
                className="bg-surface p-4 rounded-lg border border-stroke"
                {...fadeIn} 
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-miles text-text-main">
                  <span className="font-bold text-primary">Departamento:</span> {empresa.departamento}
                </p>
              </motion.div>
            )}

            {empresa.empleados && (
              <motion.div 
                className="bg-surface p-4 rounded-lg border border-stroke"
                {...fadeIn} 
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-miles text-text-main">
                  <span className="font-bold text-primary">Tamaño:</span> {empresa.empleados}
                </p>
              </motion.div>
            )}

            {empresa.sitioWeb && (
              <motion.div 
                className="bg-surface p-4 rounded-lg border border-stroke"
                {...fadeIn} 
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-miles text-text-main">
                  <span className="font-bold text-primary">Sitio web:</span> {empresa.sitioWeb}
                </p>
              </motion.div>
            )}
          </div>

          {empresa.premios?.length > 0 && (
            <motion.div 
              className="bg-surface p-4 rounded-lg border border-stroke"
              {...fadeIn} 
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bodoni font-bold text-primary mb-3">Premios</h4>
              <ul className="space-y-2">
                {empresa.premios.map((premio, idx) => (
                  <li key={idx} className="font-miles text-text-main text-sm">
                    <span className="font-bold">{premio.entidad_otorgadora}</span> ({premio.anio}) - {premio.descripcion} ({premio.tipo})
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-6 border-t border-stroke">
        {empresa.sitioWeb && (
          <motion.button
            className="bg-accent text-surface-elevated px-6 py-3 rounded-lg font-bodoni font-bold hover:bg-accent/90 transition-colors duration-200"
            onClick={visitarSitio}
            whileHover={{ scale: 1.05 }}
          >
            Visitar sitio web
          </motion.button>
        )}
        <motion.button
          className="bg-primary text-surface-elevated px-6 py-3 rounded-lg font-bodoni font-bold hover:bg-primary/90 transition-colors duration-200"
          onClick={() => window.location.href = `mailto:info@desconocido.com`}
          whileHover={{ scale: 1.05 }}
        >
          Contactar
        </motion.button>
      </div>
    </>
  );
};

  // Renderizar empresas con botón editar si puede
  const renderEmpresas = () => {
    return empresas.map((e, i) => (
      <motion.div
        key={e.id}
        className="relative bg-surface-elevated rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
        onClick={() => openModal(e)}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
      >
        <div className="relative h-48 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          {/* Nombre por defecto */}
          <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-300">
            <div className="bg-surface-elevated/90 text-primary px-4 py-2 rounded-lg font-bodoni font-bold text-center text-sm lg:text-base">
              {e.nombre}
            </div>
          </div>
          
          {/* Overlay con información */}
          <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <h3 className="text-surface-elevated font-bodoni font-bold text-lg mb-2 text-center">
              {e.nombre}
            </h3>
            <p className="text-surface-elevated/90 font-miles text-sm mb-1 text-center">
              {e.rubro}
            </p>
            {e.slogan && (
              <p className="text-surface-elevated/80 font-miles text-xs italic text-center">
                {e.slogan}
              </p>
            )}
          </div>
          
          {/* Botón de editar */}
          {puedeEditar && (
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                openModalEditable(e);
              }}
              className="absolute top-2 right-2 bg-surface-elevated/20 backdrop-blur-sm border border-surface-elevated/30 text-surface-elevated px-3 py-1 rounded-md font-miles font-bold text-xs hover:bg-surface-elevated/30 transition-colors duration-200 z-30"
              title="Editar empresa"
            >
              Editar
            </button>
          )}
        </div>
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-main font-miles text-lg">Cargando empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full min-h-screen bg-background" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* BARRA SUPERIOR */}
      <div className="w-full bg-primary px-4 md:px-8 lg:px-16 xl:px-32 py-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar empresa..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 bg-surface-elevated border border-stroke rounded-full text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 font-miles"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent text-xl">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL PRINCIPAL */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 py-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* IMAGEN LATERAL */}
            <div className="w-full lg:w-[23.6%] flex flex-col items-center">
              <div className="w-full max-w-[300px] lg:max-w-none">
                <img 
                  src="/media/empresasPage/bolivia.jpg" 
                  alt="Imagen lateral" 
                  className="w-full h-auto rounded-lg border-2 border-primary shadow-lg"
                />
                {loggedInUser?.idRol === 1 && (
                  <>
                    <button
                      onClick={() => setShowRegistroModal(true)}
                      title="Crear nueva empresa"
                      className="w-full mt-4 bg-primary text-surface-elevated px-6 py-3 rounded-lg font-bodoni font-bold hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      Añadir empresa
                    </button>

                    {showRegistroModal && (
                      <div 
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowRegistroModal(false)}
                      >
                        <div 
                          className="bg-surface-elevated rounded-lg max-w-2xl w-[90%] max-h-[90vh] overflow-y-auto p-6 shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RegistroEmpresa 
                            onRegistroExitoso={() => {
                              setShowRegistroModal(false);
                              recargarEmpresas();
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* PANEL DE EMPRESAS */}
            <div className="w-full lg:w-[76.4%]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {renderEmpresas()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && selectedEmpresa && (
          <motion.div 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" 
            onClick={closeModal} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-surface-elevated rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" 
              onClick={e => e.stopPropagation()} 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.8, opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              {modalEditable ? (
                <EditableEmpresaModal
                  empresa={selectedEmpresa}
                  onClose={closeModal}
                  onSave={handleGuardarCambios}
                />
              ) : (
                <DetalleEmpresaModal
                  empresa={selectedEmpresa}
                  onClose={closeModal}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmpresasPanel;