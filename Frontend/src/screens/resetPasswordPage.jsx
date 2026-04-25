import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { solicitarResetPassword, validarTokenReset, resetearPassword } from '../services/authService';
import PasswordChecklist from '../components/PasswordChecklist';
import logo from '../assets/logo.png';

const inputClass =
  'w-full bg-surface border border-stroke rounded-xl text-text-main font-miles px-4 py-2.5 focus:outline-none focus:border-accent transition-colors duration-200';

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

// ── Vista 1: Solicitar reset por correo ──────────────────────────────────────
const ForgotPasswordForm = ({ onBack }) => {
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!correo.trim()) { setError('Ingresa tu correo electrónico.'); return; }
    setLoading(true);
    try {
      await solicitarResetPassword(correo.trim());
      setEnviado(true);
    } catch {
      // Respuesta siempre 200 desde el backend — esto no debería fallar
      setEnviado(true);
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
        <div className="text-5xl mb-3">📧</div>
        <h3 className="font-bodoni font-bold text-text-main text-lg mb-2">Revisa tu correo</h3>
        <p className="font-miles text-text-muted text-sm">
          Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña en los próximos minutos.
        </p>
        <button
          onClick={onBack}
          className="mt-6 text-sm font-miles text-primary hover:underline bg-transparent border-none cursor-pointer"
        >
          Volver al inicio
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-miles text-text-muted text-sm text-center mb-6">
        Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      <label className="block text-sm font-bodoni font-medium text-text-main mb-1">
        Correo electrónico
      </label>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="tu@correo.com"
        className={inputClass}
      />
      {error && <p className="text-sm text-red-500 font-miles mt-2">{error}</p>}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ backgroundColor: '#0A3A5A', scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-5 bg-primary text-white font-bodoni font-bold uppercase rounded-xl py-3 text-sm tracking-wide disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading ? 'Enviando...' : 'Enviar enlace'}
      </motion.button>
      <button
        type="button"
        onClick={onBack}
        className="w-full mt-3 text-sm font-miles text-text-muted hover:text-text-main bg-transparent border-none cursor-pointer transition-colors"
      >
        Volver
      </button>
    </form>
  );
};

// ── Vista 2: Restablecer contraseña con token ────────────────────────────────
const ResetForm = ({ token, onBack }) => {
  const navigate = useNavigate();
  const [tokenValido, setTokenValido] = useState(null); // null = loading
  const [passwordNuevo, setPasswordNuevo] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [show, setShow] = useState({ nuevo: false, confirmar: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    validarTokenReset(token)
      .then((data) => setTokenValido(data?.valido === true))
      .catch(() => setTokenValido(false));
  }, [token]);

  const toggle = (f) => setShow((prev) => ({ ...prev, [f]: !prev[f] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (passwordNuevo !== confirmar) { setError('Las contraseñas no coinciden.'); return; }
    if (passwordNuevo.length < 8) { setError('La contraseña no cumple los requisitos mínimos.'); return; }
    setLoading(true);
    try {
      await resetearPassword(token, passwordNuevo);
      setExito(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      const msg = err?.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(', ') : msg || 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValido === null) {
    return <p className="text-center font-miles text-text-muted py-8">Verificando enlace...</p>;
  }

  if (!tokenValido) {
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-3">⚠️</div>
        <h3 className="font-bodoni font-bold text-red-500 text-lg mb-2">Enlace inválido o expirado</h3>
        <p className="font-miles text-text-muted text-sm">
          El enlace de restablecimiento ya expiró o no es válido. Solicita uno nuevo.
        </p>
        <button
          onClick={onBack}
          className="mt-6 text-sm font-miles text-primary hover:underline bg-transparent border-none cursor-pointer"
        >
          Solicitar nuevo enlace
        </button>
      </div>
    );
  }

  if (exito) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
        <div className="text-5xl mb-3">✓</div>
        <p className="font-bodoni font-bold text-green-600 text-lg">¡Contraseña restablecida!</p>
        <p className="font-miles text-text-muted text-sm mt-1">Redirigiendo...</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-miles text-text-muted text-sm text-center mb-5">
        Crea una nueva contraseña segura para tu cuenta.
      </p>

      <label className="block text-sm font-bodoni font-medium text-text-main mb-1">
        Nueva contraseña
      </label>
      <div className="relative mb-1">
        <input
          type={show.nuevo ? 'text' : 'password'}
          value={passwordNuevo}
          onChange={(e) => setPasswordNuevo(e.target.value)}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => toggle('nuevo')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main bg-transparent border-none cursor-pointer transition-colors"
        >
          {show.nuevo ? <EyeHide /> : <EyeShow />}
        </button>
      </div>
      <PasswordChecklist password={passwordNuevo} />

      <div className="mt-4">
        <label className="block text-sm font-bodoni font-medium text-text-main mb-1">
          Confirmar contraseña
        </label>
        <div className="relative">
          <input
            type={show.confirmar ? 'text' : 'password'}
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => toggle('confirmar')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main bg-transparent border-none cursor-pointer transition-colors"
          >
            {show.confirmar ? <EyeHide /> : <EyeShow />}
          </button>
        </div>
        {confirmar && passwordNuevo !== confirmar && (
          <p className="text-xs text-red-500 font-miles mt-1">Las contraseñas no coinciden.</p>
        )}
      </div>

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 font-miles mt-3">
          {error}
        </motion.p>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ backgroundColor: '#0A3A5A', scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-5 bg-primary text-white font-bodoni font-bold uppercase rounded-xl py-3 text-sm tracking-wide disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading ? 'Guardando...' : 'Restablecer contraseña'}
      </motion.button>
    </form>
  );
};

// ── Página principal ─────────────────────────────────────────────────────────
const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

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

        <h1 className="font-bodoni font-bold text-text-main text-xl uppercase tracking-wider text-center mb-6">
          {token ? 'Nueva contraseña' : 'Recuperar contraseña'}
        </h1>

        <AnimatePresence mode="wait">
          {token ? (
            <motion.div key="reset" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResetForm token={token} onBack={() => navigate('/reset-password')} />
            </motion.div>
          ) : (
            <motion.div key="forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ForgotPasswordForm onBack={() => navigate('/')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
