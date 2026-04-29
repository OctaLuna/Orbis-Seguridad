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
  if (!value) {
    return 'Sin fecha';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

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

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminEmpresasSummary();
      setCompanies(Array.isArray(response) ? response : response?.data || []);
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
            id: item.id ?? item.value ?? item,
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
    const departamento = sede?.departamento?.nombre || sede?.departamento || sede?.ciudad || sede?.nombre;
    return (
      departamento ||
      company.headquarters ||
      company.sedePrincipal ||
      company.sedeCentral ||
      'Sin sede definida'
    ).toString();
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const name = (company.companyName || company.nombreComercial || company.nombre || '').toString().toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase().trim());
      const headquarters = getCompanyHeadquarters(company);
      const matchesHeadquarters = headquartersFilter ? headquarters === headquartersFilter : true;
      return matchesSearch && matchesHeadquarters;
    });
  }, [companies, searchTerm, headquartersFilter]);

  const headquartersOptions = useMemo(() => {
    const unique = companies
      .map((company) => getCompanyHeadquarters(company))
      .filter(Boolean);
    return Array.from(new Set(unique));
  }, [companies]);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const openEditModal = (company) => {
    setModalMode('edit');
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleSave = async (formValues) => {
    try {
      const payload = {
        nombre: formValues.companyName,
        fechaFundacion: formValues.foundationDate,
        tamanioEmpresa: Number(formValues.size),
      };

      if (modalMode === 'create') {
        await registerEmpresa(payload);
      } else if (selectedCompany) {
        await updateEmpresa(selectedCompany.id, payload);
      }

    } catch (error) {
      console.error('Error guardando empresa:', error);
    }
  };

  const handleDeactivate = async (company) => {
    const confirmation = window.confirm('¿Seguro que desea desactivar esta empresa?');
    if (!confirmation) {
      return;
    }
    try {
      await patchEmpresa(company.id, { active: false });
      await loadCompanies();
    } catch (error) {
      console.error('Error desactivando empresa:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[32px] bg-white px-6 py-6 shadow-lg ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2C5282]">Gestión de empresas</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">AdminEmpresasDashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">Resumen de empresas para roles SUPERADMIN y ADMIN_EMPRESAS. Busca por nombre, filtra por sede y administra estados activos.</p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2C5282] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244872]"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Añadir nueva empresa
          </button>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <label className="block text-sm font-medium text-slate-700">Buscar por nombre</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar empresa..."
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <label className="block text-sm font-medium text-slate-700">Filtrar por sede</label>
            <select
              value={headquartersFilter}
              onChange={(event) => setHeadquartersFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2C5282] focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Todas las sedes</option>
              {headquartersOptions.map((headquarters) => (
                <option key={headquarters} value={headquarters}>{headquarters}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-lg ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-[#EBF4FF]">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-800">Nombre</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Sede</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Sector</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Fecha de fundación</th>
                  <th className="px-6 py-4 font-medium text-slate-800">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">Cargando empresas...</td>
                  </tr>
                ) : filteredCompanies.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">No se encontraron empresas.</td>
                  </tr>
                ) : (
                  filteredCompanies.map((company) => {
                    const name = company.companyName || company.nombreComercial || company.nombre || '—';
                    const headquarters = company.headquarters || company.sedePrincipal || company.sedeCentral || '—';
                    const sector = company.currentSector || company.sectorActual || company.rubro || '—';

                    return (
                      <tr key={company.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
                        <td className="px-6 py-4">{headquarters}</td>
                        <td className="px-6 py-4">{sector}</td>
                        <td className="px-6 py-4">{formatDate(company.fechaFundacion || company.foundationDate)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(company)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-blue-100 hover:text-blue-700"
                              aria-label={`Editar empresa ${name}`}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeactivate(company)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-700 transition hover:bg-red-100 hover:text-red-900"
                              aria-label={`Desactivar empresa ${name}`}
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

      <EmpresaFormModal
        mode={modalMode}
        company={selectedCompany}
        sizes={sizeOptions}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default AdminEmpresasDashboard;
