import React, { useState, useCallback, useEffect } from 'react';
import { 
  BuildingOfficeIcon, UserIcon, EyeIcon, GlobeAltIcon, PencilIcon, 
  HeartIcon, DocumentIcon, XMarkIcon, PlusIcon, TrashIcon 
} from '@heroicons/react/24/outline';
import apiClient from '../services/api';
import clsx from 'clsx';

const initialFormData = {
    companyName: '', foundationDate: '', founders: [], companySizeId: '',
    currentSector: '', currentSectorOther: '', hasChangedSector: false, sectorHistory: [],
    isFamilyOwned: true, familyStatusChangeYear: '', currentCorporateType: '', hasChangedCorporateType: false,
    corporateTypeChangeDate: '', hasInternationalOperations: false, internationalOperationsCountries: [],
    mainActivity: '', mainProducts: [], mainServices: [], vision: '', mission: '', website: '',
    departments: [], headquarters: '', municipalities: [], milestones: [], awards: [], distinctions: [],
    impactInitiative: 'none', impactInitiativeYear: '', selectedSdgs: [], sdgProjects: {},
    files: [], commemorativeMessage: '',
};

const FormInput = ({ label, id, maxLength, value, ...props }) => {
    const length = typeof value === 'string' ? value.length : 0;
    const percent = maxLength ? Math.min(100, Math.round((length / maxLength) * 100)) : 0;
    const warn = maxLength ? length >= Math.floor(maxLength * 0.85) : false;
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-500 mb-1">{label}</label>
            <input id={id} maxLength={maxLength} value={value} {...props} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            {typeof maxLength === 'number' && (
                <div className="mt-1">
                    <div className={clsx('h-1 rounded bg-slate-200', warn && 'bg-slate-300')}> 
                        <div className={clsx('h-1 rounded bg-blue-600 transition-all', warn && 'bg-amber-500')} style={{ width: `${percent}%` }} />
                    </div>
                    <div className={clsx('text-xs mt-1 text-slate-500 flex justify-end', warn && 'text-amber-600')}>{length} / {maxLength} caracteres</div>
                </div>
            )}
        </div>
    );
};

const FormSelect = ({ label, id, children, ...props }) => ( 
    <div> 
        <label htmlFor={id} className="block text-sm font-medium text-slate-500 mb-1">{label}</label> 
        <select id={id} {...props} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"> 
            {children} 
        </select> 
    </div> 
);

const steps = [
    { num: 1, title: 'Identidad', icon: <BuildingOfficeIcon className="w-5 h-5"/> }, 
    { num: 2, title: 'Perfil', icon: <UserIcon className="w-5 h-5"/> }, 
    { num: 3, title: 'Visión', icon: <EyeIcon className="w-5 h-5"/> }, 
    { num: 4, title: 'Alcance', icon: <GlobeAltIcon className="w-5 h-5"/> }, 
    { num: 5, title: 'Legado', icon: <PencilIcon className="w-5 h-5"/> }, 
    { num: 6, title: 'Impacto', icon: <HeartIcon className="w-5 h-5"/> }, 
    { num: 7, title: 'Archivos', icon: <DocumentIcon className="w-5 h-5"/> },
];

