import React from 'react';

const FichaExpandida = ({ empresa, onClose }) => {
  if (!empresa) return null;

  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';
  const imageUrl = `${CLOUDINARY_BASE_URL}/${empresa.url}`;
  const rubro = empresa.rubros?.[0]?.nombre_rubro || 'Sin rubro';
  const fundacion = empresa.fecha_fundacion ? new Date(empresa.fecha_fundacion).toLocaleDateString() : '';
  const cierre = empresa.fecha_cierre ? new Date(empresa.fecha_cierre).toLocaleDateString() : '';

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white w-[90vw] h-[80vh] rounded-xl overflow-hidden flex shadow-2xl relative">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-white bg-black/60 rounded-full px-3 py-1 hover:bg-red-600 transition"
        >
          X
        </button>

        {/* Mitad izquierda: Imagen */}
        <div className="w-1/2 h-full bg-black">
          <img
            src={imageUrl}
            alt={empresa.denominacion_social}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mitad derecha: Info */}
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">{empresa.denominacion_social}</h2>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span><strong>Rubro:</strong> {rubro}</span>
            <span><strong>Fundación:</strong> {fundacion}</span>
            <span><strong>Cierre:</strong> {cierre || '-'}</span>
          </div>

          {/* Propietarios */}
          <h4 className="text-lg font-semibold mt-4 mb-2">Propietarios:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {empresa.propietarios?.map((p, idx) => {
              const nombreCompleto = [p.nombre, p.apellido_paterno, p.apellido_materno].filter(Boolean).join(' ');
              return <li key={idx}>{nombreCompleto}</li>;
            })}
            {(!empresa.propietarios || empresa.propietarios.length === 0) && (
              <li className="italic text-gray-500">Sin propietarios registrados</li>
            )}
          </ul>

          <h4 className="text-lg font-semibold mt-6 mb-2">Eslogan:</h4>
          <p className="italic text-gray-700">{empresa.eslogan || '—'}</p>

          <h4 className="text-lg font-semibold mt-6 mb-2">Descripción:</h4>
          <p className="text-gray-800 whitespace-pre-wrap">{empresa.descripcion || 'Sin descripción disponible.'}</p>
        </div>
      </div>
    </div>
  );
};

export default FichaExpandida;
