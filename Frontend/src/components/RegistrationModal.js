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
        const anioImpacto = parseInt(data.impactInitiativeYear, 10);
        
        return {
            // AQUÍ ESTÁ LA MAGIA: Usamos las llaves exactas del DTO original
            nombre: data.companyName || '',
            fechaFundacion: data.foundationDate || '', 
            vision: data.vision || '',
            mision: data.mission || '',
            direccionWeb: data.website || '',
            actividad: data.mainActivity || '',
            mensajeConmemorativo: data.commemorativeMessage || '',
            tamanioEmpresa: data.companySizeId ? parseInt(data.companySizeId, 10) : 1,
            
            // Arrays obligatorios
            fundadores: (data.founders || []).map(f => f.name),
            servicios: (data.mainServices || []).map(s => s.name),
            items: (data.mainProducts || []).map(p => p.name),
            imagenes: [],
            
            // Relaciones complejas
            familia: {
                esFamiliar: data.isFamilyOwned,
                anio: !data.isFamilyOwned && data.familyStatusChangeYear ? parseInt(data.familyStatusChangeYear, 10) : (data.foundationDate ? new Date(data.foundationDate).getFullYear() : 0)
            },
            rubros: {
                idRubros: data.currentSector && data.currentSector !== 'OTRO' ? [{ id: parseInt(data.currentSector, 10), esActivo: true }] : [],
                rubrosNuevos: data.currentSector === 'OTRO' && data.currentSectorOther ? [{ nombre: data.currentSectorOther, esActivo: true }] : []
            },
            tiposSocietarios: {
                tiposSocietarios: data.currentCorporateType ? [{ id: parseInt(data.currentCorporateType, 10), esActivo: true, fechaCambio: data.corporateTypeChangeDate || null }] : [],
                tiposSocietariosNuevos: []
            },
            sedes: (data.departments || []).map(deptName => ({
                idDepartamento: catalogData.departments.find(d => d.nombre === deptName)?.id,
                esSedePrincipal: data.headquarters === deptName
            })).filter(s => s.idDepartamento),
            municipios: (data.municipalities || []).map(muniName => catalogData.municipalities.find(m => m.nombreMunicipio === muniName)?.id).filter(id => id !== undefined),
            paisesOperaInternacionalmente: data.hasInternationalOperations ? (data.internationalOperationsCountries || []) : [],
            reconocimientos: [],
            hitos: (data.milestones || []).map(m => ({ nombre: m.name, descripcion: m.description, fecha: m.startDate || null })),
            ...(data.impactInitiative !== 'none' && {
                implementacion: {
                    anio: isNaN(anioImpacto) ? new Date().getFullYear() : anioImpacto,
                    tiposAccion: [],
                    acciones: []
                }
            })
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const apiPayload = transformDataForApi(formData);
            // Mandamos el JSON puro, igual que el código original que sí funcionaba
            await apiClient.post('/api/formulario', apiPayload);
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al registrar los datos. Revise su conexión.');
        } finally {
            setIsSubmitting(false);
        }
    };
    const renderStepContent = () => {
        switch (step) {
            case 1: 
                return (
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
                    </div> 
                </div>
            );
            case 2: 
                return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Perfil de Negocio</h3>
                    <FormSelect label="Rubro Actual" name="currentSector" value={formData.currentSector} onChange={handleFormChange}>
                        <option value="" disabled>Seleccione un rubro</option>
                        {catalogData.sectors.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                        <option value="OTRO">Otro (especificar)</option>
                    </FormSelect>
                    {formData.currentSector === 'OTRO' && (
                        <FormInput label="Especifique su rubro" name="currentSectorOther" value={formData.currentSectorOther} onChange={handleFormChange} />
                    )}
                    <FormSelect label="Tipo Societario Actual" name="currentCorporateType" value={formData.currentCorporateType} onChange={handleFormChange}>
                        <option value="" disabled>Seleccione un tipo</option>
                        {catalogData.corporateTypes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                    </FormSelect>
                    <DynamicListInput label="Principales Productos" placeholder="Producto" list={formData.mainProducts} setList={l => setFormData(p => ({...p, mainProducts: l}))} maxItems={5} />
                    <DynamicListInput label="Principales Servicios" placeholder="Servicio" list={formData.mainServices} setList={l => setFormData(p => ({...p, mainServices: l}))} maxItems={5} />
                </div>
            );
            case 3: 
                return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Visión y Misión</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Visión</label>
                        <textarea name="vision" rows="3" value={formData.vision} onChange={handleFormChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Misión</label>
                        <textarea name="mission" rows="3" value={formData.mission} onChange={handleFormChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <FormInput label="Dirección Web" name="website" type="url" value={formData.website} onChange={handleFormChange} placeholder="https://www..." />
                </div>
            );
            case 4: 
                return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Alcance Operativo</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Departamentos donde opera</label>
                        <div className="grid grid-cols-2 gap-2">
                            {catalogData.departments.map(dept => (
                                <label key={dept.id} className="flex items-center space-x-2">
                                    <input type="checkbox" checked={(formData.departments || []).includes(dept.nombre)} onChange={(e) => {
                                        const newDepts = e.target.checked 
                                            ? [...(formData.departments || []), dept.nombre]
                                            : (formData.departments || []).filter(d => d !== dept.nombre);
                                        setFormData(p => ({...p, departments: newDepts}));
                                    }} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                                    <span className="text-sm text-slate-700">{dept.nombre}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {(formData.departments || []).length > 0 && (
                        <div className="pt-4 border-t border-slate-200">
                            <label className="block text-sm font-medium text-slate-500 mb-2">Sede Central (Seleccione una)</label>
                            <div className="grid grid-cols-2 gap-2">
                                {formData.departments.map(dept => (
                                    <label key={dept} className="flex items-center space-x-2">
                                        <input type="radio" name="headquarters" value={dept} checked={formData.headquarters === dept} onChange={handleFormChange} className="text-blue-600 focus:ring-blue-500 w-4 h-4" />
                                        <span className="text-sm text-slate-700">{dept}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
            case 5: 
                return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Legado e Hitos</h3>
                    <button type="button" onClick={() => setFormData(p => ({...p, milestones: [...p.milestones, {id: Date.now(), name: '', description: '', startDate: ''}]}))} className="text-sm bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-md hover:bg-blue-200 transition-colors">
                        + Añadir Hito Histórico
                    </button>
                    {formData.milestones.map(m => (
                        <div key={m.id} className="p-4 border border-slate-200 bg-white rounded-md relative space-y-3">
                            <button type="button" onClick={() => setFormData(p => ({...p, milestones: p.milestones.filter(x => x.id !== m.id)}))} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded">✕</button>
                            <FormInput label="Nombre del Hito" value={m.name} onChange={(e) => setFormData(p => ({...p, milestones: p.milestones.map(x => x.id === m.id ? {...x, name: e.target.value} : x)}))} />
                            <FormInput label="Fecha" type="date" value={m.startDate} onChange={(e) => setFormData(p => ({...p, milestones: p.milestones.map(x => x.id === m.id ? {...x, startDate: e.target.value} : x)}))} />
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Descripción</label>
                                <textarea value={m.description} onChange={(e) => setFormData(p => ({...p, milestones: p.milestones.map(x => x.id === m.id ? {...x, description: e.target.value} : x)}))} rows="2" className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    ))}
                </div>
            );
            case 6: 
                return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Impacto Social</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">¿Implementa acciones de RSE o Sostenibilidad?</label>
                        <div className="flex flex-col space-y-3 bg-white p-4 border border-slate-200 rounded-md">
                            {['none', 'social', 'sustainability', 'both'].map(val => (
                                <label key={val} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="impactInitiative" value={val} checked={formData.impactInitiative === val} onChange={handleFormChange} className="w-4 h-4 text-blue-600" />
                                    <span className="text-slate-700">{val === 'none' ? 'Ninguna' : val === 'social' ? 'Responsabilidad Social' : val === 'sustainability' ? 'Sostenibilidad' : 'Ambas'}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {formData.impactInitiative !== 'none' && (
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-slate-500 mb-2">Seleccione Objetivos de Desarrollo Sostenible (ODS)</label>
                            <div className="max-h-48 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-md border border-slate-200">
                                {catalogData.acciones.map(acc => (
                                    <label key={acc.id_accion} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" checked={(formData.selectedSdgs || []).includes(acc.id_accion)} onChange={(e) => {
                                            const newSdgs = e.target.checked 
                                                ? [...(formData.selectedSdgs || []), acc.id_accion]
                                                : (formData.selectedSdgs || []).filter(id => id !== acc.id_accion);
                                            setFormData(p => ({...p, selectedSdgs: newSdgs}));
                                        }} className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-slate-700">{acc.nombre}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
            case 7: 
                return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Archivos y Mensaje Final</h3>
                    <div className="bg-white p-4 border border-slate-200 rounded-md">
                        <label className="block text-sm font-medium text-slate-500 mb-2">Logo / Imágenes (Opcional)</label>
                        <input type="file" multiple className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" onChange={(e) => setFormData(p => ({...p, files: Array.from(e.target.files)}))} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Mensaje Conmemorativo</label>
                        <textarea name="commemorativeMessage" rows="4" value={formData.commemorativeMessage} onChange={handleFormChange} className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Escriba un mensaje sobre el legado de su empresa..." />
                    </div>
                </div>
            );
            default:
                return null;
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