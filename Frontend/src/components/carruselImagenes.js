import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getEmpresasCards, getEmpresaPublicById, getEmpresaPrivateById } from '../services/empresaService';
import EmpresaModal from './empresaModal';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const DISTRIBUTION_FALLBACK = 1;

const CarruselImagenes = ({ altura = 400, filas = 3, limite = 60, loggedInUser }) => {
  const [imagenesDistribuidas, setImagenesDistribuidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  const canViewPrivate = useMemo(() => {
    if (!loggedInUser?.idRol) return false;
    return [1, 2, 3].includes(loggedInUser.idRol);
  }, [loggedInUser?.idRol]);

  const distribuirEquitativamente = (imagenes, filasDistribucion) => {
    const filasSeguras = Math.max(filasDistribucion, DISTRIBUTION_FALLBACK);
    const distribuidas = Array.from({ length: filasSeguras }, () => []);
    imagenes.forEach((img, index) => {
      const posicion = index % filasSeguras;
      distribuidas[posicion].push(img);
    });
    return distribuidas;
  };

  const normalizarImagen = (url) => {
    if (!url) {
      return url;
    }

    if (url.includes('drive.google.com')) {
      const driveId = url.split('/d/')[1]?.split('/')[0];
      if (driveId) {
        return `https://drive.google.com/uc?export=view&id=${driveId}`;
      }
    }

    return url;
  };

  const obtenerImagenesDesdeBackend = async () => {
    setLoading(true);
    setError(null);

    try {
      let empresas = [];
      try {
        empresas = await getEmpresasCards({ limit: limite }, canViewPrivate ? 'private' : 'public');
      } catch (primaryError) {
        if (canViewPrivate && primaryError?.response?.status === 401) {
          empresas = await getEmpresasCards({ limit: limite }, 'public');
        } else {
          throw primaryError;
        }
      }

      if (!empresas.length) {
        setImagenesDistribuidas([]);
        return;
      }

      const datos = empresas.map((empresa) => ({
        id: empresa.id,
        nombre: empresa.nombre,
        imagen: normalizarImagen(empresa.imagen),
      }));

      const imagenesBarajadas = shuffleArray(datos);
      const distribuidas = distribuirEquitativamente(imagenesBarajadas, filas);
      setImagenesDistribuidas(distribuidas);
    } catch (err) {
      console.error('Error al obtener imágenes desde backend:', err);
      setError('No se pudo cargar el carrusel de empresas. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerImagenesDesdeBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filas, limite, canViewPrivate]);

  const responsiveHeight = `clamp(200px, ${altura}px, 600px)`;

  const handleEmpresaClick = async (empresaId) => {
    setShowModal(true);
    setModalLoading(true);
    setModalError(null);
    setSelectedEmpresa(null);

    try {
      let detalle = null;

      if (canViewPrivate) {
        try {
          detalle = await getEmpresaPrivateById(empresaId);
        } catch (privateError) {
          if (privateError?.response?.status !== 401) {
            throw privateError;
          }
        }
      }

      if (!detalle) {
        detalle = await getEmpresaPublicById(empresaId);
      }

      setSelectedEmpresa(detalle);
    } catch (err) {
      console.error('Error al cargar detalle de empresa:', err);
      setModalError('No se pudo cargar la información de la empresa. Intenta nuevamente.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalLoading(false);
    setModalError(null);
    setSelectedEmpresa(null);
  };

  if (loading) {
    return (
      <div
        className="w-full flex items-center justify-center bg-surface-elevated rounded-lg shadow-lg border border-stroke"
        style={{ height: responsiveHeight }}
      >
        <span className="text-text-muted font-miles">Cargando carrusel de empresas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full flex items-center justify-center bg-surface-elevated rounded-lg shadow-lg border border-stroke"
        style={{ height: responsiveHeight }}
      >
        <span className="text-red-600 font-miles text-center px-4">{error}</span>
      </div>
    );
  }

  if (!imagenesDistribuidas.some((fila) => fila.length > 0)) {
    return (
      <div
        className="w-full flex items-center justify-center bg-surface-elevated rounded-lg shadow-lg border border-stroke"
        style={{ height: responsiveHeight }}
      >
        <span className="text-text-muted font-miles text-center px-4">No hay empresas para mostrar en este momento.</span>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden relative bg-surface-elevated rounded-lg shadow-lg border border-stroke"
      style={{ height: responsiveHeight, position: 'relative' }}
    >
      {imagenesDistribuidas.map((fila, i) => (
        <div
          key={i}
          className="flex whitespace-nowrap absolute w-full"
          style={{
            top: `${(100 / filas) * i}%`,
            height: `${100 / filas}%`,
            animation: `${i % 2 === 0 ? 'moverIzquierda' : 'moverDerecha'} 30s linear infinite`
          }}
        >
          {fila.concat(fila).map((empresa, idx) => (
            <div
              key={`${i}-${idx}`}
              className="flex justify-center items-center overflow-hidden p-2 md:p-4"
              style={{
                height: '100%',
                flex: '0 0 auto',
                aspectRatio: '16 / 9',
                maxHeight: '100%',
              }}
              onClick={() => handleEmpresaClick(empresa.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleEmpresaClick(empresa.id);
                }
              }}
            >
              <div className="relative w-full h-full rounded-lg border border-stroke shadow-md overflow-hidden bg-white flex items-center justify-center">
                {empresa.imagen ? (
                  <img
                    src={empresa.imagen}
                    alt={`Imagen de ${empresa.nombre}`}
                    loading="lazy"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-surface flex items-center justify-center border border-stroke rounded-lg">
                    <span className="font-miles text-text-muted text-xs md:text-sm">Sin imagen</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm md:text-base font-miles font-semibold text-center px-4">
                  {empresa.nombre}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <style>{`
        @keyframes moverIzquierda {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes moverDerecha {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal} // Add this line
          >
            <div className="relative w-full max-w-3xl h-[90vh] bg-surface-elevated rounded-lg overflow-hidden"
                 onClick={(e) => e.stopPropagation()} // Add this line
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

              {!modalError && selectedEmpresa && !modalLoading && (
                <EmpresaModal empresa={selectedEmpresa} onClose={handleCloseModal} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarruselImagenes;
