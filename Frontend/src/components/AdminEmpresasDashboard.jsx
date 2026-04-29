import React, { useEffect, useMemo, useState } from 'react';
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  getAdminEmpresasSummary,
  getCatalogOptions,
  registerEmpresa,
  updateEmpresa,
  patchEmpresa,
} from '../services/adminEmpresasService';
import EmpresaFormModal from './EmpresaFormModal';

const formatDate = (value) => {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const AdminEmpresasDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [headquartersFilter, setHeadquartersFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsCompany, setDetailsCompany] = useState(null);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminEmpresasSummary();
      const data = Array.isArray(response) ? response : response?.data || [];
      setCompanies(data);
    } catch (error) {
      console.error('Error cargando empresas:', error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSizeOptions = async () => {
    try {
      const response = await getCatalogOptions('tamanios');
      const normalized = Array.isArray(response)
        ? response.map((item) => ({
            id: item.id ?? item.id_tamanio ?? item.value ?? item,
            label: item.nombre ?? item.label ?? String(item),
          }))
        : [];
      setSizeOptions(normalized);
    } catch (error) {
      console.error('Error cargando opciones de tamaño:', error);
    }
  };

  useEffect(() => {
    loadCompanies();
    loadSizeOptions();
  }, []);

  const getCompanyHeadquarters = (company) => {
    const sede = company.sedes?.[0];
    const departamento =
      sede?.departamento?.nombre || sede?.departamento || sede?.ciudad || sede?.nombre;
    return (
      departamento ||
      company.headquarters ||
      company.sedePrincipal ||
      company.sedeCentral ||
      'Sin sede'
    ).toString();
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const name = (
        company.nombre_comercial ||
        company.nombreComercial ||
        company.companyName ||
        company.nombre ||
        ''
      )
        .toString()
        .toLowerCase();

      const matchesSearch = name.includes(searchTerm.toLowerCase().trim());
      const headquarters = getCompanyHeadquarters(company);
      const matchesHeadquarters = headquartersFilter
        ? headquarters === headquartersFilter
        : true;
      return matchesSearch && matchesHeadquarters;
    });
  }, [companies, searchTerm, headquartersFilter]);

  const headquartersOptions = useMemo(() => {
    const unique = companies
      .map((company) => getCompanyHeadquarters(company))
      .filter((h) => h !== 'Sin sede');
    return Array.from(new Set(unique));
  }, [companies]);

  const handleSave = async (formValues) => {
    try {
      if (modalMode === 'create') {
        await registerEmpresa(formValues);
      } else if (selectedCompany) {
        const id = selectedCompany.id_empresa || selectedCompany.id;
        await updateEmpresa(id, formValues);
      }
      setIsModalOpen(false);
      await loadCompanies();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleDeactivate = async (company) => {
    const confirmation = window.confirm('¿Seguro que desea desactivar esta empresa?');
    if (!confirmation) return;
    try {
      const id = company.id_empresa || company.id;
      await patchEmpresa(id, { activo: false });
      await loadCompanies();
    } catch (error) {
      console.error('Error desactivando empresa:', error);
    }
  };

  const handleViewDetails = (company) => {
    setDetailsCompany(company);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] bg-white px-6 py-6 shadow-lg ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2C5282]">
              Administración
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Panel de Empresas</h1>
          </div>
          <button
            onClick={() => {
              setModalMode('create');
              setSelectedCompany(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2C5282] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#244872]"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Añadir empresa
          </button>
        </div>

        {/* BUSCADOR Y FILTROS */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <label className="block text-sm font-medium text-slate-700">Buscar por nombre</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: INTI..."
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <label className="block text-sm font-medium text-slate-700">Filtrar por sede</label>
            <select
              value={headquartersFilter}
              onChange={(e) => setHeadquartersFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Todas las sedes</option>
              {headquartersOptions.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLA */}
        <div className="overflow-hidden rounded-[28px] bg-white shadow-lg ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-[#EBF4FF]">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-800">Logo</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Nombre comercial</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Sede</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Sector</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Fundación</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      Cargando...
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((company) => {
                    const name =
                      company.nombre_comercial ||
                      company.nombreComercial ||
                      company.companyName ||
                      '—';
                    const date =
                      company.fecha_fundacion ||
                      company.fechaFundacion ||
                      company.foundationDate;
                    const sector = company.rubros?.[0]?.nombre || 'General';

                    return (
                      <tr
                        key={company.id_empresa || company.id}
                        onClick={() => handleViewDetails(company)}
                        className="cursor-pointer hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          {company.imagenes?.[0] ? (
                            <img
                              src={company.imagenes[0]}
                              alt="Logo"
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">
                              {name[0]?.toUpperCase() || '?'}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
                        <td className="px-6 py-4">{getCompanyHeadquarters(company)}</td>
                        <td className="px-6 py-4">{sector}</td>
                        <td className="px-6 py-4">{formatDate(date)}</td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedCompany(company);
                                setModalMode('edit');
                                setIsModalOpen(true);
                              }}
                              className="rounded-xl bg-slate-100 p-2 hover:bg-blue-100"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeactivate(company)}
                              className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL CREAR / EDITAR */}
      <EmpresaFormModal
        mode={modalMode}
        company={selectedCompany}
        sizes={sizeOptions}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
      />

      {/* MODAL DETALLES */}
      {isDetailsModalOpen && detailsCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Detalles de Empresa</h2>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Identidad */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Identidad</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <strong>Nombre:</strong> {detailsCompany.nombre_comercial || '—'}
                  </div>
                  <div>
                    <strong>Fecha Fundación:</strong>{' '}
                    {formatDate(detailsCompany.fecha_fundacion)}
                  </div>
                  <div>
                    <strong>Tamaño:</strong>{' '}
                    {detailsCompany.tamanioEmpresa?.nombre || '—'}
                  </div>
                  <div>
                    <strong>Fundadores:</strong>{' '}
                    {detailsCompany.fundadores?.map((f) => f.nombre).join(', ') || '—'}
                  </div>
                </div>
              </div>

              {/* Perfil */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Perfil</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <strong>Misión:</strong> {detailsCompany.mision || '—'}
                  </div>
                  <div>
                    <strong>Visión:</strong> {detailsCompany.vision || '—'}
                  </div>
                  <div>
                    <strong>Actividad:</strong> {detailsCompany.actividad || '—'}
                  </div>
                  <div>
                    <strong>Dirección Web:</strong> {detailsCompany.direccion_web || '—'}
                  </div>
                </div>
              </div>

              {/* Alcance */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Alcance</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <strong>Sedes:</strong>{' '}
                    {detailsCompany.sedes?.map((s) => s.nombre).join(', ') || '—'}
                  </div>
                  <div>
                    <strong>Municipios:</strong>{' '}
                    {detailsCompany.municipios?.map((m) => m.nombre).join(', ') || '—'}
                  </div>
                  <div>
                    <strong>Rubros:</strong>{' '}
                    {detailsCompany.rubros?.map((r) => r.nombre).join(', ') || '—'}
                  </div>
                  <div>
                    <strong>Países:</strong>{' '}
                    {detailsCompany.paisesOperaInternacionalmente?.join(', ') || '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmpresasDashboard;