// src/components/EmpresaBuscador.js
import React from 'react';
const EmpresaBuscador = ({ busqueda, onBusquedaChange, vistaGrid, onVistaToggle }) => {
    // Icoonos SVG para alternar vistas (Grid y Lista)
    const ListIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
    );

    const GridIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    );

    return (
        // Contenedor que agrupa el botón de vista y el buscador
        <div className="mb-4 flex items-center gap-2 flex-shrink-0">
            {/* CAMPO DE BÚSQUEDA */}
            <input
                type="text"
                placeholder="Buscar por nombre, rubro o departamento..."
                value={busqueda}
                onChange={onBusquedaChange}
                className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
            {/* BOTÓN DE CAMBIO DE VISTA */}
            <button
                onClick={onVistaToggle}
                className="p-2 rounded-full bg-primary text-surface hover:bg-primary/90 transition-colors"
                title={vistaGrid ? "Cambiar a vista de lista" : "Cambiar a vista de cuadrícula"}
            >
                
                {vistaGrid ? (
                    <ListIcon className="h-6 w-6" />
                ) : (
                    <GridIcon className="h-6 w-6" />
                )}
            </button>
        </div>
    );
};

export default EmpresaBuscador;