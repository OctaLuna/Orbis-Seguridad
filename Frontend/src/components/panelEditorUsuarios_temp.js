import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUsuarios, createUsuario, deleteUsuario, updateUsuario  } from '../services/usuarioService';

// Variantes de animación para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

// Variantes de animación para los elementos individuales
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Componente para la alerta de confirmación de éxito (reutilizado para registro y eliminación)
const SuccessConfirmationAlert = ({ message, onClose, fontMonoClass }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-[#333333] bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-[#F6F0E0] p-8 rounded-xl shadow-2xl text-center max-w-sm w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1A7B5F]"></div> {/* Top accent */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400, delay: 0.1 }}
            className="text-green-500 text-6xl" // Icono de checkmark verde
          >
            ✓
          </motion.div>
        </div>
        <h3 className={`text-2xl font-bold text-[#052018] mb-3 ${fontMonoClass}`}>¡Éxito!</h3>
        <p className="text-[#333333] mb-6">{message}</p>
        <motion.button
          onClick={onClose}
          className="bg-[#1A7B5F] text-white py-2 px-6 rounded-md hover:bg-[#052018] transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Aceptar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


const ROL_OPTIONS = [
  { value: 2, label: 'Admin' },
  { value: 3, label: 'Investigador' },
  { value: 4, label: 'Temporal' },
  { value: 5, label: 'Visitante' },
];

// Paleta de colores nueva
const COLORS = {
  background: '#FEFCFB',        // Casi blanco (fondo principal)
  surface: '#F5F3F0',           // Beige muy sutil (superficies)
  surfaceElevated: '#FFFFFF',   // Blanco puro (elementos elevados)
  primary: '#072D42',           // Azul marino oscuro (elementos principales)
  accent: '#F29E38',            // Naranja vibrante (acentos únicos)
  textMain: '#464E59',          // Gris azulado oscuro (texto principal)
  textMuted: '#9298A6',         // Gris azulado medio (texto secundario)
  stroke: '#BFAEA4',            // Beige medio (bordes y detalles)
  detail: '#D9CBBF',            // Detalles suaves
};


const PanelEditorUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoRol, setNuevoRol] = useState(3);
  const [mensaje, setMensaje] = useState(null); // Para mensajes de error o validación dentro del modal de registro

  // Estados para la alerta de éxito de registro
  const [mostrarAlertaExito, setMostrarAlertaExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // Estados para la funcionalidad de eliminación
  const [modoEliminar, setModoEliminar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  // Estados para la alerta de éxito de eliminación (NUEVOS)
  const [mostrarAlertaEliminarExito, setMostrarAlertaEliminarExito] = useState(false);
  const [mensajeEliminarExito, setMensajeEliminarExito] = useState("");

  // Estados para la edición
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mensajeEditar, setMensajeEditar] = useState(null);
  const [nuevoNombreEditar, setNuevoNombreEditar] = useState('');
  const [nuevoCorreoEditar, setNuevoCorreoEditar] = useState('');
  const [nuevoRolEditar, setNuevoRolEditar] = useState(3);

  const ROL_NOMBRE = {
    1: "Superadmin",
    2: "Admin",
    3: "Investigador",
    4: "Temporal",
    5: "Visitante",
  };

  const buildErrorMessage = (error) => {
    const backendMessage = error?.response?.data?.message;
    if (Array.isArray(backendMessage)) {
      return backendMessage.join(', ');
    }
    return backendMessage || error?.message || 'No se pudo completar la operación.';
  };

  const cargarUsuarios = useCallback(async () => {
    setLoadingUsuarios(true);
    setErrorUsuarios(null);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setErrorUsuarios(buildErrorMessage(error));
    } finally {
      setLoadingUsuarios(false);
    }
  }, []);

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  useEffect(() => {
    if (!mostrarModal && !mostrarAlertaExito && !mostrarAlertaEliminarExito) return;
    cargarUsuarios();
  }, [mostrarModal, mostrarAlertaExito, mostrarAlertaEliminarExito, cargarUsuarios]);

  const inputStyle = "w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]";

  const handleRegistrarUsuario = async () => {
    if (!nuevoUsuario.trim() || !nuevaContrasenia.trim() || !nuevoCorreo.trim()) {
      setMensaje("Completa todos los campos.");
      return;
    }

    setMensaje(null); // Limpiar mensaje de error previo

    try {
      await createUsuario({
        usuario: nuevoUsuario.trim(),
        contrasenia: nuevaContrasenia.trim(),
        correo: nuevoCorreo.trim(),
        idRol: nuevoRol,
      });

      setMensajeExito("El usuario ha sido creado exitosamente.");
      setMostrarAlertaExito(true);
      setMostrarModal(false);
      setNuevoUsuario("");
      setNuevaContrasenia("");
      setNuevoCorreo("");
      setNuevoRol(3);
      cargarUsuarios();
    } catch (error) {
      console.error("Error registrando usuario:", error);
      setMensaje(buildErrorMessage(error));
    }
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setNuevoNombreEditar(usuario.usuario || usuario.nombreUsuario || '');
    setNuevoCorreoEditar(usuario.correo || '');
    setNuevoRolEditar(usuario.idRol || 3);
    setMensajeEditar(null);
    setMostrarModalEditar(true);
  };

  const handleEditarUsuario = async () => {
    if (!nuevoNombreEditar.trim() || !nuevoCorreoEditar.trim()) {
      setMensajeEditar('Completa todos los campos.');
      return;
    }

    try {
      await updateUsuario(usuarioEditar.userId, {
        usuario: nuevoNombreEditar.trim(),
        correo: nuevoCorreoEditar.trim(),
        idRol: nuevoRolEditar,
      });

      setMostrarModalEditar(false);
      setUsuarioEditar(null);
      cargarUsuarios();
    } catch (error) {
      console.error('Error editando usuario:', error);
      setMensajeEditar(buildErrorMessage(error));
    }
  };

  // Función que se ejecuta al hacer clic en "Aceptar" en la alerta de éxito de registro
  const handleSuccessAlertClose = () => {
    setMostrarAlertaExito(false); // Cierra la alerta de éxito
    setMostrarModal(false);     // Cierra el modal de registro
    setNuevoUsuario("");         // Limpia el campo de usuario
    setNuevaContrasenia("");     // Limpia el campo de contraseña
    setNuevoCorreo("");
    setNuevoRol(3);
    setMensaje(null);            // Asegura que no haya mensajes de error en el modal de registro
    cargarUsuarios();            // Recarga la lista de usuarios para mostrar el nuevo
  };

  // Función que se ejecuta al hacer clic en "Aceptar" en la alerta de éxito de eliminación (NUEVA)
  const handleDeleteSuccessAlertClose = () => {
    setMostrarAlertaEliminarExito(false); // Cierra la alerta de éxito de eliminación
    setMostrarModalEliminar(false);    // Cierra el modal de confirmación de eliminación
    setUsuarioSeleccionado(null);      // Limpia el usuario seleccionado
    setModoEliminar(false);            // Sale del modo de eliminación
    cargarUsuarios();                  // Recarga la lista de usuarios
  };


  return (
    <motion.div
      className="min-h-screen w-full p-8 flex flex-col items-center"
      style={{ backgroundColor: COLORS.background }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

        <motion.div
          className="rounded-lg shadow-lg overflow-hidden"
          style={{ width: '85%', backgroundColor: COLORS.surface }}
          variants={itemVariants}
        >

       <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ width: '100%', height: '9vh', padding: '1rem 2.5rem', backgroundColor: COLORS.primary }}
          variants={itemVariants}
        >
          <motion.span className="text-[#FEFCFB] text-lg" variants={itemVariants}>
            USUARIOS
          </motion.span>
        </motion.div>


        {errorUsuarios && (
          <div className="px-10 pt-4 text-sm text-red-700">
            {errorUsuarios}
          </div>
        )}

        <motion.div className="px-10 pb-0 flex justify-end mt-5 gap-4" variants={itemVariants}>
            <motion.button
              className={`w-14 h-14 rounded-[50px] flex justify-center items-center text-white text-2xl font-normal transition
                ${modoEliminar ? COLORS.accent : COLORS.primary}
                hover:bg-[#F29E38]`}
              onClick={() => {
                setModoEliminar(!modoEliminar);
                setUsuarioSeleccionado(null);
                setMostrarModalEliminar(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={itemVariants}
            >
              -
            </motion.button>


          <motion.button
            className="bg-[#072D42] w-14 h-14 rounded-[50px] flex justify-center items-center text-white text-2xl font-normal hover:bg-[#F29E38] transition"
            onClick={() => {
              setMostrarModal(true);
              setMensaje(null);
              setNuevoCorreo('');
              setNuevoRol(3);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            +
          </motion.button>

        
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-6" variants={containerVariants}>
          <AnimatePresence>
            {loadingUsuarios ? (
              <motion.div
                className="col-span-full text-center text-[#333333]"
                variants={itemVariants}
              >
                Cargando usuarios...
              </motion.div>
            ) : (
              usuarios.map((usuario) => {
                const userId = usuario.id_usuario ?? usuario.idUsuario ?? usuario.id;
                const roleId = usuario.idRol ?? usuario.rol ?? usuario.roleId ?? null;
                const username = usuario.usuario ?? usuario.nombreUsuario ?? 'Sin usuario';

                return (
                  <motion.div
                    key={userId || username}
                    className={`bg-[#F6F0E0] rounded-xl p-4 text-black shadow-md flex flex-col justify-center items-start cursor-pointer
                      ${modoEliminar && usuarioSeleccionado?.userId === userId ? 'border-4 border-red-600' : ''}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    onClick={() => {
                      if (modoEliminar) {
                        if (usuarioSeleccionado?.userId === userId) {
                          setUsuarioSeleccionado(null);
                          setMostrarModalEliminar(false);
                        } else {
                          setUsuarioSeleccionado({ ...usuario, userId, username, roleId });
                          setMostrarModalEliminar(true);
                        }
                      }
                    }}
                  >
                    <motion.span className="text-[#333333] font-semibold text-lg" variants={itemVariants}>
                      Usuario
                    </motion.span>
                    <motion.input
                      type="text"
                      value={username}
                      disabled
                      className="w-full mt-2 mb-3 p-2 rounded-md bg-[#F4E9CD] text-[#333333]"
                      variants={itemVariants}
                    />
                    <motion.span className="text-[#333333] font-semibold text-lg" variants={itemVariants}>
                      Rol
                    </motion.span>
                    <motion.input
                      type="text"
                      value={ROL_NOMBRE[roleId] || "Desconocido"}
                      disabled
                      className="w-full mt-2 p-2 rounded-md bg-[#F4E9CD] text-[#333333]"
                      variants={itemVariants}
                    />

                    {/* BOTÓN DE EDITAR */}
                    {!modoEliminar && (
                      <motion.button
                        className="mt-2 bg-[#072D42] text-white py-1 px-3 rounded-md hover:bg-[#1A7B5F] transition-colors duration-200"
                        onClick={() => abrirModalEditar({ ...usuario, userId, username, roleId })}
                      >
                        Editar
                      </motion.button>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* MODAL DE REGISTRO */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
              }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative"
            >
              <h2 className="text-xl font-bold text-[#333333] mb-4 text-center">Registrar nuevo colaborador</h2>

              {mensaje && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-3 text-sm text-center text-red-600 font-medium"
                >
                  {mensaje}
                </motion.div>
              )}

              <motion.input
                type="text"
                placeholder="Nombre de usuario"
                className={inputStyle}
                value={nuevoUsuario}
                onChange={(e) => setNuevoUsuario(e.target.value)}
                variants={itemVariants}
              />
              <motion.input
                type="password"
                placeholder="Contraseña"
                className={inputStyle}
                value={nuevaContrasenia}
                onChange={(e) => setNuevaContrasenia(e.target.value)}
                variants={itemVariants}
              />
              <motion.input
                type="email"
                placeholder="Correo electrónico"
                className={inputStyle}
                value={nuevoCorreo}
                onChange={(e) => setNuevoCorreo(e.target.value)}
                variants={itemVariants}
              />
              <motion.select
                className={`${inputStyle} bg-white`}
                value={nuevoRol}
                onChange={(e) => setNuevoRol(Number(e.target.value))}
                variants={itemVariants}
              >
                <option value="" disabled>Selecciona un rol</option>
                {ROL_OPTIONS.map((rol) => (
                  <option key={rol.value} value={rol.value}>
                    {rol.label}
                  </option>
                ))}
              </motion.select>

              <div className="flex justify-between gap-4">
                <motion.button
                  onClick={() => {
                    setMostrarModal(false);
                    setNuevoUsuario("");
                    setNuevaContrasenia("");
                    setNuevoCorreo("");
                    setNuevoRol(3);
                    setMensaje(null);
                  }}
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleRegistrarUsuario}
                  className="flex-1 bg-[#052018] text-white py-2 rounded-md hover:bg-[#1A7B5F] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  Registrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE ELIMINAR USUARIO (CONFIRMACIÓN INICIAL) */}
      <AnimatePresence>
        {mostrarModalEliminar && usuarioSeleccionado && (
          <motion.div
            className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => { // Permite cerrar el modal haciendo clic fuera
              setMostrarModalEliminar(false);
              setUsuarioSeleccionado(null);
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
              }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative"
              onClick={e => e.stopPropagation()} // Para que no cierre al click dentro del modal
            >
              <h2 className="text-xl font-bold text-[#333333] mb-4 text-center">
                Eliminar usuario "{usuarioSeleccionado.username || usuarioSeleccionado.usuario}"
              </h2>

              <p className="mb-6 text-center text-[#333333]">
                ¿Estás seguro que deseas eliminar este usuario?
              </p>

              <div className="flex justify-between gap-4">
                <motion.button
                  onClick={() => {
                    setMostrarModalEliminar(false);
                    setUsuarioSeleccionado(null);
                  }}
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={async () => {
                    try {
                      await deleteUsuario(usuarioSeleccionado.userId);

                      const usernameToShow = usuarioSeleccionado.username || usuarioSeleccionado.usuario || 'Usuario';
                      setMensajeEliminarExito(`El usuario "${usernameToShow}" ha sido eliminado exitosamente.`);
                      setMostrarAlertaEliminarExito(true);

                    } catch (error) {
                      alert(buildErrorMessage(error));
                    }
                  }}
                  className="flex-1 bg-[#520000] text-white py-2 rounded-md hover:bg-[#8B0000] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Eliminar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* MODAL DE EDICIÓN DE USUARIO */}
      <AnimatePresence>
        {mostrarModalEditar && usuarioEditar && (
          <motion.div
            className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMostrarModalEditar(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-[#333333] mb-4 text-center">Editar usuario</h2>

              {mensajeEditar && (
                <div className="mb-3 text-sm text-center text-red-600 font-medium">{mensajeEditar}</div>
              )}

              <input
                type="text"
                placeholder="Nombre de usuario"
                className={inputStyle}
                value={nuevoNombreEditar}
                onChange={(e) => setNuevoNombreEditar(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className={inputStyle}
                value={nuevoCorreoEditar}
                onChange={(e) => setNuevoCorreoEditar(e.target.value)}
              />
              <select
                className={`${inputStyle} bg-white`}
                value={nuevoRolEditar}
                onChange={(e) => setNuevoRolEditar(Number(e.target.value))}
              >
                {ROL_OPTIONS.map((rol) => (
                  <option key={rol.value} value={rol.value}>
                    {rol.label}
                  </option>
                ))}
              </select>

              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setMostrarModalEditar(false)}
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F] transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditarUsuario}
                  className="flex-1 bg-[#052018] text-white py-2 rounded-md hover:bg-[#1A7B5F] transition-colors duration-200"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALERTA DE CONFIRMACIÓN DE ÉXITO DE REGISTRO */}
      <AnimatePresence>
        {mostrarAlertaExito && (
          <SuccessConfirmationAlert
            message={mensajeExito}
            onClose={handleSuccessAlertClose}
            fontMonoClass="font-mono"
          />
        )}
      </AnimatePresence>

      {/* ALERTA DE CONFIRMACIÓN DE ÉXITO DE ELIMINACIÓN (NUEVA) */}
      <AnimatePresence>
        {mostrarAlertaEliminarExito && (
          <SuccessConfirmationAlert
            message={mensajeEliminarExito}
            onClose={handleDeleteSuccessAlertClose}
            fontMonoClass="font-mono"
          />
        )}
      </AnimatePresence>
      

    </motion.div>
  );
};

export default PanelEditorUsuarios;