import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

/**
 * Paleta de colores corporativa.
 * @const
 */
const COLORS = {
  navy: '#072d42',
  beige: '#F4E9D7',
};

/**
 * Componente de navegación lateral que resalta la sección activa en la página.
 * Es ideal para páginas de formato largo ("landing pages") o documentación.
 * @param {{sections: Array<{id: string, label: string}>}} props
 */
export default function CorporateSideNav({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? null);

  // Memoizamos los IDs para optimizar el rendimiento y evitar re-cálculos.
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    if (elements.length === 0) return;

    // Se utiliza IntersectionObserver para detectar de manera eficiente qué sección está visible.
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        // El margen negativo asegura que la sección se active cuando esté más centrada en la pantalla.
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.2, // Un umbral bajo es suficiente para activar el cambio.
      }
    );

    elements.forEach((element) => observer.observe(element));

    // Limpieza al desmontar el componente para evitar fugas de memoria.
    return () => observer.disconnect();
  }, [sectionIds]);

  /**
   * Maneja el clic en un enlace de navegación, realizando un scroll suave a la sección.
   * @param {string} id - El ID del elemento de la sección a la que se navegará.
   */
  const handleScrollTo = (id) => (event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Navegación de secciones"
      className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-[240px] p-6"
    >
      <div 
        className="h-full w-full rounded-lg p-4 flex flex-col backdrop-blur-md"
        style={{ backgroundColor: 'rgba(244, 233, 215, 0.85)', border: `1px solid ${COLORS.navy}20` }}
      >
        <h2 
          className="text-lg font-semibold mb-4 pb-2"
          style={{ color: COLORS.navy, borderBottom: `1px solid ${COLORS.navy}30` }}
        >
          Contenido
        </h2>
        <ul className="flex flex-col space-y-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={handleScrollTo(section.id)}
                  className={`flex items-center w-full p-2 rounded-md transition-all duration-200 ease-in-out border-l-4 ${
                    isActive
                      ? 'font-semibold'
                      : 'hover:bg-white/50'
                  }`}
                  style={{
                    color: COLORS.navy,
                    borderColor: isActive ? COLORS.navy : 'transparent',
                    backgroundColor: isActive ? 'white' : 'transparent',
                  }}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// PropTypes para asegurar la estructura de datos correcta y mejorar la mantenibilidad.
CorporateSideNav.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};