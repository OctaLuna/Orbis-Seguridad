import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EmpresaFormModal = ({ mode, company, sizes, isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      companyName: company?.companyName || company?.nombreComercial || '',
      foundationDate: company?.fechaFundacion ? company.fechaFundacion.split('T')[0] : company?.foundationDate ? company.foundationDate.split('T')[0] : '',
      size: company?.size || company?.tamanio || company?.tamanioEmpresa?.id || company?.tamanioEmpresa || '',
    },
  });

  useEffect(() => {
    reset({
      companyName: company?.companyName || company?.nombreComercial || '',
      foundationDate: company?.foundationDate ? company.foundationDate.split('T')[0] : '',
      size: company?.size || company?.tamanio || '',
    });
  }, [company, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm px-4 py-6 sm:px-6">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-medium text-slate-500">{mode === 'create' ? 'Crear nueva empresa' : 'Editar empresa'}</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Paso 1: Identidad</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Nombre comercial</span>
              <input
                type="text"
                {...register('companyName', { required: 'El nombre es obligatorio' })}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.companyName && <span className="mt-2 block text-xs font-medium text-red-600">{errors.companyName.message}</span>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Fecha de fundación</span>
              <input
                type="date"
                {...register('foundationDate', { required: 'La fecha es obligatoria' })}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.foundationDate && <span className="mt-2 block text-xs font-medium text-red-600">{errors.foundationDate.message}</span>}
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Tamaño</span>
            <select
              {...register('size', { required: 'Debes seleccionar un tamaño' })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecciona un tamaño</option>
              {sizes.map((option) => (
                <option key={option.id ?? option.value ?? option.label ?? option} value={option.id ?? option.value ?? option.label ?? option}>
                  {option.label ?? option.nombre ?? option}
                </option>
              ))}
            </select>
            {errors.size && <span className="mt-2 block text-xs font-medium text-red-600">{errors.size.message}</span>}
          </label>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-[#2C5282] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244872] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {mode === 'create' ? 'Crear empresa' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpresaFormModal;
