import API from './api';

const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

const isValidImage = (url = '') => {
  if (!url) return false;

  if (url.startsWith('data:image')) {
    return true;
  }

  const lowerUrl = url.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lowerUrl.includes(ext));
};

const pickFirstImage = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) {
    return PLACEHOLDER_IMAGE;
  }

  const firstValid = images.find((image) => {
    const url = typeof image === 'string' ? image : image?.url;
    return url && isValidImage(url);
  });

  const candidate = firstValid || images[0];
  const url = typeof candidate === 'string' ? candidate : candidate?.url;
  const finalUrl = url && isValidImage(url) ? url : null;

  return finalUrl || PLACEHOLDER_IMAGE;
};

const normalizeRubro = (candidate) => {
  if (!candidate) {
    return '';
  }

  if (typeof candidate === 'string') {
    return candidate.trim();
  }

  if (Array.isArray(candidate)) {
    return candidate
      .map((item) => normalizeRubro(item))
      .filter(Boolean)
      .join(', ');
  }

  if (typeof candidate === 'object') {
    return (
      candidate.nombre ||
      candidate.nombreRubro ||
      candidate.descripcion ||
      candidate.rubro ||
      ''
    ).toString().trim();
  }

  return '';
};

const extractRubroNombre = (empresa = {}) => {
  const direct = normalizeRubro(
    empresa.rubroNombre ||
      empresa.rubroPrincipalNombre ||
      empresa.rubro ||
      empresa.rubroPrincipal
  );

  if (direct) {
    return direct;
  }

  const fromArray = normalizeRubro(empresa.rubros);
  if (fromArray) {
    return fromArray;
  }

  return '';
};

export const getEmpresasCards = async (params = {}, variant = 'public') => {
  const endpoint = variant === 'private'
    ? '/api/empresas/cards/private'
    : '/api/empresas/cards/public';

  const response = await API.get(endpoint, { params });
  const raw = response.data?.data ?? response.data?.empresas?.data ?? [];

  return raw.map((empresa) => {
    const imagen = pickFirstImage(empresa.imagenes);

    const hitos = Array.isArray(empresa.hitos)
      ? empresa.hitos.map((hito) => ({
          id: hito.id,
          nombre: hito.nombre,
          fecha: hito.fecha,
        }))
      : [];

    const departamentoCentral = empresa.sedeCentral?.nombre || empresa.departamento?.nombre || null;
    const rubro = extractRubroNombre(empresa);

    return {
      id: empresa.id,
      nombre: empresa.nombreComercial || 'Nombre no disponible',
      imagen,
      hitos,
      departamento: departamentoCentral,
      rubro,
    };
  });
};

const normalizeEmpresaDetail = (empresa, variant = 'public') => {
  const imagenes = Array.isArray(empresa.imagenes)
    ? empresa.imagenes
        .map((img) => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean)
    : [];

  const sedes = Array.isArray(empresa.sedes)
    ? empresa.sedes.map((sede) => ({
        id: sede.id,
        esCentral: Boolean(sede.esCentral),
        departamentoId: sede.departamento?.id ?? null,
        departamento: sede.departamento?.nombre || null,
      }))
    : [];

  const centralDepartment = sedes.find((sede) => sede.esCentral && sede.departamento)?.departamento;
  const fallbackDepartment = sedes.find((sede) => sede.departamento)?.departamento;
  const departamentoNombre = centralDepartment
    || fallbackDepartment
    || empresa.departamento?.nombre
    || null;

  const rubrosLista = Array.isArray(empresa.rubrosEmpresa)
    ? empresa.rubrosEmpresa
        .map((item) => item?.rubro?.nombre)
        .filter(Boolean)
    : [];

  const hitos = Array.isArray(empresa.hitos)
    ? empresa.hitos.map((hito) => ({
        id: hito.id,
        nombre: hito.nombre,
        fecha: hito.fecha || null,
      }))
    : [];

  const fundadores = Array.isArray(empresa.fundadores)
    ? empresa.fundadores
        .map((fundador) => (typeof fundador === 'string' ? fundador : fundador?.nombre))
        .filter(Boolean)
    : [];

  const municipios = Array.isArray(empresa.municipios)
    ? empresa.municipios
        .map((municipio) => (typeof municipio === 'string' ? municipio : municipio?.nombreMunicipio))
        .filter(Boolean)
    : [];

  const servicios = Array.isArray(empresa.servicios)
    ? empresa.servicios
        .map((servicio) => (typeof servicio === 'string' ? servicio : servicio?.nombre))
        .filter(Boolean)
    : [];

  const items = Array.isArray(empresa.items)
    ? empresa.items
        .map((item) => (typeof item === 'string' ? item : item?.nombre))
        .filter(Boolean)
    : [];

  const tiposSocietarios = Array.isArray(empresa.tiposSocietariosEmpresa)
    ? empresa.tiposSocietariosEmpresa
        .map((item) => item?.tipoSocietario?.nombre)
        .filter(Boolean)
    : [];

  const tamanio = empresa.tamanioEmpresa?.nombre || '';
  const actividad = empresa.actividad || '';
  const descripcion = empresa.mensaje || 'Descripción no disponible.';
  const direccionWeb = empresa.direccionWeb || empresa.direccion_web || '';
  const imagen = pickFirstImage(imagenes);

  return {
    id: empresa.id,
    nombre: empresa.nombreComercial || 'Nombre no disponible',
    descripcion,
    slogan: empresa.vision || '',
    rubro: rubrosLista.join(', ') || 'Rubro no especificado',
    rubros: rubrosLista,
    departamento: departamentoNombre || 'Departamento no especificado',
    sedes,
    actividad,
    fundadores,
    municipios,
    servicios,
    items,
    tiposSocietarios,
    tamanio,
    direccionWeb,
    imagen,
    imagenes,
    hitos,
    variant,
  };
};

const getEmpresaDetailById = async (id, variant = 'public') => {
  if (!id) {
    throw new Error('El identificador de la empresa es requerido');
  }

  const endpoint = variant === 'private'
    ? `/api/empresas/private/${id}`
    : `/api/empresas/public/${id}`;

  const response = await API.get(endpoint);
  const empresa = response.data?.empresa;

  if (!empresa) {
    throw new Error('No se encontró información para la empresa solicitada');
  }

  return normalizeEmpresaDetail(empresa, variant);
};

export const getEmpresaPublicById = async (id) => getEmpresaDetailById(id, 'public');

export const getEmpresaPrivateById = async (id) => getEmpresaDetailById(id, 'private');

export const updateEmpresaPrivate = async (id, cambiosParciales = {}) => {
  if (!id) {
    throw new Error('El identificador de la empresa es requerido');
  }

  const response = await API.put(`/api/empresas/private/${id}`, cambiosParciales);
  const empresaActualizada = response.data?.empresa || response.data;

  if (!empresaActualizada) {
    return null;
  }

  return normalizeEmpresaDetail(empresaActualizada, 'private');
};

export { pickFirstImage };
