import React from 'react';
import { motion } from 'framer-motion';
// Importamos los iconos
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const CardTimeline = ({ hitos = [] }) => {
    return (
        <div className="relative w-full h-4 px-4 pb-1 pt-1 flex items-center justify-between">
            <div className="absolute inset-x-0 mx-4 h-1 bg-[#0f2c4a] rounded-full"></div>
            {hitos.length > 0 && hitos.map((hito, index) => {
                const positionPercentage = (index + 1) / (hitos.length + 1) * 100;
                return (
                    <div
                        key={index}
                        className="absolute w-3 h-3 bg-white border-2 border-text-muted rounded-full shadow cursor-pointer hover:scale-125 transition-transform duration-200"
                        style={{ left: `calc(${positionPercentage}% - 6px)` }}
                        title={hito.nombre || `Hito ${index + 1}`}
                    />
                );
            })}
        </div>
    );
};

const EmpresaCard = ({ empresa, onClick, isGrid, loggedInUser, onEdit, onDelete }) => {
    const cardLayoutClasses = isGrid ? "flex-col" : "flex-col sm:flex-row";
    const imageContainerClasses = isGrid ? "h-32 w-full flex-shrink-0" : "h-32 w-full sm:w-48 flex-shrink-0";
    const empresaHitos = empresa.hitos || []; 

    // --- CORRECCIÓN DE SEGURIDAD ---
    // Solo permitimos gestionar a OSI (1) y Administrador de Empresas (3)
    const puedeGestionar = loggedInUser?.idRol === 1 || loggedInUser?.idRol === 3;

    return (
        <motion.div
            className={`relative bg-white rounded-tl-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex ${cardLayoutClasses} ${empresaHitos.length > 0 ? 'pb-8' : 'pb-0'}`}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onClick(empresa)}
        >
            {/* BOTONES DE GESTIÓN: Solo se renderizan si el rol es autorizado */}
            {puedeGestionar && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(empresa); }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-[#2C5282] hover:bg-blue-50 transition-colors"
                        title="Editar Empresa"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(empresa); }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-red-600 hover:bg-red-50 transition-colors"
                        title="Desactivar Empresa"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            )}

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