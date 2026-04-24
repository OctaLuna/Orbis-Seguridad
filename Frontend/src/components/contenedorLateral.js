import React, { useMemo, useState } from "react";

const ContenedorLateral = ({
  subtitulo,
  imagen,
  ancho,
  ovaloRedondez,
  cuadroRedondez,
  dias,
}) => {
  // Construye días por defecto: 11, 12 y 13 de Noviembre de 2025
  const defaultDias = useMemo(() => {
    const toISODate = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    // Martes 11, Miércoles 12 y Jueves 13 de Noviembre de 2025
    const d1 = new Date(2025, 10, 11); // Noviembre es el mes 10 (0-indexed)
    const d2 = new Date(2025, 10, 12);
    const d3 = new Date(2025, 10, 13);
    return [
      { label: "Martes 11", date: toISODate(d1), imageUrl: "/media/homePage/day1.jpeg" },
      { label: "Miércoles 12", date: toISODate(d2), imageUrl: "/media/homePage/day2.jpeg" },
      { label: "Jueves 13", date: toISODate(d3), imageUrl: "/media/homePage/day3.jpeg" },
    ];
  }, []);

  const diasData = dias && Array.isArray(dias) && dias.length === 3 ? dias : defaultDias;

  // Selecciona el día según la fecha actual
  const todayISO = useMemo(() => {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const d = String(t.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  // viewMode: 'semana' (mostrar imagen prop) o 'dias' (mostrar imagen del día)
  const [viewMode, setViewMode] = useState('semana');
  // Por defecto no seleccionar ningún día porque el modo por defecto es 'semana'
  const [activeIdx, setActiveIdx] = useState(null);

  const getStatus = (dateISO) => {
    if (dateISO === todayISO) return "Hoy";
    return dateISO < todayISO ? "Realizado" : "Próximamente";
  };

  return (
    <div
      className="relative flex flex-col z-10 ml-auto bg-white shadow-sm"
      style={{
        width: ancho,
        borderColor: "#E5E7EB",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: cuadroRedondez,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="px-4 md:px-6 lg:px-8 py-3 md:py-4"
        style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}
      >
        {/* Subtítulo clickable: al hacer click muestra el modo 'semana' y se subraya cuando esté activo */}
        <h2
          role="button"
          tabIndex={0}
          onClick={() => { setViewMode('semana'); setActiveIdx(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setViewMode('semana'); setActiveIdx(null); } }}
          className="font-playfair font-medium text-primary text-2xl md:text-3xl text-center tracking-tight"
          style={{ cursor: 'pointer', textDecoration: viewMode === 'semana' ? 'underline' : 'none' }}
          aria-pressed={viewMode === 'semana'}
        >
          {subtitulo || "Semana de actividades"}
        </h2>
      </div>

      {/* Selector de días */}
      <div className="px-3 md:px-6 lg:px-8 py-3">
        <div className="flex gap-1 md:gap-2 rounded-full border" style={{ borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', padding: '6px' }}>
          {diasData.map((d, idx) => {
            const status = getStatus(d.date);
            const isActive = idx === activeIdx;
            return (
              <button
                key={d.label}
                    onClick={() => { setActiveIdx(idx); setViewMode('dias'); }}
                className={`group flex-1 flex flex-col items-center justify-center rounded-full transition-all duration-300 focus:outline-none py-2 md:py-2.5 hover:scale-105 hover:shadow-lg cursor-pointer relative`}
                style={
                  isActive
                    ? { backgroundColor: '#FFFFFF', color: '#072D42', border: '2px solid rgba(7,45,66,0.4)', boxShadow: '0 4px 12px rgba(7,45,66,0.2)' }
                    : { backgroundColor: '#FFFFFF', color: '#111827', border: '2px solid #E5E7EB', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }
                }
                aria-pressed={isActive}
              >
                <span className={`font-miles text-xs md:text-sm`}>{d.label}</span>
                <span className="mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] md:text-xs border font-miles font-light"
                  style={
                    status === 'Hoy'
                      ? { backgroundColor: 'rgba(7,45,66,0.08)', color: '#072D42', borderColor: 'rgba(7,45,66,0.18)' }
                      : status === 'Realizado'
                      ? { backgroundColor: '#F3F4F6', color: '#374151', borderColor: '#E5E7EB' }
                      : { backgroundColor: '#F9FAFB', color: '#4B5563', borderColor: '#E5E7EB' }
                  }
                >
                  {status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-2 md:px-4 lg:px-6 pb-4 flex items-center justify-center">
        <div className="relative w-full max-w-[760px] flex items-start justify-center">
          <div className="relative mt-4 w-full overflow-hidden rounded-xl bg-white shadow-sm"
               style={{ border: '1px solid #E5E7EB' }}>
            <img
              src={viewMode === 'semana' ? imagen : (diasData[activeIdx]?.imageUrl || imagen)}
              alt={`${viewMode === 'semana' ? (subtitulo || 'Semana') : (diasData[activeIdx]?.label || "Día")} - imagen`}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorLateral;