const ProgressBar = ({ currentStep }) => ( 
    <div className="w-full px-4 sm:px-10 mb-8"> 
        <div className="overflow-x-auto pb-2 scrollbar-hide"> 
            <div className="flex items-center min-w-max"> 
                {steps.map(({ num, title, icon }, index) => ( 
                    <React.Fragment key={num}> 
                        <div className="flex flex-col items-center"> 
                            <div className={clsx( 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 font-semibold', { 'bg-blue-800 text-white border-blue-800': currentStep >= num, 'bg-white text-slate-400 border-slate-300': currentStep < num, } )}> 
                                {icon} 
                            </div> 
                            <p className={clsx( 'mt-2 text-xs text-center font-medium whitespace-nowrap', { 'text-blue-800': currentStep >= num, 'text-slate-500': currentStep < num, } )}>{title}</p> 
                        </div> 
                        {index < steps.length - 1 && ( 
                            <div className={clsx( 'flex-1 h-0.5 mx-2 sm:mx-4 transition-colors', { 'bg-blue-800': currentStep > num, 'bg-slate-200': currentStep <= num, } )}></div> 
                        )} 
                    </React.Fragment> 
                ))} 
            </div> 
        </div> 
    </div> 
);

const DynamicListInput = ({ label, placeholder, list, setList, maxItems, maxLength }) => {
    const handleAdd = () => { if (maxItems && list.length >= maxItems) return; setList([{ id: Date.now(), name: '' }, ...list]); };
    const handleRemove = (id) => setList(list.filter(item => item.id !== id));
    const handleChange = (id, value) => setList(list.map(item => item.id === id ? { ...item, name: value } : item));
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-slate-500">{label} {maxItems && `(Máx. ${maxItems})`}</label>
                <button type="button" onClick={handleAdd} disabled={!!(maxItems && list.length >= maxItems)} className="flex items-center space-x-1 text-sm bg-blue-100 text-blue-700 font-bold py-1 px-2 rounded-md hover:bg-blue-200 disabled:opacity-50"><PlusIcon className="w-4 h-4"/> <span>Agregar</span></button>
            </div>
            {list.map(item => {
                const limit = maxLength || undefined;
                return (
                    <div key={item.id} className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <input type="text" placeholder={placeholder} value={item.name} maxLength={limit} onChange={e => handleChange(item.id, e.target.value)} className="flex-grow bg-white border border-slate-300 rounded-md py-2 px-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                            <button type="button" onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-opacity-80 p-1"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const RegistrationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [catalogData, setCatalogData] = useState({ companySizes: [], sectors: [], corporateTypes: [], departments: [], countries: [], municipalities: [], acciones: [] });

    useEffect(() => { 
        if (isOpen) { 
            const fetchCatalogs = async () => { 
                try { 
                    setError(null); 
                    const [sizesRes, sectorsRes, corpTypesRes, deptsRes, countriesRes, municipiosRes, accionesRes] = await Promise.all([ 
                        apiClient.get('/api/tamanios-empresas'), 
                        apiClient.get('/api/rubros'), 
                        apiClient.get('/api/tipos-societarios'), 
                        apiClient.get('/api/departamentos'), 
                        apiClient.get('/api/paises'), 
                        apiClient.get('/api/municipios'), 
                        apiClient.get('/api/acciones')
                    ]); 
                    setCatalogData({ 
                        companySizes: sizesRes.data.tamaniosEmpresas || [], 
                        sectors: sectorsRes.data.rubros || [], 
                        corporateTypes: corpTypesRes.data.tiposSocietarios || [], 
                        departments: deptsRes.data.departamentos || [], 
                        countries: countriesRes.data.paises || [], 
                        municipalities: municipiosRes.data.municipios || [], 
                        acciones: accionesRes.data.acciones || []
                    }); 
                } catch (err) { 
                    console.error("Error al cargar los catálogos", err); 
                } 
            }; 
            fetchCatalogs(); 
        } 
    }, [isOpen]);

    const handleClose = useCallback(() => { 
        onClose(); 
        setTimeout(() => { 
            setStep(1); setIsSubmitted(false); setFormData(initialFormData); setError(null); 
        }, 300); 
    }, [onClose]);

    const handleFormChange = (e) => { 
        const { name, value, type, checked } = e.target; 
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); 
    };

    const transformDataForApi = (data) => {
        return {
            empresa: {
                nombre_comercial: data.companyName || '',
                fecha_fundacion: data.foundationDate || '1900-01-01',
                vision: data.vision || '',
                mision: data.mission || '',
                direccion_web: data.website || '',
                actividad: data.mainActivity || '',
                mensaje: data.commemorativeMessage || '',
                id_tamanio: data.companySizeId ? parseInt(data.companySizeId, 10) : 1
            },
            fundadores: (data.founders || []).map(f => f.name),
            servicios: (data.mainServices || []).map(s => s.name),
            rubros: [],
            tiposSocietarios: [],
            sedes: [],
            municipios: [],
            imagenes: []
        };
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const apiPayload = transformDataForApi(formData);
            const payloadFinal = new FormData();
            Object.keys(apiPayload.empresa).forEach(key => {
                payloadFinal.append(key, apiPayload.empresa[key]);
            });
            payloadFinal.append('fundadores', JSON.stringify(apiPayload.fundadores));
            payloadFinal.append('servicios', JSON.stringify(apiPayload.servicios));
            payloadFinal.append('rubros', JSON.stringify([]));
            payloadFinal.append('sedes', JSON.stringify([]));
            payloadFinal.append('municipios', JSON.stringify([]));

            await apiClient.post('/api/formulario', payloadFinal);
            setIsSubmitted(true);
        } catch (err) {
            setError('Ocurrió un error al registrar los datos. Revise su conexión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1: return (
                <div className="space-y-4"> 
                    <h3 className="text-lg font-semibold text-slate-800">Identidad de la Empresa</h3> 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                        <div className="md:col-span-2"> 
                            <FormInput label="Nombre Comercial" id="companyName" name="companyName" onChange={handleFormChange} value={formData.companyName} /> 
                        </div> 
                        <div> 
                            <FormInput label="Fecha de Fundación" id="foundationDate" name="foundationDate" type="date" onChange={handleFormChange} value={formData.foundationDate} /> 
                        </div> 
                        <FormSelect label="Tamaño" id="companySizeId" name="companySizeId" value={formData.companySizeId} onChange={handleFormChange}> 
                            <option value="" disabled>Seleccione un tamaño</option> 
                            {catalogData.companySizes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)} 
                        </FormSelect> 
                        <div className="md:col-span-2"> 
                            <DynamicListInput label="Fundadores" placeholder="Nombre del fundador" list={formData.founders} setList={list => setFormData(p => ({ ...p, founders: list }))} /> 
                        </div> 
                    </div> 
                </div>
            );
            case 2: return <div className="space-y-4"><h3 className="text-lg font-semibold">Perfil de Negocio</h3><p className="text-slate-500">Formulario en construcción...</p></div>;
            case 3: return <div className="space-y-4"><h3 className="text-lg font-semibold">Visión y Misión</h3><p className="text-slate-500">Formulario en construcción...</p></div>;
            case 4: return <div className="space-y-4"><h3 className="text-lg font-semibold">Alcance Operativo</h3><p className="text-slate-500">Formulario en construcción...</p></div>;
            case 5: return <div className="space-y-4"><h3 className="text-lg font-semibold">Legado</h3><p className="text-slate-500">Formulario en construcción...</p></div>;
            case 6: return <div className="space-y-4"><h3 className="text-lg font-semibold">Impacto</h3><p className="text-slate-500">Formulario en construcción...</p></div>;
            case 7: return <div className="space-y-4"><h3 className="text-lg font-semibold">Archivos</h3><p className="text-slate-500">Formulario en construcción...</p></div>;
            default: return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <header className="bg-white p-4 flex items-center justify-between border-b rounded-t-lg">
                    <h2 className="text-xl font-bold">Formulario de Registro</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-full"><XMarkIcon className="w-6 h-6"/></button>
                </header>
                {isSubmitted ? (
                    <div className="p-8 text-center flex-grow">
                        <h2 className="text-2xl text-blue-800 mb-4">¡Registro Exitoso!</h2>
                        <button onClick={handleClose} className="bg-blue-800 text-white py-2 px-6 rounded-lg">Cerrar</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
                        <div className="pt-8"><ProgressBar currentStep={step} /></div>
                        <div className="p-8 pt-0 overflow-y-auto flex-grow">
                            {error && <div className="bg-red-100 text-red-600 p-4 mb-4 rounded"><p>{error}</p></div>}
                            {renderStepContent()}
                        </div>
                        <footer className="bg-white p-4 flex justify-between border-t">
                            <button type="button" onClick={() => setStep(s => Math.max(s - 1, 1))} disabled={step === 1} className="border px-4 py-2 rounded-lg disabled:opacity-50">Anterior</button>
                            {step < 7 ? (
                                <button type="button" onClick={() => setStep(s => Math.min(s + 1, 7))} className="bg-blue-800 text-white px-4 py-2 rounded-lg">Siguiente</button>
                            ) : (
                                <button type="submit" disabled={isSubmitting} className="bg-blue-800 text-white px-6 py-2 rounded-lg">{isSubmitting ? 'Enviando...' : 'Guardar'}</button>
                            )}
                        </footer>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;