import React, { useEffect, useRef, useState } from "react";
import { Eye, History, ArrowRightToLine, Mountain, BookOpen } from "lucide-react";

// Constantes de datos con iconos
const mainSections = [
  {
    id: "objective",
    title: "OBJETIVO",
    displayTitle: "Objetivo",
    icon: ArrowRightToLine,
    body: ( 
      <p> 
        Preservamos, organizamos y exhibimos el patrimonio corporativo de empresas bolivianas con más de 40 años de trayectoria. 
        Digitalizamos archivos, certificamos hitos históricos y creamos narrativas vivas que honran el legado mientras inspiran 
        a la próxima generación de líderes empresariales. 
      </p> 
    ),
    image: '/media/historiapage/bolivia.jpg', 
  },
  {
    id: "mission",
    title: "MISIÓN",
    displayTitle: "Misión",
    icon: Mountain,
    body: ( 
      <p> 
        Proteger la memoria de la empresa boliviana mediante documentación rigurosa, narrativas históricas cuidadosas y diseño atemporal, 
        haciendo que el viaje de cada empresa sea accesible, verificable y bellamente preservado para el futuro. 
      </p> 
    ),
    image: '/media/historiapage/AGRO.jpg',
  },
  {
    id: "vision",
    title: "VISIÓN",
    displayTitle: "Visión",
    icon: Eye,
    body: ( 
      <p> 
        Un archivo nacional prestigioso donde la historia de la excelencia empresarial sea atesorada, sirviendo como referencia para 
        investigadores, emprendedores y familias que elevan el legado de la industria boliviana en el escenario mundial. 
      </p> 
    ),
    image: '/media/historiapage/flamingob.jpg',
  },
  {
    id: "origin",
    title: "ORIGEN",
    displayTitle: "Origen",
    icon: History,
    body: ( 
      <p> 
        Nacidos del compromiso con la memoria cultural, surgimos cuando historiadores, archiveros e innovadores se unieron alrededor 
        de una idea simple: si no documentamos nuestras empresas hoy, las generaciones futuras heredarán silencio donde debería haber legado. 
      </p> 
    ),
    image: '/media/historiapage/salarB.jpg', 
  },
];

