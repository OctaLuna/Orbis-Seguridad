import API from './api';

export const getUsuarios = async () => {
  const response = await API.get('/api/usuarios');
  return response.data?.usuarios ?? [];
};

export const updateUsuario = async (id, payload) => {
  if (!id) {
    throw new Error('El identificador del usuario es requerido');
  }

  const response = await API.put(`/api/usuarios/${id}`, payload);
  return response.data ?? response;
};

export const deleteUsuario = async (id) => {
  if (!id) {
    throw new Error('El identificador del usuario es requerido');
  }

  const response = await API.delete(`/api/usuarios/${id}`);
  return response.data ?? response;
};

export const createUsuario = async (payload) => {
  const response = await API.post('/api/auth/register', payload);
  return response.data ?? response;
};

// M-15: Crear usuario con alias @orbis.com (flujo admin)
export const crearUsuarioNuevo = async ({ nombre, apellido, correoReal, idRol }) => {
  const response = await API.post('/api/usuarios', { nombre, apellido, correoReal, idRol });
  return response.data ?? response;
};

// M-06: Desbloquear cuenta de usuario
export const desbloquearCuenta = async (id) => {
  const response = await API.patch(`/api/usuarios/${id}/desbloquear`);
  return response.data ?? response;
};
