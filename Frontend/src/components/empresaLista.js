// src/components/EmpresaLista.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmpresaCard from './empresaCard'; 
import LoadingSpinner from './LoadingSpinner';

const EmpresaLista = ({ empresas, loading, error, vistaGrid, onCardClick, loggedInUser, onEdit, onDelete }) => {
    const gridContainerClass = vistaGrid 
        ? "grid grid-cols-1 sm:grid-cols-2 gap-4" 
        : "grid gap-4"; 

    if (loading) return <LoadingSpinner text="Cargando empresas..." />;

    if (error) {
        return (
            <div className="text-center p-8 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="flex-grow overflow-y-auto pr-2 z-0" style={{ padding: '10px' }}>
            <div className={gridContainerClass}>
                <AnimatePresence>
                    {empresas.length > 0 ? (
                        empresas.map((e) => (
                            <EmpresaCard 
                                key={e.id} 
                                empresa={e} 
                                onClick={onCardClick}
                                isGrid={vistaGrid}
                                // Pasamos el usuario y las funciones para que la Card decida si mostrar botones
                                loggedInUser={loggedInUser}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <motion.div
                            className="p-8 text-center text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            No se encontraron empresas para esta búsqueda o departamento.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EmpresaLista;