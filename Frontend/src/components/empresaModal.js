import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const ModalTimeline = ({ hitos = [] }) => {
    // Si no hay hitos, no renderizamos la línea.
    if (hitos.length === 0) return null;

    return (
        <div className="relative w-full px-8 pt-6 pb-2 mt-4 flex items-center justify-between flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Hitos de la Empresa</h3>
            
            {/* Contenedor de la línea y los puntos */}
            <div className="relative w-full h-12">
                {/* Línea Azul de Base */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#0f2c4a] rounded-full transform -translate-y-1/2"></div>

                {/* Círculos de Hitos */}
                {hitos.map((hito, index) => {
                    // Distribuye los puntos uniformemente a lo largo de la línea.
                    const positionPercentage = (index + 1) / (hitos.length + 1) * 100;
                    
                    // Tamaño del círculo (w-3 h-3) es 12px. Por lo tanto, el centrado es -6px.
                    const circleSize = 12; // 0.75rem en Tailwind
                    const centeringOffset = circleSize / 2; // 6px

                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 transform -translate-y-1/2"
                            style={{ 
                                left: `calc(${positionPercentage}% - ${centeringOffset}px)`
                            }}
                            // Utilizamos el div principal como el punto, replicando el estilo de la tarjeta.
                        >
                            <div
                                className="w-3 h-3 bg-white border-2 border-text-muted rounded-full shadow cursor-pointer hover:scale-150 transition-transform duration-200 relative group"
                            >
                                {/* Etiqueta del hito (Se muestra arriba del círculo al hacer hover) */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-primary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-30">
                                    {hito.nombre} ({hito.fecha})
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Leyenda de Fechas: Opcional, pero útil para visualizar la progresión */}
            <div className="w-full flex justify-between px-2 text-sm text-gray-500 mt-2">
                {/* Etiqueta de Fundación fuera del loop si es una fecha fija (como la fundación) */}
                <span className='font-semibold'>Fundación</span>
                {hitos.map((hito, index) => (
                    <span 
                        key={`legend-${index}`}
                        className='text-center'
                        style={{ width: `${100 / (hitos.length + 1)}%` }} // Distribución para alinear con los puntos
                    >
                        {hito.fecha}
                    </span>
                ))}
            </div>
        </div>
    );
};

// --- Componente principal del Modal ---
const toCommaList = (items = []) => (Array.isArray(items) && items.length ? items.join(', ') : '');

const EMPTY_EMPRESA = Object.freeze({
    nombre: '',
    rubro: '',
    slogan: '',
    descripcion: '',
    actividad: '',
    direccionWeb: '',
    imagen: '',
    departamento: '',
    tamanio: '',
    servicios: [],
    items: [],
    tiposSocietarios: [],
    municipios: [],
    fundadores: [],
    sedes: [],
    hitos: [],
});

const EmpresaModal = ({ empresa, onClose, canEdit = false, onSave, saving = false }) => {
    const currentEmpresa = empresa ?? EMPTY_EMPRESA;

    useEffect(() => {
        if (empresa) {
            console.log('[EmpresaModal] render empresa', empresa.id);
        }
    }, [empresa]);

    const {
        nombre = '',
        rubro = '',
        slogan = '',
        descripcion = '',
        actividad = '',
        direccionWeb = '',
        imagen = '',
        departamento = '',
        tamanio = '',
        servicios: serviciosList = [],
        items: itemsList = [],
        tiposSocietarios: tiposSocietariosList = [],
        municipios: municipiosList = [],
        fundadores: fundadoresList = [],
        sedes = [],
        hitos: empresaHitos = [],
    } = currentEmpresa;

    const initialFormState = useMemo(() => ({
        slogan: slogan || '',
        descripcion: descripcion || '',
        actividad: actividad || '',
        direccionWeb: direccionWeb || '',
        servicios: toCommaList(serviciosList),
        items: toCommaList(itemsList),
        tiposSocietarios: toCommaList(tiposSocietariosList),
        fundadores: toCommaList(fundadoresList),
        municipios: toCommaList(municipiosList),
    }), [slogan, descripcion, actividad, direccionWeb, serviciosList, itemsList, tiposSocietariosList, fundadoresList, municipiosList]);

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [feedback, setFeedback] = useState(null);
    const [feedbackType, setFeedbackType] = useState('success');

    useEffect(() => {
        setEditMode(false);
        setFormData(initialFormState);
        setFeedback(null);
    }, [initialFormState]);

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const parseList = (value = '') =>
        value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

    const handleSave = async () => {
        if (!onSave) return;

        setFeedback(null);

        const payload = {
            vision: formData.slogan?.trim() || null,
            mensaje: formData.descripcion?.trim() || null,
            actividad: formData.actividad?.trim() || null,
            direccionWeb: formData.direccionWeb?.trim() || null,
            servicios: parseList(formData.servicios),
            items: parseList(formData.items),
            tiposSocietarios: parseList(formData.tiposSocietarios),
            fundadores: parseList(formData.fundadores),
            municipios: parseList(formData.municipios),
        };

        try {
            await onSave(payload);
            setFeedbackType('success');
            setFeedback('Cambios guardados correctamente.');
            setEditMode(false);
        } catch (error) {
            const backendMessage = error?.response?.data?.message;
            const message = Array.isArray(backendMessage)
                ? backendMessage.join(', ')
                : backendMessage || error.message || 'No fue posible guardar los cambios.';
            setFeedbackType('error');
            setFeedback(message);
        }
    };

    if (!empresa) {
        return null;
    }

    return (
        <motion.div
            className="absolute inset-0 bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-start overflow-y-auto z-10" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* Botón de Cerrar */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-primary text-detail hover:bg-primary/90 transition-colors z-20 p-2 rounded-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {canEdit && (
                <div className="absolute top-4 left-4 flex gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setEditMode((prev) => !prev);
                            setFeedback(null);
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary/90 transition"
                        disabled={saving}
                    >
                        {editMode ? 'Cancelar edición' : 'Editar'}
                    </button>
                    {editMode && (
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
                            disabled={saving}
                        >
                            {saving ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    )}
                </div>
            )}
            
            {/* Contenido del Modal (Scrollable) */}
            <div className="w-full max-w-lg mx-auto flex flex-col items-center">
                {/* Cabecera */}
                <div className="text-center mb-6 pt-4">
                    <h2 className="text-3xl font-bold text-gray-900">{nombre}</h2>
                    <p className="text-lg text-gray-600">{rubro}</p>
                    <p className="text-sm text-gray-500 italic">"{slogan}"</p>
                </div>
                
                {/* Imagen/Logo */}
                <div className="w-full flex-shrink-0 mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <img
                        src={imagen}
                        alt={`Logo de ${nombre}`}
                        className="w-full h-48 object-contain bg-gray-50"
                    />
                </div>
                
                {/* Descripción y Detalles */}
                <div className="w-full text-gray-700 mb-6">
                    {editMode ? (
                        <form className="w-full flex flex-col gap-4 text-left">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Descripción</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                    rows={4}
                                    value={formData.descripcion}
                                    onChange={(e) => handleFieldChange('descripcion', e.target.value)}
                                    disabled={saving}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Slogan</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        value={formData.slogan}
                                        onChange={(e) => handleFieldChange('slogan', e.target.value)}
                                        disabled={saving}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Sitio web</label>
                                    <input
                                        type="url"
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        value={formData.direccionWeb}
                                        onChange={(e) => handleFieldChange('direccionWeb', e.target.value)}
                                        placeholder="https://empresa.com"
                                        disabled={saving}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Actividad</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                    rows={3}
                                    value={formData.actividad}
                                    onChange={(e) => handleFieldChange('actividad', e.target.value)}
                                    disabled={saving}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Servicios (separados por coma)</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                    rows={2}
                                    value={formData.servicios}
                                    onChange={(e) => handleFieldChange('servicios', e.target.value)}
                                    disabled={saving}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Productos / Items (coma)</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                        rows={2}
                                        value={formData.items}
                                        onChange={(e) => handleFieldChange('items', e.target.value)}
                                        disabled={saving}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Tipos societarios (coma)</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                        rows={2}
                                        value={formData.tiposSocietarios}
                                        onChange={(e) => handleFieldChange('tiposSocietarios', e.target.value)}
                                        disabled={saving}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Fundadores (coma)</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                        rows={2}
                                        value={formData.fundadores}
                                        onChange={(e) => handleFieldChange('fundadores', e.target.value)}
                                        disabled={saving}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-1">Municipios (coma)</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-3 text-sm"
                                        rows={2}
                                        value={formData.municipios}
                                        onChange={(e) => handleFieldChange('municipios', e.target.value)}
                                        disabled={saving}
                                    />
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-base mb-4 italic px-4">{descripcion}</p>
                            <p className="text-sm border-t pt-2">
                                <span className="font-semibold">Departamento principal:</span> {departamento}
                            </p>
                            {tamanio && (
                                <p className="text-sm">
                                    <span className="font-semibold">Tamaño de empresa:</span> {tamanio}
                                </p>
                            )}
                            {actividad && (
                                <p className="text-sm">
                                    <span className="font-semibold">Actividad:</span> {actividad}
                                </p>
                            )}
                            {direccionWeb && (
                                <p className="text-sm">
                                    <span className="font-semibold">Sitio web:</span>{' '}
                                    <a href={direccionWeb} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                        {direccionWeb}
                                    </a>
                                </p>
                            )}
                            {serviciosList.length > 0 && (
                                <p className="text-sm">
                                    <span className="font-semibold">Servicios:</span> {serviciosList.join(', ')}
                                </p>
                            )}
                            {itemsList.length > 0 && (
                                <p className="text-sm">
                                    <span className="font-semibold">Productos / Items:</span> {itemsList.join(', ')}
                                </p>
                            )}
                            {tiposSocietariosList.length > 0 && (
                                <p className="text-sm">
                                    <span className="font-semibold">Tipos societarios:</span> {tiposSocietariosList.join(', ')}
                                </p>
                            )}
                            {municipiosList.length > 0 && (
                                <p className="text-sm">
                                    <span className="font-semibold">Municipios en los que opera:</span> {municipiosList.join(', ')}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {feedback && (
                    <div
                        className={`w-full mb-4 text-sm font-semibold px-4 py-2 rounded-md text-center ${feedbackType === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}
                    >
                        {feedback}
                    </div>
                )}

                {sedes.length > 0 && (
                    <div className="w-full mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-t pt-4 mt-2">Sedes registradas</h3>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                            {sedes.map((sede) => (
                                <li key={sede.id || `${sede.departamento}-${sede.esCentral}`}> 
                                    {sede.departamento || 'Departamento no especificado'} {sede.esCentral ? '(Central)' : ''}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {fundadoresList.length > 0 && (
                    <div className="w-full mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-t pt-4 mt-2">Fundadores</h3>
                        <p className="text-sm text-gray-600">{fundadoresList.join(', ')}</p>
                    </div>
                )}

                {/* LÍNEA DE TIEMPO DE HITOS */}
                <ModalTimeline hitos={empresaHitos} />

            </div>
        </motion.div>
    );
};

export default EmpresaModal;