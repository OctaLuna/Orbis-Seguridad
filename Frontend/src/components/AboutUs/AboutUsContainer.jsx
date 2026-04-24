import { useEffect, useRef, useState } from "react";
import { Target, Rocket, Eye, History, Telescope, ChevronRight } from "lucide-react";

// Constantes de datos con iconos
const mainSections = [
  {
    id: "objective",
    title: "OBJECTIVO",
    displayTitle: "Objetivo",
    icon: Target,
    body: ( <p> Preservamos, organizamos y exhibimos el patrimonio corporativo de empresas bolivianas con más de 40 años de trayectoria. Digitalizamos archivos, certificamos hitos históricos y creamos narrativas vivas que honran el legado mientras inspiran a la próxima generación de líderes empresariales. </p> ),
    image: '/media/historiapage/bolivia.jpg', 
  },
  {
    id: "mission",
    title: "MISIÓN",
    displayTitle: "Misión",
    icon: Rocket,
    body: ( <p> Proteger la memoria de la empresa boliviana mediante documentación rigurosa, narrativas históricas cuidadosas y diseño atemporal, haciendo que el viaje de cada empresa sea accesible, verificable y bellamente preservado para el futuro. </p> ),
    image: '/media/historiapage/agropecuariob.jpg',
  },
  {
    id: "vision",
    title: "VISIÓN",
    displayTitle: "Visión",
    icon: Eye,
    body: ( <p> Un archivo nacional prestigioso donde la historia de la excelencia empresarial sea atesorada, sirviendo como referencia para investigadores, emprendedores y familias que elevan el legado de la industria boliviana en el escenario mundial. </p> ),
    image: '/media/historiapage/flamingob.jpg',
  },
  {
    id: "origin",
    title: "ORIGEN",
    displayTitle: "Origen",
    icon: History,
    body: ( <p> Nacidos del compromiso con la memoria cultural, surgimos cuando historiadores, archiveros e innovadores se unieron alrededor de una idea simple: si no documentamos nuestras empresas hoy, las generaciones futuras heredarán silencio donde debería haber legado. </p> ),
    image: '/media/historiapage/salarB.jpg', 
  },
];

