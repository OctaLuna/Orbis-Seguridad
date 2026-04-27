import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cambiarPassword } from '../services/authService';
import PasswordChecklist from '../components/PasswordChecklist';
import logo from '../assets/logo.png';

const EyeShow = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const EyeHide = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75C21.27 7.61 17 4.5 12 4.5c-1.6 0-3.14.35-4.54.96l1.56 1.56C9.74 7.13 10.85 7 12 7zm-1.07 5.53l2.81 2.81c-.71.15-1.44.26-2.19.26-2.76 0-5-2.24-5-5 0-.75.11-1.48.26-2.19l2.81 2.81c.11.7.42 1.34.81 1.81zM2.71 3.27L1.44 4.54l2.02 2.02C2.03 7.95 1.16 9.77 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.53 1.53 1.27-1.27L2.71 3.27z" />
  </svg>
);

const PasswordField = ({ id, label, value, onChange, show, onToggle }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-bodoni font-medium text-text-main mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="w-full bg-surface border border-stroke rounded-xl text-text-main font-miles px-4 py-2.5 pr-11 focus:outline-none focus:border-accent transition-colors duration-200"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors bg-transparent border-none cursor-pointer"
      >
        {show ? <EyeHide /> : <EyeShow />}
      </button>
    </div>
  </div>
);

const CambiarPasswordPage = ({ authState, onAuthUpdate }) => {
  const navigate = useNavigate();
  const isForzado = authState?.user?.must_change_password === true;

  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNuevo, setPasswordNuevo] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [show, setShow] = useState({ actual: false, nuevo: false, confirmar: false });
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState([]);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (!authState?.user) navigate('/');
  }, [authState, navigate]);

  const toggle = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    if (passwordNuevo !== confirmar) {
      setErrores(['Las contraseñas nuevas no coinciden.']);
      return;
    }

    setLoading(true);
    try {
      await cambiarPassword(isForzado ? '' : passwordActual, passwordNuevo);
      setExito(true);
      if (onAuthUpdate) {
        const updated = {
          ...authState,
          user: { ...authState.user, must_change_password: false },
        };
        onAuthUpdate(updated);
      }
      setTimeout(() => navigate('/'), 1800);
    } catch (err) {
      const data = err?.response?.data;
      if (data?.tipo === 'diccionario') {
        setErrores(['Tu contraseña es demasiado predecible:', ...(data.errores || ['Intenta con una combinación más creativa'])]);
      } else if (data?.tipo === 'requisitos') {
        setErrores(data.errores || ['La contraseña no cumple los requisitos']);
      } else if (data?.message?.includes('reutilizar')) {
        setErrores(['No puedes usar una contraseña que ya utilizaste antes']);
      } else {
        setErrores([data?.message || 'Error al cambiar la contraseña.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        className="bg-surface-elevated rounded-2xl shadow-2xl border border-stroke/30 w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Orbis" className="h-16 object-contain" />
        </div>

        <h1 className="font-bodoni font-bold text-text-main text-xl uppercase tracking-wider text-center mb-1">
          {isForzado ? 'Cambio de contraseña requerido' : 'Cambiar contraseña'}
        </h1>

        {isForzado && (
          <p className="text-sm font-miles text-text-muted text-center mb-6">
            Por seguridad, debes establecer una nueva contraseña antes de continuar.
          </p>
        )}

        {!isForzado && <div className="mb-6" />}

        {exito ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="text-5xl mb-3">✓</div>
            <p className="font-bodoni font-bold text-green-600 text-lg">¡Contraseña actualizada!</p>
            <p className="font-miles text-text-muted text-sm mt-1">Redirigiendo...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            {!isForzado && (
              <PasswordField
                id="actual"
                label="Contraseña actual"
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
                show={show.actual}
                onToggle={() => toggle('actual')}
              />
            )}

            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-miles text-amber-800 leading-relaxed">
              La contraseña debe tener al menos 12 caracteres, mayúsculas, minúsculas, números y un
              carácter especial. Además no puede ser una palabra común o una variación predecible.
            </div>

            <PasswordField
              id="nuevo"
              label="Nueva contraseña"
              value={passwordNuevo}
              onChange={(e) => setPasswordNuevo(e.target.value)}
              show={show.nuevo}
              onToggle={() => toggle('nuevo')}
            />

            <PasswordChecklist password={passwordNuevo} />

            <div className="mt-4">
              <PasswordField
                id="confirmar"
                label="Confirmar nueva contraseña"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                show={show.confirmar}
                onToggle={() => toggle('confirmar')}
              />
            </div>

            {confirmar && passwordNuevo !== confirmar && (
              <p className="text-xs text-red-500 font-miles -mt-2 mb-2">Las contraseñas no coinciden.</p>
            )}

            {errores.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
              >
                {errores.map((e, i) => (
                  <p key={i} className={`font-miles text-red-600 ${i === 0 ? 'font-semibold text-sm' : 'text-xs mt-1'}`}>
                    {i > 0 && errores.length > 1 ? `• ${e}` : e}
                  </p>
                ))}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ backgroundColor: '#0A3A5A', scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 bg-primary text-white font-bodoni font-bold uppercase rounded-xl py-3 text-sm tracking-wide disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
            </motion.button>

            {!isForzado && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full mt-3 text-sm font-miles text-text-muted hover:text-text-main transition-colors bg-transparent border-none cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default CambiarPasswordPage;
