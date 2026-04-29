import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, ShieldCheck, Clock, ChevronUp, Shield, Users, Building2, Search, SearchCheck, CheckCircle, XCircle, FileText, ExternalLink } from 'lucide-react';
import API from '../services/api';
import { getUsuarios, deleteUsuario, updateUsuario, desbloquearCuenta } from '../services/usuarioService';

// ─── Paleta ────────────────────────────────────────────────────────────────────
const C = {
  bg:        '#FEFCFB',
  surface:   '#F5F3F0',
  elevated:  '#FFFFFF',
  primary:   '#072D42',
  accent:    '#F29E38',
  text:      '#464E59',
  muted:     '#9298A6',
  stroke:    '#BFAEA4',
};

// ─── Animaciones ───────────────────────────────────────────────────────────────
const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

// ─── Roles ─────────────────────────────────────────────────────────────────────
const ROL_NOMBRE = {
  1: 'Superadmin',
  2: 'Admin RRHH',
  3: 'Admin Empresas',
  4: 'Inv. Senior',
  5: 'Inv. Junior',
  6: 'Temporal',
  7: 'Visitante',
};

const ROL_EDIT_OPTIONS = [
  { value: 2, label: 'Admin RRHH' },
  { value: 3, label: 'Admin Empresas' },
  { value: 4, label: 'Investigador Senior' },
  { value: 5, label: 'Investigador Junior' },
];

// ─── Descripción de roles ──────────────────────────────────────────────────────
const DESCRIPCION_ROLES = {
  1: {
    nombre: 'Superadmin',
    descripcion: 'Control total del sistema. Acceso sin restricciones a todas las funcionalidades.',
    icono: Shield,
    acciones: [
      { label: 'Gestionar todos los usuarios',       puede: true  },
      { label: 'Crear y editar empresas',            puede: true  },
      { label: 'Eliminar empresas y usuarios',       puede: true  },
      { label: 'Cambiar roles de cualquier usuario', puede: true  },
      { label: 'Acceder al formulario externo',      puede: true  },
      { label: 'Ver historial de contraseñas',       puede: true  },
      { label: 'Desbloquear cuentas',                puede: true  },
    ],
  },
  2: {
    nombre: 'Admin RRHH',
    descripcion: 'Gestiona las cuentas de usuario del sistema. No tiene acceso al catálogo de empresas.',
    icono: Users,
    acciones: [
      { label: 'Crear y editar usuarios',            puede: true  },
      { label: 'Desbloquear cuentas bloqueadas',     puede: true  },
      { label: 'Ver historial de contraseñas',       puede: true  },
      { label: 'Asignar roles a usuarios',           puede: true  },
      { label: 'Crear o editar empresas',            puede: false },
      { label: 'Eliminar empresas',                  puede: false },
      { label: 'Acceder al formulario externo',      puede: false },
    ],
  },
  3: {
    nombre: 'Admin Empresas',
    descripcion: 'Gestiona el catálogo de empresas. No tiene acceso al panel de usuarios.',
    icono: Building2,
    acciones: [
      { label: 'Crear y editar empresas',            puede: true  },
      { label: 'Acceder al formulario externo',      puede: true  },
      { label: 'Asignar investigadores a empresas',  puede: true  },
      { label: 'Ver catálogo completo',              puede: true  },
      { label: 'Gestionar cuentas de usuario',       puede: false },
      { label: 'Desbloquear cuentas',                puede: false },
      { label: 'Eliminar empresas',                  puede: false },
    ],
  },
  4: {
    nombre: 'Investigador Senior',
    descripcion: 'Acceso de lectura a todas las empresas del catálogo sin restricción de rubro.',
    icono: SearchCheck,
    acciones: [
      { label: 'Ver todas las empresas',             puede: true  },
      { label: 'Ver fichas completas de empresas',   puede: true  },
      { label: 'Filtrar por rubro, tamaño, etc.',    puede: true  },
      { label: 'Crear o editar empresas',            puede: false },
      { label: 'Gestionar usuarios',                 puede: false },
      { label: 'Acceder al formulario externo',      puede: false },
      { label: 'Eliminar contenido',                 puede: false },
    ],
  },
  5: {
    nombre: 'Investigador Junior',
    descripcion: 'Acceso limitado. Solo puede ver empresas de los rubros que le fueron asignados.',
    icono: Search,
    acciones: [
      { label: 'Ver empresas de sus rubros asignados', puede: true  },
      { label: 'Ver fichas de empresas asignadas',     puede: true  },
      { label: 'Ver empresas fuera de sus rubros',     puede: false },
      { label: 'Crear o editar empresas',              puede: false },
      { label: 'Gestionar usuarios',                   puede: false },
      { label: 'Acceder al formulario externo',        puede: false },
      { label: 'Eliminar contenido',                   puede: false },
    ],
  },
};

