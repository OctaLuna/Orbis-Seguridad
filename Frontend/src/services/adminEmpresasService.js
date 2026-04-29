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
  const formData = new FormData();

  // Formatear fecha estrictamente a YYYY-MM-DD
  let fechaFormateada = payload.fecha_fundacion || payload.fechaFundacion || payload.foundationDate || '';
  if (fechaFormateada) {
    try {
      const date = new Date(fechaFormateada);
      fechaFormateada = date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Error formateando fecha:', e);
      fechaFormateada = '';
    }
  }

  // Campos principales
  formData.append('nombre_comercial', payload.nombre_comercial || payload.nombre || '');
  formData.append('fecha_fundacion', fechaFormateada);
  formData.append('id_tamanio', String(payload.id_tamanio || payload.tamanio || 1));
  formData.append('vision', payload.vision || '');
  formData.append('mision', payload.mision || '');
  formData.append('direccion_web', payload.direccion_web || '');
  formData.append('actividad', payload.actividad || '');
  formData.append('mensaje', payload.mensaje || '');
  formData.append('mensajeConmemorativo', payload.mensajeConmemorativo || '');

  // Arrays obligatorios stringificados
  formData.append('rubros', JSON.stringify(payload.rubros || []));
  formData.append('tiposSocietarios', JSON.stringify(payload.tiposSocietarios || []));
  formData.append('familia', JSON.stringify(payload.familia || []));
  formData.append('sedes', JSON.stringify(payload.sedes || []));
  formData.append('fundadores', JSON.stringify(payload.fundadores || []));
  formData.append('servicios', JSON.stringify(payload.servicios || []));
  formData.append('items', JSON.stringify(payload.items || []));
  formData.append('municipios', JSON.stringify(payload.municipios || []));
  formData.append('paisesOperaInternacionalmente', JSON.stringify(payload.paisesOperaInternacionalmente || []));
  formData.append('reconocimientos', JSON.stringify(payload.reconocimientos || []));
  formData.append('imagenes', JSON.stringify(payload.imagenes || []));
  formData.append('hitos', JSON.stringify(payload.hitos || []));
  formData.append('implementacion', JSON.stringify(payload.implementacion || {}));

  // Archivos si existen
  if (payload.logoFile) {
    formData.append('logo', payload.logoFile);
  }

  console.log('🚀 ENVIANDO FormData AL BACKEND:', Object.fromEntries(formData.entries()));

  const response = await API.post('/api/formulario', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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