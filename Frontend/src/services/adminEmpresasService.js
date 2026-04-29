import API from './api';

const normalizeResponseArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  if (Array.isArray(payload?.empresas)) {
    return payload.empresas;
  }
  if (Array.isArray(payload?.tamaniosEmpresas)) {
    return payload.tamaniosEmpresas;
  }
  return [];
};

export const getAdminEmpresasSummary = async () => {
  const response = await API.get('/api/empresas');
  return normalizeResponseArray(response.data);
};

export const registerEmpresa = async (payload) => {
  const response = await API.post('/api/empresas', payload);
  return response.data || null;
};

export const updateEmpresa = async (id, payload) => {
  const response = await API.put(`/api/empresas/${id}`, payload);
  return response.data || null;
};

export const patchEmpresa = async (id, payload) => {
  const response = await API.patch(`/api/empresas/${id}`, payload);
  return response.data || null;
};

export const getCatalogOptions = async (catalogoKey) => {
  if (catalogoKey === 'tamanios') {
    const response = await API.get('/api/tamanios-empresas');
    return normalizeResponseArray(response.data);
  }

  const response = await API.get(`/api/catalogo/${catalogoKey}`);
  return normalizeResponseArray(response.data);
};