// ─── Estado inicial del formulario de creación ─────────────────────────────────
const FORM_INICIAL = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correoReal: '',
  tipoRol: '',
  confirmoDatos: false,
  permisos: {
    panelUsuarios: false,
    editarEmpresas: false,
    formularioExterno: false,
  },
  rubrosAsignados: [],
};

// ─── Helper: preview del alias ────────────────────────────────────────────────
const generarAliasPreview = (nombre, apellidoPaterno) => {
  const n = (str) =>
    str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9.]/g, '');
  return `${n(nombre)}.${n(apellidoPaterno)}`;
};

// ─── Helper: resumen rol admin ────────────────────────────────────────────────
const resumenRolAdmin = (permisos) => {
  if (permisos.panelUsuarios && permisos.editarEmpresas) return 'Administrador completo';
  if (permisos.panelUsuarios) return 'Admin de usuarios (RRHH)';
  if (permisos.editarEmpresas || permisos.formularioExterno) return 'Admin de empresas';
  return null;
};

// ─── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ toasts }) => (
  <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
    <AnimatePresence>
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm font-miles text-white max-w-xs ${
            t.type === 'success' ? 'bg-green-600' :
            t.type === 'error'   ? 'bg-red-600'   : 'bg-gray-700'
          }`}
        >
          {t.msg}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

// ─── Modal base ────────────────────────────────────────────────────────────────
const Modal = ({ onClose, children, wide = false }) => (
  <motion.div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`bg-white rounded-2xl shadow-2xl relative ${wide ? 'w-full max-w-lg' : 'w-full max-w-md'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  </motion.div>
);

