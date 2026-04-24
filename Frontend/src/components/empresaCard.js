// src/components/EmpresaCard.js
import React from 'react';
import { motion } from 'framer-motion';

// Componente auxiliar para la línea de tiempo de hitos
const CardTimeline = ({ hitos = [] }) => {

    return (
        // Contenedor principal de la línea de tiempo. Altura fija y paddings.
        <div className="relative w-full h-4 px-4 pb-1 pt-1 flex items-center justify-between">
            
            {/* Línea Azul de Base */}
            <div className="absolute inset-x-0 mx-4 h-1 bg-[#0f2c4a] rounded-full"></div>

            {/* Círculos de Hitos (si existen) */}
            {hitos.length > 0 && hitos.map((hito, index) => {
                // Aquí calculamos la posición horizontal del hito.
                // Usamos (index + 1) / (total_hitos + 1) para distribuir uniformemente los puntos
                const positionPercentage = (index + 1) / (hitos.length + 1) * 100;

                return (
                    <div
                        key={index}
                        className="absolute w-3 h-3 bg-white border-2 border-text-muted rounded-full shadow cursor-pointer hover:scale-125 transition-transform duration-200"
                        style={{
                            // Usamos el left calculado para posicionar el círculo sobre la línea.
                            left: `calc(${positionPercentage}% - 6px)`, // Restamos la mitad del tamaño del círculo (6px) para centrarlo.
                        }}
                        title={hito.nombre || `Hito ${index + 1}`}
                    />
                );
            })}
        </div>
    );
};

// Componente principal de la tarjeta (ahora con un nuevo bloque CardTimeline)
const EmpresaCard = ({ empresa, onClick, isGrid }) => {
    // Clases condicionales (sin cambios)
    const cardLayoutClasses = isGrid 
        ? "flex-col" // Vista Grid: logo arriba, texto abajo
        : "flex-col sm:flex-row"; // Vista Lista: logo a la izquierda, texto a la derecha (en pantallas sm+)

    const imageContainerClasses = isGrid
        ? "h-32 w-full flex-shrink-0" // Vista Grid: Imagen grande arriba
        : "h-32 w-full sm:w-48 flex-shrink-0"; // Vista Lista: Imagen más pequeña a la izquierda

    const empresaHitos = empresa.hitos || []; 

    return (
        <motion.div
            className={`relative bg-white rounded-tl-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex ${cardLayoutClasses} ${empresaHitos.length > 0 ? 'pb-8' : 'pb-0'}`}
            //Se añade 'pb-8' (padding-bottom) si hay hitos para dar espacio a la línea
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onClick(empresa)}
        >
            {/* Contenedor de la Imagen */}
            <div className={`relative ${imageContainerClasses} rounded-tl-lg overflow-hidden`}>
                <img
                    src={empresa.imagen}
                    alt={`Logo de ${empresa.nombre}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-tl-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-lg font-bold text-center p-2">
                        {empresa.nombre}
                    </h3>
                </div>
            </div>
            
            {/* Contenido de la Tarjeta (flex-grow para ocupar el espacio restante) */}
            <div className="p-4 flex-grow">
                <p className="text-sm text-gray-600">{empresa.rubro || 'Rubro no especificado'}</p>
                <p className="text-sm text-gray-500">{empresa.departamento || 'Departamento no disponible'}</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                 <CardTimeline hitos={empresaHitos} />
            </div>
        </motion.div>
    );
};

export default EmpresaCard;