const howItStartedSection = {
  id: "how",
  title: "NUESTRA HISTORIA",
  displayTitle: "Nuestra Historia",
  icon: BookOpen,
  body: (
    <div className="w-full">
      <div className="relative py-6 px-4 md:px-0">
        {/* LÍNEA DE TIEMPO - CAMBIADA A AZUL #072D42 */}
        <div className="hidden md:block absolute left-0 right-0 top-10 h-0.5 bg-[#072D42]/30" />
        <div className="block md:hidden absolute left-6 top-6 bottom-0 w-px bg-gradient-to-b from-transparent via-[#072D42]/30 to-transparent" />
        
        <ol className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-16">
          {[
            { year: "2025-I", text: "Primeros archivos fundacionales recolectados de diversos sectores empresariales." },
            { year: "2025-II", text: "Programa de digitalización y establecimiento de estándares." },
            { year: "Actualidad", text: "Una plataforma viva que conecta el legado con la innovación empresarial." },
          ].map((m) => (
            <li key={m.year} className="md:min-w-[10rem] md:text-center">
              <div className="hidden md:flex flex-col items-center gap-3">
                <div className="relative">
                  {/* PUNTOS DE LA LÍNEA DE TIEMPO - CAMBIADOS A AZUL */}
                  <span className="block w-3 h-3 rounded-full border-2 border-[#072D42] bg-[#072D42]/20" />
                </div>
                <div className="text-sm font-light tracking-wide">
                  <span className="font-serif text-lg block mb-1 text-[#072D42]">{m.year}</span>
                  <span className="block max-w-[16rem] text-xs leading-tight text-[#072D42]/80">{m.text}</span>
                </div>
              </div>
              <div className="flex md:hidden items-start gap-4">
                <div className="relative pt-1.5">
                  <span className="block w-3 h-3 rounded-full border-2 border-[#072D42] bg-[#072D42]/20" />
                </div>
                <div className="text-sm font-light tracking-wide">
                  <span className="font-serif text-lg block mb-1 text-[#072D42]">{m.year}</span>
                  <span className="block text-xs leading-tight text-[#072D42]/80">{m.text}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  ),
};



const allSections = [...mainSections, howItStartedSection];

// Estilos de fuentes
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
  
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
`;

const AboutUsPage = () => {
  const [revealedSections, setRevealedSections] = useState({});
  const sectionRefs = useRef({});
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  // Insertar estilos en el head del documento
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = fontStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Scroll con throttling
  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver para detectar secciones activas
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setRevealedSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { 
        root: null, 
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px"
      },
    );

    allSections.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  // Componente para el icono de fondo que alterna posición
  const BackgroundIcon = ({ icon: Icon, isImageRight, className = "" }) => {
    return (
      <div className={`absolute ${isImageRight ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none ${className}`}>
        <Icon className="w-32 h-32 md:w-48 md:h-48 opacity-10 text-[#072D42] transition-colors duration-500" />
      </div>
    );
  };

  return (
    <div className="bg-[#FAF8F5] text-[#072D42] min-h-screen font-sans">
      {/* HEADER CON EFECTO PARALLAX */}
      <div className="h-[20vh] min-h-[25rem] max-h-[50rem] mb-9 overflow-hidden relative">
        <header className="relative h-full">
          <div 
            className="absolute inset-0 w-full h-full"
            style={parallaxStyle}
          >
            <img 
              src="/media/historiapage/salarB.jpg"
              alt="Fondo del Archivo Histórico Empresarial Boliviano"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45"></div>
          </div>
          
          <div className="relative z-30 p-20 lg:p-48 text-white h-full flex flex-col justify-center">
            {/* TÍTULO PRINCIPAL */}
            <h1 className="font-playfair text-5xl lg:text-9xl font-normal leading-[0.9] tracking-tight mb-4 text-white">
              Nosotros
            </h1>
            
            {/* SUBTÍTULO */}
            <div className="mb-6">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-white/95 mb-3">
                Archivo Histórico Empresarial
              </h2>
              <div className="h-px w-32 bg-white/70 mb-4"></div>
            </div>
            
            {/* TEXTO DESCRIPTIVO */}
            <p className="font-inter text-xl lg:text-2xl font-extralight tracking-wide max-w-2xl text-white/90 leading-relaxed">
              Registrando la evolución del sector empresarial boliviano y preservando legados de más de 40 años.
            </p>
          </div>
        </header>
      </div>

      

      <main className="px-4 sm:px-6 lg:px-8 py-0">
        {/* CONTENIDO PRINCIPAL - CENTRADO Y CON ANCHO MÁXIMO */}
        <section className="max-w-6xl mx-auto flex flex-col gap-20">
          {mainSections.map((s, index) => {
            // Alternar dirección: par = imagen izquierda, impar = imagen derecha
            const isImageRight = index % 2 !== 0;
            
            return (
              <div
                key={s.id}
                id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
                className={`
                  scroll-mt-24 rounded-2xl
                  overflow-hidden group transition-all duration-500 ease-out relative
                  ${revealedSections[s.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                {/* ICONO DE FONDO QUE ALTERNA IZQUIERDA/DERECHA */}
                <BackgroundIcon icon={s.icon} isImageRight={isImageRight} />
                
                <div className="relative z-10">
                  <div className={`flex flex-col lg:flex-row ${
                    isImageRight ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* IMAGEN - ALTERNA IZQUIERDA/DERECHA EN DESKTOP CON MÁS SEPARACIÓN */}
                    {s.image && (
                      <div className="lg:w-2/5 flex overflow-hidden">
                        <img 
                          src={s.image} 
                          alt={s.displayTitle} 
                          className={`w-full h-64 lg:h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
                            isImageRight 
                              ? 'lg:rounded-r-2xl lg:rounded-l-none' 
                              : 'lg:rounded-l-2xl lg:rounded-r-none'
                          }`} 
                        />
                      </div>
                    )}
                    
                    <div className={s.image ? 'lg:w-3/5 p-8 md:p-12 lg:p-16' : 'w-full p-8 md:p-12 lg:p-16'}>
                      <div className={`mb-8 flex flex-col items-center lg:items-start text-center lg:text-left ${
                        isImageRight ? 'lg:items-start' : 'lg:items-start'
                      }`}>
                        <div className="flex items-center gap-4 mb-4 flex-col lg:flex-row w-full">
                          <h2 className="font-playfair text-4xl lg:text-5xl font-normal tracking-wide text-[#072D42] transition-all duration-500 ease-out">
                            {s.displayTitle}
                          </h2>
                        </div>
                        {/* LÍNEA QUE SE ALARGA AL HACER HOVER */}
                        <div className={`h-px w-24 bg-[#072D42] transition-all duration-500 ease-out transform origin-center lg:origin-left group-hover:scale-x-150 ${
                          isImageRight ? 'lg:origin-left' : 'lg:origin-left'
                        }`}></div>
                      </div>
                      
                      <div className="font-inter text-lg lg:text-xl leading-relaxed font-light tracking-wide text-[#072D42]/95 transition-all duration-700 ease-out max-w-none text-justify lg:text-left">
                        {s.body}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div 
            id={howItStartedSection.id}
            ref={(el) => (sectionRefs.current[howItStartedSection.id] = el)}
            className={`
              scroll-mt-24 bg-white rounded-2xl shadow-lg border-2 border-[#072D42]/20 p-8 md:p-12 lg:p-16
              transform transition-all duration-700 ease-out
              ${revealedSections[howItStartedSection.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <div className="mb-12 text-center">
              <div className="flex items-center gap-4 mb-6 justify-center">
                <howItStartedSection.icon className="w-8 h-8 text-[#072D42]" />
                <h2 className="font-playfair text-4xl lg:text-5xl font-normal tracking-wide text-[#072D42]">
                  {howItStartedSection.displayTitle}
                </h2>
              </div>
              <div className="h-px w-24 bg-[#072D42] mx-auto"></div>
            </div>
            
            <div className="font-inter">
              {howItStartedSection.body}
            </div>
          </div>
        </section>

        {/* FOOTER MEJORADO */}
      
      </main>
    </div>
  );
};

export default AboutUsPage;