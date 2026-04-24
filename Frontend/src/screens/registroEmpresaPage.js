import React, { useState } from 'react';

const RegistroEmpresaCompleta = () => {
  const [formulario, setFormulario] = useState({
    nombreComercial: '',
    denominacionSocial: '',
    nit: '',
    fechaFundacion: '',
    fechaCierre: '',
    tamano: '',
    imagen: '',
    premios: '',
    tieneTipoSocietario: true,
    tipoSocietario: 'SRL'
  });

  const propietarios = [
    { nombre: 'Juan Pérez', inicio: '2010', fin: '2015' },
    { nombre: 'Ana Gómez', inicio: '2015', fin: '2020' },
    { nombre: 'Carlos Quispe', inicio: '2020', fin: '2022' },
    { nombre: 'Lucía Rodríguez', inicio: '2022', fin: 'Presente' },
  ];

  const tiposSocietarios = [
    'SRL',
    'SA',
    'SC',
    'SE',
    'Empresa Unipersonal',
    'Cooperativa',
    'Asociación Civil',
    'ONG',
    'Fundación'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormulario({ ...formulario, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos registrados:', formulario);
  };

  return (
  <div className="min-h-screen bg-[#f2f0df] flex justify-center items-start px-6 pb-6" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl space-y-8"
      >
        <h2 className="text-2xl font-bold text-[#9fa56c] text-center mb-4">Registro Completo de Empresa</h2>

        {/* BLOQUE 1: Datos empresa */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#2b2b2b]">Datos Generales</h3>

          <input type="text" name="nombreComercial" placeholder="Nombre Comercial" value={formulario.nombreComercial} onChange={handleChange} required className="w-full p-2 rounded border border-gray-300" />
          <input type="text" name="denominacionSocial" placeholder="Denominación Social" value={formulario.denominacionSocial} onChange={handleChange} required className="w-full p-2 rounded border border-gray-300" />
          <input type="text" name="nit" placeholder="NIT" value={formulario.nit} onChange={handleChange} required className="w-full p-2 rounded border border-gray-300" />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="date" name="fechaFundacion" value={formulario.fechaFundacion} onChange={handleChange} className="w-full p-2 rounded border border-gray-300" />
            <input type="date" name="fechaCierre" value={formulario.fechaCierre} onChange={handleChange} className="w-full p-2 rounded border border-gray-300" />
          </div>

          <input type="text" name="tamano" placeholder="Tamaño de Empresa" value={formulario.tamano} onChange={handleChange} className="w-full p-2 rounded border border-gray-300" />
          <input type="url" name="imagen" placeholder="URL de Imagen" value={formulario.imagen} onChange={handleChange} className="w-full p-2 rounded border border-gray-300" />
          <input type="text" name="premios" placeholder="Premios Otorgados" value={formulario.premios} onChange={handleChange} className="w-full p-2 rounded border border-gray-300" />
        </div>

        {/* BLOQUE 2: Propietarios */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#2b2b2b]">Propietarios</h3>
          <div className="space-y-2">
            {propietarios.map((prop, index) => (
              <div key={index} className="flex justify-between bg-[#e1e4c5] p-2 rounded-md">
                <span className="font-medium text-sm text-[#202020]">{prop.nombre}</span>
                <span className="text-sm">{prop.inicio} - {prop.fin}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" className="px-3 py-1 bg-[#9fa56c] text-white rounded-full text-sm hover:bg-[#8a944e]">+</button>
            <button type="button" className="px-3 py-1 bg-[#9fa56c] text-white rounded-full text-sm hover:bg-[#8a944e]">−</button>
          </div>
        </div>

        {/* BLOQUE 3: Tipo Societario */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#2b2b2b]">Tipo Societario</h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="tieneTipoSocietario"
              checked={formulario.tieneTipoSocietario}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-[#9fa56c] border-gray-300"
            />
            <span className="text-sm text-gray-800">Tiene tipo societario</span>
          </label>

          {formulario.tieneTipoSocietario && (
            <select
              name="tipoSocietario"
              value={formulario.tipoSocietario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {tiposSocietarios.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </select>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#9fa56c] hover:bg-[#8a944e] text-white px-6 py-2 rounded-full font-semibold"
          >
            Guardar Empresa
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroEmpresaCompleta;
