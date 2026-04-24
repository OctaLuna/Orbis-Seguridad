import React from "react";
import { Reveal } from "./Reveal";

// Estilos de fuentes integrados directamente
const fontStyles = `
  @font-face {
    font-family: 'BodoniStd';
    src: url('/forts/As_BodoniStd.off') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'TrajanPro';
    src: url('/forts/As_TrajanProRegular.tif') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .font-bodoni {
    font-family: 'BodoniStd', serif;
    letter-spacing: -0.02em;
  }

  .font-trajan {
    font-family: 'TrajanPro', serif;
    letter-spacing: 0.01em;
  }
`;

// Insertar estilos en el head del documento
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = fontStyles;
  document.head.appendChild(styleElement);
}

export default function NosotrosSection() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-white min-h-screen flex items-center">
      {/* Fondo minimalista con textura sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        
        {/* Elementos geométricos sutiles */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-[#072D42]/5 rounded-lg rotate-12" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#F29E38]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        {/* Contenido principal */}
        <Reveal>
          <div className="mx-auto max-w-4xl">
            {/* Encabezado */}
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.2em] text-xs text-[#072D42]/60 font-medium font-trajan mb-4">
                Sobre nosotros
              </p>
              <h1 className="font-bodoni text-4xl md:text-5xl lg:text-6xl text-[#072D42] mb-6 leading-[1.1]">
                Orbis <span className="text-[#F29E38]">Empresarial</span>
              </h1>
              
              <div className="w-16 h-0.5 bg-[#F29E38] mx-auto mb-8" />
              
              <p className="text-lg text-[#072D42]/80 leading-relaxed max-w-2xl mx-auto font-trajan">
                Plataforma dedicada a investigar, preservar y difundir la memoria 
                empresarial de Bolivia con rigor académico y sensibilidad histórica.
              </p>
            </div>

            {/* Descripción destacada */}
            <div className="bg-[#F4E9D7]/30 border-l-4 border-[#F29E38] pl-6 py-4 mb-12">
              <p className="text-[#072D42]/90 text-lg italic font-trajan">
                "Narramos historias que conectan pasado y futuro, inspirando a nuevas generaciones 
                a través del legado empresarial boliviano."
              </p>
            </div>
          </div>
        </Reveal>

        {/* Valores principales */}
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Valor 1 - Rigor */}
              <div className="text-center p-8 group hover:bg-[#F4E9D7]/10 transition-colors duration-300">
                <div className="w-16 h-16 bg-[#072D42] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bodoni text-2xl text-[#072D42] mb-4">Rigor</h3>
                <div className="w-8 h-0.5 bg-[#F29E38] mx-auto mb-4" />
                <p className="text-[#072D42]/70 leading-relaxed font-trajan text-sm">
                  Metodologías de documentación confiables y estándares editoriales claros 
                  que garantizan la veracidad histórica de cada relato.
                </p>
              </div>

              {/* Valor 2 - Humanidad */}
              <div className="text-center p-8 group hover:bg-[#F4E9D7]/10 transition-colors duration-300">
                <div className="w-16 h-16 bg-[#F29E38] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bodoni text-2xl text-[#072D42] mb-4">Humanidad</h3>
                <div className="w-8 h-0.5 bg-[#F29E38] mx-auto mb-4" />
                <p className="text-[#072D42]/70 leading-relaxed font-trajan text-sm">
                  Historias contadas con respeto y sensibilidad, resaltando el valor humano 
                  detrás de cada emprendimiento y decisión empresarial.
                </p>
              </div>

              {/* Valor 3 - Proyección */}
              <div className="text-center p-8 group hover:bg-[#F4E9D7]/10 transition-colors duration-300">
                <div className="w-16 h-16 bg-[#072D42] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bodoni text-2xl text-[#072D42] mb-4">Proyección</h3>
                <div className="w-8 h-0.5 bg-[#F29E38] mx-auto mb-4" />
                <p className="text-[#072D42]/70 leading-relaxed font-trajan text-sm">
                  Un puente entre generaciones que transforma experiencias pasadas en 
                  aprendizajes valiosos para construir un futuro empresarial más sólido.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Llamada a la acción */}
        <Reveal>
          <div className="text-center mt-16 pt-8 border-t border-[#072D42]/10">
            <p className="text-[#072D42]/60 font-trajan text-sm uppercase tracking-widest mb-4">
              Comprometidos con la excelencia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-[#072D42] text-white text-sm font-trajan rounded-full">
                Archivo vivo
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-[#F29E38] text-white text-sm font-trajan rounded-full">
                Curaduría rigurosa
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-[#072D42] text-white text-sm font-trajan rounded-full">
                Acceso responsable
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}