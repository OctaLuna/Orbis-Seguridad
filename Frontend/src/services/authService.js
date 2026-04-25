import API, { setAuthToken, clearAuthToken } from './api';

const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const [, payload] = token.split('.');
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.warn('No se pudo decodificar el token JWT', error);
    return null;
  }
};

export const login = async ({ usuario, contrasenia }) => {
  if (!usuario || !contrasenia) {
    throw new Error('Usuario y contraseña son requeridos');
  }

  const response = await API.post('/api/auth/login', { usuario, contrasenia });
  const data = response.data ?? response;

  const accessToken = data.access_token;
  const idUsuario = data.idUsuario;

  if (!accessToken || !idUsuario) {
    throw new Error('La respuesta de autenticación no contiene los datos requeridos');
  }

  const decoded = decodeJwt(accessToken) || {};

  const user = {
    id: idUsuario,
    usuario: decoded.usuario || usuario,
    idRol: decoded.rol ?? decoded.role ?? null,
    exp: decoded.exp ?? null,
    must_change_password: data.must_change_password ?? decoded.must_change_password ?? false,
  };

  setAuthToken(accessToken);

  return {
    message: data.message,
    token: accessToken,
    user,
  };
};

export const registerVisitor = async ({ usuario, correo, contrasenia, idRol = 7 }) => {
  const payload = { usuario, correo, contrasenia, idRol };
  const response = await API.post('/api/auth/register', payload);
  return response.data ?? response;
};

export const logout = () => {
  clearAuthToken();
};

// M-14: Cambio de contraseña del usuario autenticado
export const cambiarPassword = async (passwordActual, passwordNuevo) => {
  const response = await API.patch('/api/usuarios/cambiar-password', {
    passwordActual,
    passwordNuevo,
  });
  return response.data ?? response;
};

// M-16: Solicitar restablecimiento de contraseña por correo
export const solicitarResetPassword = async (correo) => {
  const response = await API.post('/api/auth/forgot-password', { correo });
  return response.data ?? response;
};

// M-16: Validar si un token de reset es válido
export const validarTokenReset = async (token) => {
  const response = await API.get(`/api/auth/reset-password/validate/${token}`);
  return response.data ?? response;
};

// M-16: Confirmar el nuevo password con el token
export const resetearPassword = async (token, passwordNuevo) => {
  const response = await API.post('/api/auth/reset-password', { token, passwordNuevo });
  return response.data ?? response;
};