// ─── Helper: formatear fecha del historial ────────────────────────────────────
const formatearFechaHistorial = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const ahora = new Date();
  const diffMs = ahora - fecha;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) {
    return `Hoy a las ${fecha.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (diffDias === 1) {
    return `Ayer a las ${fecha.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (diffDias < 7) {
    return `Hace ${diffDias} días`;
  }
  return fecha.toLocaleDateString('es-BO', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Tarjeta de descripción de rol ────────────────────────────────────────────
function TarjetaRol({ idRol }) {
  const info = DESCRIPCION_ROLES[idRol];
  if (!info) return null;
  const Icono = info.icono;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="mt-3 border border-gray-200 rounded-xl bg-white p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Icono size={16} className="text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{info.nombre}</p>
          <p className="text-xs text-gray-500 leading-snug">{info.descripcion}</p>
        </div>
      </div>
      <div className="border-t border-gray-100 mb-3" />
      <div className="space-y-1.5">
        {info.acciones.map((accion, i) => (
          <div key={i} className="flex items-center gap-2">
            {accion.puede ? (
              <CheckCircle size={13} className="text-gray-600 flex-shrink-0" />
            ) : (
              <XCircle size={13} className="text-gray-300 flex-shrink-0" />
            )}
            <span className={`text-xs ${accion.puede ? 'text-gray-700' : 'text-gray-400'}`}>
              {accion.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Accesos rápidos ───────────────────────────────────────────────────────────
const ACCESOS_RAPIDOS = [
  {
    id: 'formulario-empresas',
    titulo: 'Formulario de registro',
    descripcion: 'Registrar nueva empresa en el catálogo',
    url: 'https://orbis-empresarial.vercel.app/',
    icono: FileText,
    rolesPermitidos: [1, 3],
    externo: true,
  },
];

function PanelAccesosRapidos({ idRolUsuario }) {
  const accesosVisibles = ACCESOS_RAPIDOS.filter(
    (a) => a.rolesPermitidos.includes(idRolUsuario)
  );
  if (accesosVisibles.length === 0) return null;
  return (
    <div className="px-6 pt-5 pb-1">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
        Accesos rápidos
      </p>
      <div className="flex flex-wrap gap-2">
        {accesosVisibles.map((acceso) => {
          const Icono = acceso.icono;
          return (
            <a
              key={acceso.id}
              href={acceso.url}
              target={acceso.externo ? '_blank' : '_self'}
              rel={acceso.externo ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-150 group"
            >
              <Icono size={15} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
              <span>{acceso.titulo}</span>
              {acceso.externo && (
                <ExternalLink size={11} className="text-gray-300 group-hover:text-gray-500 transition-colors ml-0.5" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────────────────────
const AdministrarUsuarioPanel = () => {
  const [usuarios, setUsuarios]               = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios]     = useState(null);

  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  // Modales
  const [mostrarModalCrear,    setMostrarModalCrear]    = useState(false);
  const [mostrarModalEditar,   setMostrarModalEditar]   = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [modoEliminar,         setModoEliminar]         = useState(false);

  // Estado formulario creación
  const [form, setForm]           = useState(FORM_INICIAL);
  const [cargando, setCargando]   = useState(false);
  const [errForm, setErrForm]     = useState([]);

  // Rubros
  const [rubros,         setRubros]         = useState([]);
  const [cargandoRubros, setCargandoRubros] = useState(false);

  // Historial de contraseñas
  const [historialAbierto,    setHistorialAbierto]    = useState(null);
  const [historialData,       setHistorialData]       = useState({});
  const [cargandoHistorial,   setCargandoHistorial]   = useState(false);

  // Editar / Eliminar
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [editNombre,  setEditNombre]  = useState('');
  const [editCorreo,  setEditCorreo]  = useState('');
  const [editRol,     setEditRol]     = useState(3);
  const [errEditar,   setErrEditar]   = useState(null);

  const buildError = (e) => {
    const msg = e?.response?.data?.message;
    return Array.isArray(msg) ? msg.join(', ') : msg || e?.message || 'Error inesperado';
  };

  // ─── Cargar usuarios ───────────────────────────────────────────────────────
  const cargarUsuarios = useCallback(async () => {
    setLoadingUsuarios(true);
    setErrorUsuarios(null);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (e) {
      setErrorUsuarios(buildError(e));
    } finally {
      setLoadingUsuarios(false);
    }
  }, []);

  useEffect(() => { cargarUsuarios(); }, [cargarUsuarios]);

  // ─── Cargar rubros cuando abre modal crear ─────────────────────────────────
  useEffect(() => {
    if (!mostrarModalCrear) return;
    setCargandoRubros(true);
    API.get('/api/rubros')
      .then((r) => setRubros(r.data?.rubros ?? r.data ?? []))
      .catch(() => setRubros([]))
      .finally(() => setCargandoRubros(false));
  }, [mostrarModalCrear]);

  // ─── Helpers de estado del formulario ─────────────────────────────────────
  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const setPermiso = (key, value) =>
    setForm((prev) => ({
      ...prev,
      permisos: { ...prev.permisos, [key]: value },
    }));

  const toggleRubro = (id) => {
    setForm((prev) => {
      const ya = prev.rubrosAsignados.includes(id);
      return {
        ...prev,
        rubrosAsignados: ya
          ? prev.rubrosAsignados.filter((r) => r !== id)
          : [...prev.rubrosAsignados, id],
      };
    });
  };

  // ─── Validar formulario ────────────────────────────────────────────────────
  const validar = () => {
    const errs = [];
    if (!form.nombre.trim())          errs.push('El nombre es obligatorio');
    if (!form.apellidoPaterno.trim()) errs.push('El apellido paterno es obligatorio');
    if (!form.correoReal.trim())      errs.push('El correo personal es obligatorio');
    if (!form.tipoRol)                errs.push('Debes seleccionar un tipo de usuario');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correoReal))
      errs.push('El correo personal no tiene un formato válido');
    if (!form.confirmoDatos)
      errs.push('Debes confirmar que ingresaste correctamente tus datos');
    if (form.tipoRol === 'admin' &&
        !form.permisos.panelUsuarios &&
        !form.permisos.editarEmpresas &&
        !form.permisos.formularioExterno)
      errs.push('El administrador debe tener al menos un acceso asignado');
    return errs;
  };

  // ─── Crear usuario ─────────────────────────────────────────────────────────
  const handleCrear = async () => {
    const errs = validar();
    if (errs.length > 0) { setErrForm(errs); return; }
    setErrForm([]);
    setCargando(true);
    try {
      await API.post('/api/usuarios', {
        nombre:          form.nombre,
        apellidoPaterno: form.apellidoPaterno,
        apellidoMaterno: form.apellidoMaterno || undefined,
        correoReal:      form.correoReal,
        tipoRol:         form.tipoRol,
        permisos:        form.tipoRol === 'admin' ? form.permisos : undefined,
        rubrosAsignados: form.tipoRol === 'investigador' ? form.rubrosAsignados : undefined,
      });
      addToast('Usuario creado. Credenciales enviadas a su correo.', 'success');
      setMostrarModalCrear(false);
      setForm(FORM_INICIAL);
      cargarUsuarios();
    } catch (e) {
      addToast(buildError(e), 'error');
    } finally {
      setCargando(false);
    }
  };

  // ─── Editar usuario ────────────────────────────────────────────────────────
  const abrirEditar = (u) => {
    const id = u.id_usuario ?? u.idUsuario ?? u.id;
    setUsuarioSeleccionado({ ...u, _id: id });
    setEditNombre(u.usuario ?? '');
    setEditCorreo(u.correo ?? '');
    setEditRol(u.idRol ?? 3);
    setErrEditar(null);
    setMostrarModalEditar(true);
  };

  const handleEditar = async () => {
    if (!editNombre.trim() || !editCorreo.trim()) {
      setErrEditar('Completa todos los campos.');
      return;
    }
    try {
      await updateUsuario(usuarioSeleccionado._id, {
        usuario: editNombre,
        correo:  editCorreo,
        idRol:   editRol,
      });
      setMostrarModalEditar(false);
      addToast('Usuario actualizado correctamente.', 'success');
      cargarUsuarios();
    } catch (e) {
      setErrEditar(buildError(e));
    }
  };

  // ─── Eliminar usuario ──────────────────────────────────────────────────────
  const handleEliminar = async () => {
    try {
      await deleteUsuario(usuarioSeleccionado._id);
      setMostrarModalEliminar(false);
      setUsuarioSeleccionado(null);
      setModoEliminar(false);
      addToast('Usuario eliminado.', 'success');
      cargarUsuarios();
    } catch (e) {
      addToast(buildError(e), 'error');
    }
  };

  // ─── Historial de contraseñas ──────────────────────────────────────────────
  const toggleHistorial = useCallback(async (idUsuario) => {
    if (historialAbierto === idUsuario) {
      setHistorialAbierto(null);
      return;
    }
    setHistorialAbierto(idUsuario);
    if (historialData[idUsuario]) return;
    setCargandoHistorial(true);
    try {
      const { data } = await API.get(`/api/usuarios/${idUsuario}/historial-passwords`);
      setHistorialData((prev) => ({ ...prev, [idUsuario]: data.data }));
    } catch {
      setHistorialData((prev) => ({ ...prev, [idUsuario]: { total_cambios: 0, historial: [] } }));
    } finally {
      setCargandoHistorial(false);
    }
  }, [historialAbierto, historialData]);

  // ─── Desbloquear ───────────────────────────────────────────────────────────
  const handleDesbloquear = async (u) => {
    const id = u.id_usuario ?? u.idUsuario ?? u.id;
    try {
      await desbloquearCuenta(id);
      addToast(`Cuenta de ${u.usuario} desbloqueada.`, 'success');
      cargarUsuarios();
    } catch (e) {
      addToast(buildError(e), 'error');
    }
  };

  // ─── Preview alias ─────────────────────────────────────────────────────────
  const aliasPreview = form.nombre && form.apellidoPaterno
    ? generarAliasPreview(form.nombre, form.apellidoPaterno)
    : null;

  // ─── Rol del usuario logueado (para accesos rápidos) ─────────────────────────
  const rolUsuarioLogueado = (() => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData') || '{}');
      return authData?.user?.idRol ?? authData?.user?.id_rol ?? null;
    } catch { return null; }
  })();

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <motion.div
      className="min-h-screen w-full p-8 flex flex-col items-center"
      style={{ backgroundColor: C.bg }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="rounded-2xl shadow-lg overflow-hidden"
        style={{ width: '90%', maxWidth: 1100, backgroundColor: C.surface }}
        variants={fadeIn}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-8 py-4"
          style={{ backgroundColor: C.primary }}
        >
          <span className="text-white font-bodoni font-bold text-lg uppercase tracking-widest">
            Usuarios
          </span>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                setModoEliminar((p) => !p);
                setUsuarioSeleccionado(null);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors ${
                modoEliminar ? 'bg-red-500' : 'bg-white/20 hover:bg-red-500'
              }`}
            >
              −
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => { setMostrarModalCrear(true); setForm(FORM_INICIAL); setErrForm([]); }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-accent flex items-center justify-center text-white text-xl font-bold transition-colors"
              style={{ '--hover-bg': C.accent }}
            >
              +
            </motion.button>
          </div>
        </div>

        {errorUsuarios && (
          <div className="px-8 py-3 text-sm text-red-600">{errorUsuarios}</div>
        )}

        <PanelAccesosRapidos idRolUsuario={rolUsuarioLogueado} />

        {/* Lista de usuarios */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6"
          variants={container}
        >
          {loadingUsuarios ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              Cargando usuarios...
            </div>
          ) : usuarios.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No hay usuarios registrados.
            </div>
          ) : (
            usuarios.map((u) => {
              const id  = u.id_usuario ?? u.idUsuario ?? u.id;
              const rol = u.idRol ?? u.id_rol;
              const usr = u.usuario ?? 'Sin usuario';
              const isSelected = modoEliminar && usuarioSeleccionado?._id === id;

              return (
                <motion.div
                  key={id ?? usr}
                  variants={fadeIn}
                  className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer ${
                    isSelected ? 'border-red-500' :
                    modoEliminar ? 'border-transparent hover:border-red-300' :
                    'border-transparent'
                  }`}
                  onClick={() => {
                    if (!modoEliminar) return;
                    if (isSelected) {
                      setUsuarioSeleccionado(null);
                    } else {
                      setUsuarioSeleccionado({ ...u, _id: id });
                      setMostrarModalEliminar(true);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bodoni font-bold text-gray-800 text-sm">{usr}</p>
                      {u.nombre && (
                        <p className="text-xs text-gray-500 font-miles">
                          {u.nombre} {u.apellido || ''}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-miles"
                      style={{ backgroundColor: '#EEF2FF', color: C.primary }}
                    >
                      {ROL_NOMBRE[rol] ?? `Rol ${rol}`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-miles mb-3">{u.correo ?? ''}</p>

                  {!modoEliminar && (
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={(e) => { e.stopPropagation(); abrirEditar({ ...u, _id: id }); }}
                        className="text-xs px-3 py-1 rounded-lg font-miles text-white transition-colors"
                        style={{ backgroundColor: C.primary }}
                      >
                        Editar
                      </button>
                      {u.isLocked && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDesbloquear(u); }}
                          className="text-xs px-3 py-1 rounded-lg font-miles text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                        >
                          Desbloquear
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleHistorial(id); }}
                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-200 ${
                          historialAbierto === id
                            ? 'border-gray-700 bg-gray-900 text-white'
                            : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                        }`}
                        title="Ver historial de contraseñas"
                      >
                        <History size={12} />
                        <span>Historial</span>
                      </button>
                    </div>
                  )}

                  {/* ── Panel historial expandible ── */}
                  <AnimatePresence>
                    {historialAbierto === id && !modoEliminar && (
                      <motion.div
                        key={`hist-${id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5">
                              <History size={13} className="text-gray-500" />
                              <span className="text-xs font-medium text-gray-700">Historial de contraseñas</span>
                              {historialData[id]?.total_cambios > 0 && (
                                <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                                  {historialData[id].total_cambios}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => setHistorialAbierto(null)}
                              className="text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                            >
                              <ChevronUp size={14} />
                            </button>
                          </div>

                          {/* Contenido */}
                          {cargandoHistorial && !historialData[id] ? (
                            <div className="flex items-center gap-2 py-2 text-gray-400">
                              <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                              <span className="text-xs">Cargando...</span>
                            </div>
                          ) : historialData[id]?.total_cambios === 0 ? (
                            <div className="flex flex-col items-center gap-1.5 py-3 text-center">
                              <ShieldCheck size={24} className="text-gray-300" />
                              <p className="text-xs text-gray-400">Sin cambios registrados</p>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="absolute left-[6px] top-2 bottom-2 w-px bg-gray-200" />
                              <div className="space-y-2.5">
                                {historialData[id]?.historial.map((entrada, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 relative">
                                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5 z-10 ${
                                      entrada.es_actual ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-300'
                                    }`} />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        {entrada.es_actual && (
                                          <span className="text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded-full font-medium">
                                            Actual
                                          </span>
                                        )}
                                        <span className={`text-xs ${entrada.es_actual ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                                          {formatearFechaHistorial(entrada.fecha)}
                                        </span>
                                      </div>
                                      {!entrada.es_actual && (
                                        <p className="text-xs text-gray-400 mt-0.5">Cambio #{entrada.posicion}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="mt-3 pt-2 border-t border-gray-200 flex items-center gap-1">
                            <Clock size={10} className="text-gray-400" />
                            <p className="text-xs text-gray-400">Últimos 10 cambios · Solo fechas</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </motion.div>

      {/* ── MODAL CREAR ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mostrarModalCrear && (
          <Modal onClose={() => setMostrarModalCrear(false)} wide>
            <div className="p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="font-bodoni font-bold text-gray-800 text-lg uppercase tracking-wider mb-1">
                Nuevo colaborador
              </h2>
              <p className="text-xs text-gray-400 font-miles mb-5">
                Se generará un alias @orbis.com y se enviará la contraseña temporal por correo.
              </p>

              {/* ── CU-01: Datos personales ── */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-1">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => setField('nombre', e.target.value)}
                      placeholder="Ej: Octavio"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 font-miles"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-1">
                      Apellido paterno <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.apellidoPaterno}
                      onChange={(e) => setField('apellidoPaterno', e.target.value)}
                      placeholder="Ej: Luna"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 font-miles"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-1">
                    Apellido materno{' '}
                    <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.apellidoMaterno}
                    onChange={(e) => setField('apellidoMaterno', e.target.value)}
                    placeholder="Ej: García"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 font-miles"
                  />
                </div>
              </div>

              {/* ── CU-02: Preview del alias ── */}
              <AnimatePresence>
                {aliasPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3"
                  >
                    <p className="text-xs text-blue-500 font-miles uppercase tracking-wide mb-1">
                      Alias que se generará
                    </p>
                    <p className="text-sm font-mono text-blue-800">
                      {aliasPreview}
                      <span className="text-blue-400">@orbis.com</span>
                    </p>
                    <p className="text-xs text-blue-400 mt-1">
                      Este será su usuario para iniciar sesión
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CU-03: Tipo de usuario ── */}
              <div className="mb-4">
                <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-2">
                  Tipo de usuario <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'admin', icon: '🛡️', label: 'Administrador', desc: 'Gestiona usuarios o empresas' },
                    { key: 'investigador', icon: '🔍', label: 'Investigador', desc: 'Accede a empresas por rubro' },
                  ].map(({ key, icon, label, desc }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm((p) => ({
                        ...p,
                        tipoRol: key,
                        rubrosAsignados: key === 'admin' ? [] : p.rubrosAsignados,
                        permisos: key === 'investigador'
                          ? { panelUsuarios: false, editarEmpresas: false, formularioExterno: false }
                          : p.permisos,
                      }))}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                        form.tipoRol === key
                          ? 'border-gray-800 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="text-sm font-bodoni font-semibold text-gray-800">{label}</span>
                      <span className="text-xs text-gray-400 text-center font-miles">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── CU-04: Permisos admin ── */}
              <AnimatePresence>
                {form.tipoRol === 'admin' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <p className="text-xs font-bodoni font-semibold text-gray-700 mb-3">
                      Accesos del administrador
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          key: 'panelUsuarios',
                          label: 'Panel de usuarios',
                          desc: 'Puede crear, editar y desbloquear cuentas',
                        },
                        {
                          key: 'editarEmpresas',
                          label: 'Panel de empresas',
                          desc: 'Puede crear, editar y eliminar empresas del catálogo',
                        },
                        {
                          key: 'formularioExterno',
                          label: 'Formulario de registro de empresas',
                          desc: 'Acceso a orbis-empresarial.vercel.app',
                        },
                      ].map(({ key, label, desc }) => (
                        <label key={key} className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.permisos[key]}
                            onChange={(e) => setPermiso(key, e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-gray-300"
                          />
                          <div>
                            <p className="text-sm font-miles text-gray-800">{label}</p>
                            <p className="text-xs text-gray-500 font-miles">{desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {!form.permisos.panelUsuarios && !form.permisos.editarEmpresas && !form.permisos.formularioExterno && (
                      <p className="text-xs text-amber-600 mt-3 font-miles">
                        ⚠ Debes seleccionar al menos un acceso
                      </p>
                    )}

                    {resumenRolAdmin(form.permisos) && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-miles">Rol que se asignará:</p>
                        <p className="text-sm font-bodoni font-semibold text-gray-800 mt-0.5">
                          {resumenRolAdmin(form.permisos)}
                        </p>
                        {form.permisos.formularioExterno && (
                          <p className="text-xs text-blue-600 font-miles mt-1">
                            🔗 También tendrá acceso al formulario externo de empresas
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CU-05: Rubros investigador ── */}
              <AnimatePresence>
                {form.tipoRol === 'investigador' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bodoni font-semibold text-gray-700">
                        Rubros que puede ver
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const todosIds = rubros.map((r) => r.id);
                          const todosMarcados = form.rubrosAsignados.length === rubros.length;
                          setField('rubrosAsignados', todosMarcados ? [] : todosIds);
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700 underline font-miles"
                      >
                        {form.rubrosAsignados.length === rubros.length
                          ? 'Deseleccionar todos'
                          : 'Seleccionar todos'}
                      </button>
                    </div>

                    {cargandoRubros ? (
                      <p className="text-sm text-gray-400 font-miles py-2">Cargando rubros...</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {rubros.map((r) => {
                          const marcado = form.rubrosAsignados.includes(r.id);
                          return (
                            <label
                              key={r.id}
                              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all ${
                                marcado ? 'border-gray-600 bg-white' : 'border-transparent hover:bg-white'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={marcado}
                                onChange={() => toggleRubro(r.id)}
                                className="w-3.5 h-3.5 rounded"
                              />
                              <span className="text-xs text-gray-700 font-miles">{r.nombre}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      {form.rubrosAsignados.length === 0 || form.rubrosAsignados.length === rubros.length ? (
                        <p className="text-xs text-gray-500 font-miles">
                          🔍 <strong>Investigador Senior</strong> — verá todas las empresas
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 font-miles">
                          🔍 <strong>Investigador Junior</strong> — verá empresas de{' '}
                          <strong>{form.rubrosAsignados.length}</strong> rubro(s)
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CU-06: Correo real ── */}
              <div className="mb-4">
                <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-1">
                  Correo personal <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.correoReal}
                  onChange={(e) => setField('correoReal', e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 font-miles"
                />
                <p className="text-xs text-gray-400 font-miles mt-1">
                  📧 La contraseña temporal se enviará a este correo. No será visible en la plataforma.
                </p>

                <label className="mt-4 flex items-start gap-3 rounded-xl border border-[#D4B86A] bg-white px-4 py-3 text-sm text-[#333333]">
                  <input
                    type="checkbox"
                    checked={form.confirmoDatos}
                    onChange={(e) => setField('confirmoDatos', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#BFAEA4] text-[#2C5282] focus:ring-[#2C5282]"
                  />
                  <span>
                    Confirmo que ingresé correctamente mis datos y deseo crear el usuario.
                  </span>
                </label>
              </div>

              {/* Resumen final */}
              <AnimatePresence>
                {form.correoReal && aliasPreview && form.tipoRol && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <p className="text-xs font-bodoni font-semibold text-green-700 uppercase tracking-wide mb-2">
                      Al crear este usuario:
                    </p>
                    <ul className="space-y-1.5 text-xs text-green-700 font-miles">
                      <li>✓ Alias: <code className="bg-green-100 px-1.5 py-0.5 rounded font-mono">{aliasPreview}@orbis.com</code></li>
                      <li>✓ Se generará una contraseña temporal automáticamente</li>
                      <li>✓ Se enviará al correo <strong>{form.correoReal}</strong></li>
                      <li>✓ Deberá cambiarla en su primer inicio de sesión</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Errores de validación */}
              <AnimatePresence>
                {errForm.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                  >
                    {errForm.map((e, i) => (
                      <p key={i} className="text-xs text-red-600 font-miles">{e}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarModalCrear(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bodoni text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  onClick={handleCrear}
                  disabled={cargando}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bodoni font-bold text-white uppercase tracking-wide disabled:opacity-70 transition-colors"
                  style={{ backgroundColor: C.primary }}
                >
                  {cargando ? 'Creando...' : 'Crear usuario'}
                </motion.button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── MODAL EDITAR ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mostrarModalEditar && usuarioSeleccionado && (
          <Modal onClose={() => setMostrarModalEditar(false)}>
            <div className="p-6">
              <h2 className="font-bodoni font-bold text-gray-800 text-lg mb-5">Editar usuario</h2>

              {errEditar && (
                <p className="text-sm text-red-500 font-miles mb-3">{errEditar}</p>
              )}

              {[
                { label: 'Nombre de usuario', value: editNombre, onChange: setEditNombre, type: 'text' },
                { label: 'Correo electrónico', value: editCorreo, onChange: setEditCorreo, type: 'email' },
              ].map(({ label, value, onChange, type }) => (
                <div key={label} className="mb-3">
                  <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 font-miles"
                  />
                </div>
              ))}

              <div className="mb-5">
                <label className="block text-xs font-bodoni font-semibold text-gray-700 mb-1">Rol</label>
                <select
                  value={editRol}
                  onChange={(e) => setEditRol(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 font-miles bg-white"
                >
                  {ROL_EDIT_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <AnimatePresence mode="wait">
                  <TarjetaRol key={editRol} idRol={editRol} />
                </AnimatePresence>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarModalEditar(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bodoni text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditar}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bodoni font-bold text-white uppercase transition-colors"
                  style={{ backgroundColor: C.primary }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── MODAL ELIMINAR ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mostrarModalEliminar && usuarioSeleccionado && (
          <Modal onClose={() => { setMostrarModalEliminar(false); setUsuarioSeleccionado(null); }}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">⚠️</div>
              <h2 className="font-bodoni font-bold text-gray-800 text-lg mb-2">
                Desactivar usuario
              </h2>
              <p className="text-sm text-gray-500 font-miles mb-2">
                ¿Desactivar a <strong>{usuarioSeleccionado.usuario}</strong>?
              </p>
              <p className="text-xs text-gray-400 font-miles mb-6">
                El usuario no podrá iniciar sesión, pero sus datos se conservarán. Un superadmin puede restaurarlo.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setMostrarModalEliminar(false); setUsuarioSeleccionado(null); setModoEliminar(false); }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bodoni text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEliminar}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bodoni font-bold text-white uppercase bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Desactivar
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <Toast toasts={toasts} />
    </motion.div>
  );
};

export default AdministrarUsuarioPanel;
