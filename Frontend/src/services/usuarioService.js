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
