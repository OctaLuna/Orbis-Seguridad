import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FichaExpandidaEditable = ({ empresa, onClose }) => {
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

  const [form, setForm] = useState({ ...empresa });
  const [rubrosDisponibles, setRubrosDisponibles] = useState([]);
  const [premiosDisponibles, setPremiosDisponibles] = useState([]);
  const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
  const [tamaniosDisponibles, setTamaniosDisponibles] = useState([]);
  const [tiposSocietariosDisponibles, setTiposSocietariosDisponibles] = useState([]);
  const [propietariosDisponibles, setPropietariosDisponibles] = useState([]);
  const [cargandoPremios, setCargandoPremios] = useState(true);

  const handleInput = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const toggleCheckbox = (field, value) => {
    const current = form[field] || [];
    const esString = typeof current[0] === 'string';

    if (esString) {
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setForm({ ...form, [field]: updated });
    }
  };

  const toggleCheckboxPremios = (premioId) => {
    const premiosActuales = form.premios || [];
    const estaSeleccionado = premiosActuales.some((p) => p.id_premio === premioId);

    const nuevosPremios = estaSeleccionado
      ? premiosActuales.filter((p) => p.id_premio !== premioId)
      : [...premiosActuales, premiosDisponibles.find((p) => p.id_premio === premioId)];

    setForm({ ...form, premios: nuevosPremios });
  };

  const fetchDatos = async () => {
    try {
      const premiosRes = await axios.get('http://localhost:3000/premios');
      setPremiosDisponibles(premiosRes.data.premios || []);
      setCargandoPremios(false);
    } catch (error) {
      console.error('❌ Error al cargar premios:', error);
      setCargandoPremios(false);
    }
  };
  const fetchRubros = async () => {
    try {
      const rubrosRes = await axios.get('http://localhost:3000/rubros');
      setRubrosDisponibles(rubrosRes.data.rubros || []);
    } catch (error) {
      console.error('❌ Error al cargar rubros:', error);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const guardarCambios = async () => {
    try {
      await axios.put(`http://localhost:3000/empresas/${form.id_empresa}`, form);
      alert('✅ Cambios guardados correctamente');
      onClose();
    } catch (error) {
      console.error('❌ Error al guardar cambios:', error);
      alert('❌ Error al guardar los cambios');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center overflow-auto p-8">
      <div className="bg-white w-full max-w-[1200px] rounded-xl overflow-hidden flex shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black px-4 py-1 rounded-full hover:bg-red-600">X</button>

        <div className="w-1/2 bg-black flex flex-col items-center justify-center p-4">
          <img src={`${CLOUDINARY_BASE_URL}/${form.url}`} alt="Imagen empresa" className="w-full h-[300px] object-cover rounded" />
          <input type="text" value={form.url} onChange={(e) => handleInput('url', e.target.value)} className="mt-4 w-full p-2 rounded bg-white text-black" placeholder="Nombre de imagen en Cloudinary" />
        </div>

        <div className="w-1/2 p-6 overflow-y-auto max-h-[80vh] space-y-4">
          <input type="text" value={form.nombre_comercial} onChange={(e) => handleInput('nombre_comercial', e.target.value)} className="w-full p-2 border rounded" placeholder="Nombre Comercial" />
          <input type="text" value={form.denominacion_social} onChange={(e) => handleInput('denominacion_social', e.target.value)} className="w-full p-2 border rounded" placeholder="Denominación Social" />

          <div>
            <label className="block font-semibold">Rubros:</label>
            <div className="flex flex-wrap gap-2">
              {rubrosDisponibles.map((rubro) => (
                <label key={rubro.id_rubro}>
                  <input
                    type="checkbox"
                    checked={form.rubros?.some((r) => r.nombre_rubro === rubro.nombre_rubro)}
                    onChange={() => toggleCheckbox('rubros', rubro.nombre_rubro)}
                  />
                  <span className="ml-1">{rubro.nombre_rubro}</span>
                </label>
              ))}
            </div>
          </div>

          <input type="text" value={form.nit} onChange={(e) => handleInput('nit', e.target.value)} className="w-full p-2 border rounded" placeholder="NIT" />

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block font-semibold">Fecha Fundación:</label>
              <DatePicker selected={form.fecha_fundacion ? new Date(form.fecha_fundacion) : null} onChange={(date) => handleInput('fecha_fundacion', date.toISOString().split('T')[0])} className="w-full p-2 border rounded" />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">Fecha Cierre:</label>
              <DatePicker selected={form.fecha_cierre ? new Date(form.fecha_cierre) : null} onChange={(date) => handleInput('fecha_cierre', date.toISOString().split('T')[0])} isClearable className="w-full p-2 border rounded" />
            </div>
          </div>

          <input type="text" value={form.eslogan} onChange={(e) => handleInput('eslogan', e.target.value)} className="w-full p-2 border rounded" placeholder="Eslogan" />
          <textarea value={form.descripcion} onChange={(e) => handleInput('descripcion', e.target.value)} className="w-full p-2 border rounded" placeholder="Descripción"></textarea>

          <div>
            <label className="font-semibold block">Propietarios (editar al hacer clic):</label>
            {form.propietarios?.map((p, idx) => (
              <div key={idx} className="text-sm text-blue-800 underline cursor-pointer hover:text-blue-600">
                {p.nombre} {p.apellido_paterno} {p.apellido_materno}
              </div>
            ))}
          </div>

          <div>
            <label className="block font-semibold">Premios:</label>
            {cargandoPremios ? (
              <div className="text-gray-500 text-sm">Cargando premios...</div>
            ) : premiosDisponibles.length === 0 ? (
              <div className="text-red-600 font-bold">⚠️ No se cargaron premios</div>
            ) : (
              <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto">
                {premiosDisponibles.map((premio) => {
                  const yaSeleccionado = form.premios?.some((p) => p.id_premio === premio.id_premio);
                  return (
                    <label key={premio.id_premio} className="text-sm">
                      <input type="checkbox" checked={yaSeleccionado} onChange={() => toggleCheckboxPremios(premio.id_premio)} />
                      <span className="ml-2">{premio.descripcion} ({premio.entidad_otorgadora})</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded">Cancelar</button>
            <button onClick={guardarCambios} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaExpandidaEditable;
