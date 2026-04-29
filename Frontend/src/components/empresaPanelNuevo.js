import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MapaBolivia from './mapaBolivia';
import EmpresaBuscador from './empresaBuscador';
import EmpresaLista from './empresaLista';
import EmpresaModal from './empresaModal';
import { getEmpresasCards, getEmpresaPublicById, getEmpresaPrivateById, updateEmpresaPrivate } from '../services/empresaService';
import { cacheManager } from './utils/cacheUtils';
import Swal from 'sweetalert2';
import apiClient from '../services/api'; // Necesitamos tu cliente Axios para el DELETE

let privateDetailsGloballyDisabled = false;

const debugLog = (...args) => {
  console.log('[EmpresasPanel]', ...args);
};

const normalizarTexto = (valor) =>
  typeof valor === 'string'
    ? valor.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : '';

const EmpresasPanel = ({ loggedInUser, canEdit = false }) => {
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [departamentosActivos, setDepartamentosActivos] = useState(() => []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [vistaGrid, setVistaGrid] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalSaving, setModalSaving] = useState(false);
  const panelHeight = 82;

  // Claves para el cache
  const CACHE_KEYS = useMemo(() => ({
    EMPRESAS_CARDS: 'empresas-cards-data',
    EMPRESA_DETAIL: (id) => `empresa-detail-${id}`
  }), []);

  const canViewPrivate = useMemo(() => {
    if (!loggedInUser?.idRol) return false;
    return [1, 2, 3].includes(loggedInUser.idRol);
  }, [loggedInUser?.idRol]);

  const [privateDetailEnabled, setPrivateDetailEnabled] = useState(() => canViewPrivate && !privateDetailsGloballyDisabled);

  useEffect(() => {
    setPrivateDetailEnabled(canViewPrivate && !privateDetailsGloballyDisabled);
  }, [canViewPrivate]);

  const disablePrivateDetails = useCallback(() => {
    if (!privateDetailsGloballyDisabled) {
      privateDetailsGloballyDisabled = true;
    }
    setPrivateDetailEnabled((current) => (current ? false : current));
  }, [setPrivateDetailEnabled]);

  const shouldUsePrivateDetails = canViewPrivate && privateDetailEnabled;

  const shouldFallbackToPublic = useCallback((error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) return true;

    const code = error?.code;
    if (code === 'ERR_NETWORK' || code === 'ECONNABORTED') return true;

    const message = typeof error?.message === 'string' ? error.message.toLowerCase() : '';
    if (message.includes('network error') || message.includes('cors')) return true;

    return false;
  }, []);

  // Función para cargar empresas con cache
  const loadEmpresas = useCallback(async () => {
    debugLog('Iniciando carga de empresas', { canViewPrivate });
    setLoading(true);
    setError(null);

    try {
      // Verificar cache primero
      const cachedEmpresas = cacheManager.get(CACHE_KEYS.EMPRESAS_CARDS);
      if (cachedEmpresas) {
        debugLog('Usando empresas desde cache', { 
          cantidad: cachedEmpresas.length,
          primeraEmpresa: cachedEmpresas[0]?.nombre,
          tieneImagen: !!cachedEmpresas[0]?.imagen
        });
        setFullEmpresas(cachedEmpresas);
        setLoading(false);
        return;
      }

      let cards = [];
      try {
        cards = await getEmpresasCards({ limit: 100 }, canViewPrivate ? 'private' : 'public');
        debugLog('Tarjetas cargadas desde API', { 
          cantidad: cards.length, 
          variant: canViewPrivate ? 'private' : 'public',
          primeraEmpresa: cards[0]?.nombre,
          tieneImagen: !!cards[0]?.imagen
        });
      } catch (primaryError) {
        debugLog('Error al obtener tarjetas en primera llamada', primaryError);
        if (canViewPrivate && primaryError?.response?.status === 401) {
          cards = await getEmpresasCards({ limit: 100 }, 'public');
          debugLog('Recuperado tarjetas públicas tras 401', { cantidad: cards.length });
        } else {
          throw primaryError;
        }
      }

      const baseEmpresas = cards.map((card) => ({
        id: card.id,
        nombre: card.nombre,
        rubro: card.rubro || '',
        slogan: card.slogan || '',
        descripcion: card.descripcion || 'Descripción no disponible.',
        departamento: card.departamento || '',
        imagen: card.imagen, // Las URLs de imágenes SÍ se guardan en cache
        logo: card.logo, // Otras imágenes también
        hitos: Array.isArray(card.hitos) ? card.hitos : [],
      }));

      // Guardar en cache (CON imágenes/URLs)
      cacheManager.set(CACHE_KEYS.EMPRESAS_CARDS, baseEmpresas);
      debugLog('Empresas guardadas en cache CON imágenes', { 
        cantidad: baseEmpresas.length,
        primeraImagen: baseEmpresas[0]?.imagen 
      });

      setFullEmpresas(baseEmpresas);
    } catch (err) {
      console.error('Error al cargar empresas:', err);
      debugLog('Error general en la carga de empresas', err);
      setError('No se pudieron cargar las empresas. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
      debugLog('Carga de empresas finalizada');
    }
  }, [canViewPrivate, CACHE_KEYS.EMPRESAS_CARDS]);

  useEffect(() => {
    loadEmpresas();
  }, [loadEmpresas]);

  const handleDepartamentoToggle = useCallback((departamento) => {
    if (!departamento || typeof departamento !== 'string') {
      return;
    }

    setDepartamentosActivos((prev) => {
      const normalized = departamento.trim();
      if (!normalized) {
        return prev;
      }

      const alreadySelected = prev.includes(normalized);
      return alreadySelected
        ? prev.filter((dep) => dep !== normalized)
        : [...prev, normalized];
    });
  }, []);

  useEffect(() => {
    let lista = [...fullEmpresas];
    const terminoNormalizado = normalizarTexto(busqueda);
    const departamentosNormalizados = departamentosActivos
      .map(normalizarTexto)
      .filter(Boolean);

    if (departamentosNormalizados.length > 0) {
      lista = lista.filter((empresaActual) => {
        const departamentoEmpresa = normalizarTexto(empresaActual.departamento);
        return departamentosNormalizados.includes(departamentoEmpresa);
      });
    }

    if (terminoNormalizado) {
      const coincideConTermino = (valor) => normalizarTexto(valor).includes(terminoNormalizado);
      lista = lista.filter((empresaActual) =>
        coincideConTermino(empresaActual.nombre) ||
        coincideConTermino(empresaActual.rubro) ||
        coincideConTermino(empresaActual.departamento)
      );
    }

    setEmpresas(lista);
  }, [fullEmpresas, busqueda, departamentosActivos]);

  // Función para cargar detalle de empresa con cache
  const loadEmpresaDetail = useCallback(async (empresaId) => {
    const cacheKey = CACHE_KEYS.EMPRESA_DETAIL(empresaId);
    
    // Verificar cache primero
    const cachedDetail = cacheManager.get(cacheKey);
    if (cachedDetail) {
      debugLog('Usando detalle desde cache', { 
        id: empresaId,
        tieneImagen: !!cachedDetail.imagen 
      });
      return cachedDetail;
    }

    let detalle = null;

    if (shouldUsePrivateDetails) {
      try {
        detalle = await getEmpresaPrivateById(empresaId);
        debugLog('Detalle privado obtenido desde API', { 
          id: empresaId,
          tieneImagen: !!detalle.imagen 
        });
      } catch (err) {
        debugLog('Error al obtener detalle privado', { id: empresaId, error: err });
        if (shouldFallbackToPublic(err)) {
          disablePrivateDetails();
          debugLog('Falling back a detalle público', { id: empresaId });
        } else {
          throw err;
        }
      }
    }

    if (!detalle) {
      detalle = await getEmpresaPublicById(empresaId);
      debugLog('Detalle público obtenido desde API', { 
        id: empresaId,
        tieneImagen: !!detalle.imagen 
      });
    }

    // Guardar en cache (CON imágenes)
    cacheManager.set(cacheKey, detalle);
    debugLog('Detalle guardado en cache CON imagen', { 
      id: empresaId,
      imagen: detalle.imagen 
    });

    return detalle;
  }, [shouldUsePrivateDetails, disablePrivateDetails, CACHE_KEYS, shouldFallbackToPublic]);

  const handleCardClick = async (empresa) => {
    debugLog('Click en tarjeta', { 
      id: empresa.id, 
      shouldUsePrivateDetails,
      imagenActual: empresa.imagen 
    });
    setShowModal(true);
    setModalLoading(true);
    setModalError(null);
    setSelectedEmpresa(null);

    try {
      const detalle = await loadEmpresaDetail(empresa.id);
      setSelectedEmpresa(detalle);

      // Actualizar lista principal con información más reciente
      setFullEmpresas((prev) =>
        prev.map((item) => (item.id === detalle.id ? { ...item, ...detalle } : item))
      );
    } catch (err) {
      console.error('Error al obtener detalle de la empresa:', err);
      debugLog('Error general al abrir modal de empresa', err);
      setModalError('No se pudo cargar la información de la empresa. Intenta nuevamente más tarde.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleEmpresaUpdate = async (empresaId, cambios) => {
    if (!empresaId || !canEdit) return;

    setModalSaving(true);
    setModalError(null);
    debugLog('Intentando actualizar empresa', { empresaId, cambios });

    try {
      const actualizada = await updateEmpresaPrivate(empresaId, cambios);
      if (actualizada) {
        setSelectedEmpresa(actualizada);
        
        // Actualizar cache y lista
        cacheManager.set(CACHE_KEYS.EMPRESA_DETAIL(empresaId), actualizada);
        setFullEmpresas((prev) =>
          prev.map((item) => (item.id === actualizada.id ? { ...item, ...actualizada } : item))
        );
        
        debugLog('Empresa actualizada correctamente', { 
          id: actualizada.id,
          nuevaImagen: actualizada.imagen 
        });
      }
    } catch (err) {
      console.error('Error al actualizar la empresa:', err);
      debugLog('Error al actualizar empresa', err);
      const backendMessage = err?.response?.data?.message;
      const mensaje = Array.isArray(backendMessage)
        ? backendMessage.join(', ')
        : backendMessage || 'No se pudo guardar la información. Intenta nuevamente.';
      setModalError(mensaje);
    } finally {
      setModalSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
    setModalLoading(false);
    setModalError(null);
    setModalSaving(false);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const toggleVista = () => {
    setVistaGrid(prev => !prev);
  };

  // --- FUNCIONALIDAD DEL BOTÓN ELIMINAR ---
  const handleDeleteClick = (empresa) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar/desactivar a "${empresa.nombre}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Rojo peligro
      cancelButtonColor: '#2C5282', // Azul de tu marca
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#f8fafc',
      borderRadius: '10px'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Llamada al backend para eliminar (ajusta la ruta si tu endpoint es diferente)
          await apiClient.delete(`/api/empresas/${empresa.id}`);
          
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La empresa ha sido eliminada del sistema.',
            icon: 'success',
            confirmButtonColor: '#2C5282'
          }).then(() => {
             // Recargamos la página para limpiar la caché y actualizar la tabla
             window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar empresa:", error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar la empresa. Revisa si tiene dependencias.',
            icon: 'error',
            confirmButtonColor: '#2C5282'
          });
        }
      }
    });
  };

  // --- FUNCIONALIDAD DEL BOTÓN EDITAR ---
  const handleEditClick = (empresa) => {
    // Como tu EmpresaModal ya está preparado para editar (recibe onSave y canEdit),
    // la forma más eficiente es simplemente simular el click normal en la tarjeta
    // para que se abra tu vista detallada con los campos editables.
    handleCardClick(empresa);
  };

  return (
    <>
    <div className="p-2 flex flex-col md:flex-row gap-4 overflow-hidden" style={{ height: `${panelHeight}vh` }}>
      {/* Columna Izquierda: Mapa */}
      <div className="w-full md:flex-1 bg-gray-100 rounded-lg p-4 shadow-md flex flex-col h-full">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold">Empresas por Departamento</h2>
        </div>

        <div className="w-full h-[68%] flex-shrink-0">
          <MapaBolivia
            onDepartamentoToggle={handleDepartamentoToggle}
            selectedDepartamentos={departamentosActivos}
          />
        </div>
        <div className="flex-grow"></div>
      </div>

      {/* Columna Derecha: Buscador y Empresas */}
      <div className="relative w-full md:flex-1 flex flex-col h-full">
        <EmpresaBuscador
          busqueda={busqueda}
          onBusquedaChange={handleBusquedaChange}
          vistaGrid={vistaGrid}
          onVistaToggle={toggleVista}
        />

        {/* AQUÍ INYECTAMOS EL USUARIO Y LAS FUNCIONES A EMPRESALISTA */}
        <EmpresaLista
          empresas={empresas}
          loading={loading}
          error={error}
          vistaGrid={vistaGrid}
          onCardClick={handleCardClick}
          loggedInUser={loggedInUser}
          onEdit={handleEditClick}       
          onDelete={handleDeleteClick}   
        />
      </div>
    </div>

    {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1200] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-4xl h-[90vh] bg-white rounded-lg overflow-hidden shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {modalLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                </div>
              )}

              {modalError && !modalLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <p className="text-text-main font-miles">{modalError}</p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-primary text-surface-elevated rounded-md font-bodoni font-semibold hover:bg-primary/90"
                  >
                    Cerrar
                  </button>
                </div>
              )}

              {!modalError && selectedEmpresa && (
                <EmpresaModal
                  empresa={selectedEmpresa}
                  onClose={handleCloseModal}
                  canEdit={canEdit}
                  onSave={(changes) => handleEmpresaUpdate(selectedEmpresa.id, changes)}
                  saving={modalSaving}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
};

export default EmpresasPanel;