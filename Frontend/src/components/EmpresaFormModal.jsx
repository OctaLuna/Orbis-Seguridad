import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const steps = [
  { id: 1, name: 'Identidad' },
  { id: 2, name: 'Perfil' },
  { id: 3, name: 'Visión' },
  { id: 4, name: 'Alcance' },
  { id: 5, name: 'Legado' },
  { id: 6, name: 'Impacto' },
  { id: 7, name: 'Archivos' },
];

const EmpresaFormModal = ({ mode, company, sizes, isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      if (mode === 'edit' && company) {
        setFormData({
          nombre_comercial: company.nombre_comercial || '',
          fecha_fundacion: company.fecha_fundacion || '',
          id_tamanio: company.id_tamanio || '',
          fundadores: company.fundadores || [],
          mision: company.mision || '',
          vision: company.vision || '',
          actividad: company.actividad || '',
          direccion_web: company.direccion_web || '',
          sedes: company.sedes || [],
          municipios: company.municipios || [],
          rubros: company.rubros || [],
          paisesOperaInternacionalmente: company.paisesOperaInternacionalmente || [],
          // Agregar otros campos según necesidad
        });
      } else {
        setFormData({});
      }
      reset();
    }
  }, [isOpen, mode, company, reset]);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = (data) => {
    updateFormData(data);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = (data) => {
    // Procesar arrays desde strings
    const processedData = {
      ...formData,
      ...data,
      fundadores: data.fundadores ? data.fundadores.split(',').map(name => ({ nombre: name.trim() })).filter(f => f.nombre) : [],
      sedes: data.sedes ? data.sedes.split(',').map(name => ({ nombre: name.trim() })).filter(s => s.nombre) : [],
      municipios: data.municipios ? data.municipios.split(',').map(name => ({ nombre: name.trim() })).filter(m => m.nombre) : [],
      rubros: data.rubros ? data.rubros.split(',').map(name => ({ nombre: name.trim() })).filter(r => r.nombre) : [],
      // Otros arrays vacíos por defecto
      tiposSocietarios: [],
      familia: [],
      servicios: [],
      items: [],
      paisesOperaInternacionalmente: [],
      reconocimientos: [],
      imagenes: [],
      hitos: [],
      implementacion: {},
      mensajeConmemorativo: '',
    };
    onSubmit(processedData);
  };

  if (!isOpen) return null;

  //const handleFormSubmit = (data) => {
   // onSubmit(data);
  //};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-[32px] bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === 'create' ? 'Crear nueva empresa' : 'Editar empresa'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">Paso {currentStep} de {steps.length}: {steps.find(s => s.id === currentStep)?.name}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">✕</button>
        </div>

        {/* Navegación de pasos */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className={`flex-1 text-center ${step.id === currentStep ? 'text-[#2C5282] font-semibold' : 'text-slate-400'}`}>
                <div className={`mx-auto mb-2 h-8 w-8 rounded-full flex items-center justify-center text-sm ${step.id === currentStep ? 'bg-[#2C5282] text-white' : step.id < currentStep ? 'bg-green-500 text-white' : 'bg-slate-200'}`}>
                  {step.id}
                </div>
                <div className="text-xs">{step.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 bg-slate-200 rounded">
            <div className="h-1 bg-[#2C5282] rounded" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(currentStep === steps.length ? handleFinalSubmit : handleNext)} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Identidad de la Empresa</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nombre comercial *</label>
                  <input
                    {...register('nombre_comercial', { required: true })}
                    defaultValue={formData.nombre_comercial || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                    placeholder="Ej: INTI S.A."
                  />
                  {errors.nombre_comercial && <span className="text-xs text-red-500">Este campo es requerido</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Fecha de fundación *</label>
                  <input
                    type="date"
                    {...register('fecha_fundacion', { required: true })}
                    defaultValue={formData.fecha_fundacion || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                  />
                  {errors.fecha_fundacion && <span className="text-xs text-red-500">Este campo es requerido</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Tamaño de empresa *</label>
                  <select
                    {...register('id_tamanio', { required: true })}
                    defaultValue={formData.id_tamanio || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Seleccione un tamaño</option>
                    {sizes.map((size) => (
                      <option key={size.id} value={size.id}>{size.label}</option>
                    ))}
                  </select>
                  {errors.id_tamanio && <span className="text-xs text-red-500">Este campo es requerido</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Fundadores</label>
                  <input
                    {...register('fundadores')}
                    defaultValue={formData.fundadores?.map(f => f.nombre).join(', ') || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                    placeholder="Ej: Juan Pérez, María García"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Perfil de la Empresa</h3>
              <p className="text-slate-500">Placeholder para Perfil - Implementar campos de misión, visión, actividad, etc.</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Visión</h3>
              <p className="text-slate-500">Placeholder para Visión - Implementar campos relacionados.</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Alcance</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Sede Central</label>
                  <input
                    {...register('sedes')}
                    defaultValue={formData.sedes?.map(s => s.nombre).join(', ') || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                    placeholder="Ej: La Paz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Municipios</label>
                  <input
                    {...register('municipios')}
                    defaultValue={formData.municipios?.map(m => m.nombre).join(', ') || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                    placeholder="Ej: La Paz, Santa Cruz"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Rubros/Sectores</label>
                  <input
                    {...register('rubros')}
                    defaultValue={formData.rubros?.map(r => r.nombre).join(', ') || ''}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
                    placeholder="Ej: Farmacéutico, Alimentos"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep > 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">{steps.find(s => s.id === currentStep)?.name}</h3>
              <p className="text-slate-500">Placeholder para {steps.find(s => s.id === currentStep)?.name} - Implementar campos relacionados.</p>
            </div>
          )}

          <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
            <button type="button" onClick={handlePrev} disabled={currentStep === 1} className="rounded-2xl px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50">
              Anterior
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="rounded-2xl px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Cancelar
              </button>
              <button type="submit" className="rounded-2xl bg-[#2C5282] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#244872]">
                {currentStep === steps.length ? (mode === 'create' ? 'Guardar empresa' : 'Actualizar empresa') : 'Siguiente'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};             

export default EmpresaFormModal;