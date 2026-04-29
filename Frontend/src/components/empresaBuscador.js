// src/components/EmpresaBuscador.js
import React from 'react';

// 1. Recibimos loggedInUser en los props
const EmpresaBuscador = ({ busqueda, onBusquedaChange, vistaGrid, onVistaToggle, loggedInUser }) => {
    
    // 2. Definimos la lógica de permisos: solo OSI (1) y Admin Empresas (3)
    const puedeGestionar = loggedInUser?.idRol === 1 || loggedInUser?.idRol === 3;

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
        <div className="mb-4 flex items-center gap-2 flex-shrink-0">
            <input
                type="text"
                placeholder="Buscar por nombre, rubro o departamento..."
                value={busqueda}
                onChange={onBusquedaChange}
                className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
            <button
                onClick={onVistaToggle}
                className="p-2 rounded-full bg-primary text-surface hover:bg-primary/90 transition-colors"
                title={vistaGrid ? "Cambiar a vista de lista" : "Cambiar a vista de cuadrícula"}
            >
                {vistaGrid ? <ListIcon className="h-6 w-6" /> : <GridIcon className="h-6 w-6" />}
            </button>

            {/* 3. BOTÓN CONDICIONAL: Solo aparece si tiene el rol adecuado */}
            {puedeGestionar && (
                <button
                    onClick={() => {/* Esta lógica la maneja el padre, podrías pasarle una función onAdd */}}
                    className="flex items-center gap-2 bg-[#2C5282] text-white px-4 py-2 rounded-lg hover:bg-[#1A365D] transition-all shadow-md whitespace-nowrap ml-2"
                >
                    <span className="text-xl font-bold">+</span>
                    <span className="hidden sm:inline">Añadir Nueva Empresa</span>
                </button>
            )}
        </div>
    );
};

export default EmpresaBuscador;