const howItStartedSection = {
  id: "how",
  title: "NUESTRA HISTORIA",
  displayTitle: "Nuestra Historia",
  icon: Telescope,
  body: (
    <div className="w-full">
      <div className="relative py-6 px-4 md:px-0">
        <div className="hidden md:block absolute left-0 right-0 top-10 h-[3px] bg-white" />
        <div className="block md:hidden absolute left-[23px] top-6 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#072D42]/20 to-transparent" />
        <ol className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-16">
          {[
            { year: "1980s", text: "Primeros archivos fundacionales recolectados en diversos sectores empresariales." },
            { year: "1990s", text: "Primeras alianzas público-privadas para la preservación histórica." },
            { year: "2000s", text: "Programa de digitalización y establecimiento de estándares de certificación." },
            { year: "2010s", text: "Exhibiciones interactivas y expansión institucional a nivel nacional." },
            { year: "Actualidad", text: "Una plataforma viva que conecta el legado con la innovación empresarial." },
          ].map((m) => (
            <li key={m.year} className="md:min-w-[160px] md:text-center">
              <div className="hidden md:flex flex-col items-center gap-3">
                <div className="relative"><span className="block w-3 h-3 rounded-full border-2 border-[#072D42]" /></div>
                <div className="text-sm font-light tracking-wide">
                  <span className="font-serif text-lg block mb-1 text-[#072D42]">{m.year}</span>
                  <span className="block max-w-[16rem] text-xs leading-tight text-[#072D42]/80">{m.text}</span>
                </div>
              </div>
              <div className="flex md:hidden items-start gap-4">
                <div className="relative pt-1.5"><span className="block w-3 h-3 rounded-full border-2 border-[#072D42]" /></div>
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
const SCROLL_OFFSET = 150;

export default function Index() {
  const [active, setActive] = useState(allSections[0].id);
  const [revealedSections, setRevealedSections] = useState({});
  const sectionRefs = useRef({});
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  // ⚡ OPTIMIZADO: Scroll con throttling
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderShrunk(window.scrollY > 100);
      
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

  // ⚡ OPTIMIZADO: IntersectionObserver más eficiente
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
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

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = sectionRefs.current[id];
    if (!el) return;
    
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - SCROLL_OFFSET;
    
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setActive(id);
  };

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  return (
    <div className="bg-beige text-[#072D42] min-h-screen font-sans [&_a]:no-underline [&_a:hover]:no-underline">
      {/* HEADER CON EFECTO PARALLAX OPTIMIZADO */}
      <div className="h-[80vh] min-h-[400px] max-h-[800px] mb-9 overflow-hidden relative">
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
            {/* TÍTULO PRINCIPAL CON FUENTE ELEGANTE */}
            <h1 className="font-playfair text-5xl lg:text-9xl font-normal leading-[0.9] tracking-tight mb-4 text-white">
              Nosotros
            </h1>
            
            {/* SUBTÍTULO CON FUENTE EMPRESARIAL */}
            <div className="mb-6">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-white/95 mb-3">
                Archivo Histórico Empresarial
              </h2>
              <div className="h-px w-32 bg-white/70 mb-4"></div>
            </div>
            
            {/* TEXTO DESCRIPTIVO CON FUENTE MODERNA */}
            <p className="font-inter text-xl lg:text-2xl font-extralight tracking-wide max-w-2xl text-white/90 leading-relaxed">
              Registrando la evolución del sector empresarial boliviano y preservando legados de más de 40 años.
            </p>
          </div>
        </header>
      </div>

      <main className="px-10 py-0">
        {/* NAVEGACIÓN MÓVIL - SOLO EN MÓVIL */}
        <div className="block lg:hidden mb-8">
          <nav className="flex flex-row gap-2 overflow-x-auto py-4">
            {allSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => scrollTo(e, s.id)}
                className={`
                  relative text-left py-3 px-4 transition-colors duration-200 whitespace-nowrap
                  rounded-lg border border-[#9298A6]/30 bg-white/10
                  hover:bg-[#9298A6]/10
                  ${
                    active === s.id 
                      ? 'bg-[#9298A6]/20 font-medium'
                      : 'font-light opacity-80 hover:opacity-100'
                  }
                `}
              >
                <span className="tracking-widest text-sm text-[#072D42]">{s.title}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* ASIDE PARA DESKTOP CON ICONOS MEJORADOS */}
          <aside className="hidden lg:block lg:w-1/5 sticky top-1/4">
            <div 
              className={`
                transition-all duration-700 ease-in-out
                ${isHeaderShrunk 
                  ? 'opacity-100' 
                  : 'opacity-0 -translate-y-4 pointer-events-none'
                }
              `}
            >
              <h2 className="font-playfair text-3xl leading-tight mb-4 text-[#072D42]">Nosotros</h2>
              <div className="h-px w-20 bg-[#072D42]/50 mb-6"></div>
            </div>

            <nav className="flex lg:flex-col gap-0 rounded-lg overflow-hidden border border-[#9298A6]/30 bg-white/10">
              {allSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => scrollTo(e, s.id)}
                  className={`
                    relative group flex items-center justify-between py-3 px-4 transition-all duration-300
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:w-full after:h-[1px] after:bg-[#9298A6]
                    after:origin-center after:transition-transform after:duration-300 after:ease-out
                    border-b border-[#9298A6]/20 last:border-b-0
                    hover:bg-[#9298A6]/10
                    ${
                      active === s.id 
                        ? 'font-medium opacity-100 after:scale-x-100 bg-[#9298A6]/20'
                        : 'font-extralight opacity-70 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Icono de la sección a la izquierda */}
                    <s.icon className="w-4 h-4 text-[#072D42] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Texto con letra más fina */}
                    <span className="tracking-widest text-sm text-[#072D42] font-montserrat font-extralight">
                      {s.title}
                    </span>
                  </div>
                  
                  {/* Flechita única que aparece al hacer hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-3 h-3 text-[#072D42]" />
                  </div>
                </a>
              ))}
            </nav>

            
          </aside>

          <section className="w-full lg:w-4/5 flex flex-col gap-20">
            {mainSections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
                className={`
                  scroll-mt-24 bg-white rounded-xl shadow-md border border-[#072D42]/20 hover:border-[#072D42] hover:shadow-lg 
                  overflow-hidden group hover:bg-[#072D42]
                  transform transition-all duration-500 ease-out 
                  ${revealedSections[s.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                <div className={`transition-opacity duration-300 ${active === s.id ? "opacity-100" : "opacity-80"}`}>
                  <div className="flex flex-col md:flex-row">
                    {/* IMAGEN A LA IZQUIERDA - 35% SIN PADDING */}
                    {s.image && (
                      <div className="md:w-[35%] flex order-1 md:order-1 overflow-hidden">
                        <img 
                          src={s.image} 
                          alt={s.displayTitle} 
                          className="w-full h-full object-cover rounded-l-xl md:rounded-r-none transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                      </div>
                    )}
                    
                    {/* TEXTO A LA DERECHA - 65% CON PADDING - CON ANIMACIONES MEJORADAS */}
                    <div className={s.image ? 'md:w-[65%] order-2 md:order-2 p-8 md:p-12 lg:p-16 text-center md:text-left' : 'w-full order-2 p-8 md:p-12 lg:p-16 text-center md:text-left'}>
                      <div className="mb-8 flex flex-col items-center md:items-start overflow-hidden">
                        <div className="flex items-center gap-3 mb-4 flex-col md:flex-row w-full">
                          <s.icon className="w-6 h-6 text-[#072D42] group-hover:text-white transition-all duration-500 ease-out transform group-hover:scale-110 flex-shrink-0" />
                          
                          {/* TÍTULO CON FUENTE ELEGANTE */}
                          <h2 className="font-playfair text-3xl lg:text-4xl font-normal tracking-wide text-[#072D42] group-hover:text-white transition-all duration-500 ease-out transform translate-y-0 group-hover:-translate-y-1">
                            {s.displayTitle}
                          </h2>
                        </div>
                        
                        {/* LÍNEA DIVISORIA CON ANIMACIÓN */}
                        <div className="h-px w-20 bg-[#072D42] group-hover:bg-white transition-all duration-500 ease-out transform origin-left md:ml-9 mx-auto md:mx-0 group-hover:scale-x-150"></div>
                      </div>
                      
                      {/* TEXTO CON FUENTE MODERNA */}
                      <div className="font-inter text-lg leading-relaxed font-light tracking-wide text-[#072D42]/95 group-hover:text-white/95 transition-all duration-700 ease-out transform translate-x-0 group-hover:translate-x-2 max-w-prose mx-auto md:mx-0 text-justify md:text-left">
                        {s.body}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sección "Nuestra Historia" con icono */}
            <div 
              id={howItStartedSection.id}
              ref={(el) => (sectionRefs.current[howItStartedSection.id] = el)}
              className={`
                scroll-mt-24 
                transform transition-all duration-700 ease-out
                ${revealedSections[howItStartedSection.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <div className="mb-8 text-center md:text-left">
                <div className="flex items-center gap-3 mb-4 flex-col md:flex-row justify-center md:justify-start">
                  <howItStartedSection.icon className="w-6 h-6 text-[#072D42]" />
                  <h2 className="font-playfair text-3xl lg:text-4xl font-normal tracking-wide text-[#072D42]">
                    {howItStartedSection.displayTitle}
                  </h2>
                </div>
                <div className="h-px w-20 bg-[#072D42] mx-auto md:ml-9"></div>
              </div>
              <div className="font-inter text-justify md:text-left">
                {howItStartedSection.body}
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-24 pt-8 border-t border-[#072D42]/20 text-center max-w-5xl mx-auto">
          <p className="text-sm font-light tracking-wide text-[#072D42]/60 font-montserrat">
            © {new Date().getFullYear()} Archivo Histórico Empresarial Boliviano
          </p>
        </footer>
      </main>

      {/* IMPORTAR FUENTES ELEGANTES DE GOOGLE FONTS */}
      <style jsx global>{`
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
      `}</style>
    </div>
  );
}