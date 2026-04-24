import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Building, GraduationCap, Users } from 'lucide-react';

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

const ContactoPage = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
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

  // Scroll handler para parallax
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

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  const items = [
    {
      src: '/media/contactoPage/LP.png',
      alt: 'Universidad Católica Boliviana La Paz',
      text: 'Universidad Católica Boliviana\nLA PAZ',
      link: 'https://www.ucb.edu.bo/',
      hoverImg: '/media/contactoPage/UCB.png',
      icon: Building,
      asideLabel: 'UCB La Paz'
    },
    {
      src: '/media/contactoPage/SIS - H.png',
      alt: 'Carrera de Administración de Empresas',
      text: 'Carrera de Administración\nde Empresas',
      link: 'https://lpz.ucb.edu.bo/pregrado/administracion-de-empresas/',
      hoverImg: '/media/contactoPage/SIS-QR.png',
      icon: GraduationCap,
      asideLabel: 'Ing. Sistemas'
    },
    {
      src: '/media/contactoPage/IIE - H.png',
      alt: 'Carrera de Ingeniería Innovación Empresarial',
      text: 'Carrera de Ingeniería\nInnovación empresarial',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-innovacion-empresarial/',
      hoverImg: '/media/contactoPage/IIE-QR.png',
      icon: Users,
      asideLabel: 'Innovación Emp.'
    },
  ];

  return (
  <div className="min-h-screen bg-beige font-inter [&_a]:no-underline [&_a:hover]:no-underline" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      {/* HEADER ELEGANTE CON PARALLAX */}
      <div className="h-[20vh] min-h-[25rem] max-h-[50rem] mb-9 overflow-hidden relative">
        <header className="relative h-full">
          {/* IMAGEN DE FONDO - REEMPLAZA LA URL POR LA QUE DESEES */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={parallaxStyle}
          >
            <img 
              src="/media/contactoPage/MUEBLESB.jpg" // Cambia esta ruta por tu imagen
              alt="Contacto - Orbis Empresarial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#072D42]/60"></div>
          </div>
          
          <div className="relative z-30 p-20 lg:p-48 text-white h-full flex flex-col justify-center">
            <h1 className="font-playfair text-6xl lg:text-8xl font-normal leading-[0.9] tracking-tight mb-4 text-white">
              Contacto
            </h1>
            
            <div className="mb-6">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-white/95 mb-3">
                Alianzas Institucionales
              </h2>
              <div className="h-px w-32 bg-white/70 mb-4"></div>
            </div>
            
            <p className="font-inter text-xl lg:text-2xl font-extralight tracking-wide max-w-2xl text-white/90 leading-relaxed">
              Conectamos el legado empresarial con la innovación académica. 
              Descubre nuestras alianzas estratégicas.
            </p>
          </div>
        </header>
      </div>

      <main className="px-10 py-0">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* CONTENIDO PRINCIPAL - AHORA TRANSPARENTE */}
          <section className="w-full">
            {/* Header con líneas decorativas */}
            

            {/* Contenido principal - AHORA TRANSPARENTE */}
            <motion.section 
              className="bg-transparent p-8 md:p-12 lg:p-16 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1 
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#072D42] mb-8 text-center font-normal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Instituciones Aliadas
              </motion.h1>
              
              <motion.p 
                className="font-inter text-lg md:text-xl text-[#072D42]/80 leading-relaxed max-w-4xl mx-auto mb-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Colaboramos con instituciones académicas de prestigio para preservar y estudiar 
                el legado empresarial boliviano, conectando historia con innovación.
              </motion.p>

              {/* Grid de tarjetas elegante */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-center">
                {items.map(({ src, alt, text, link, hoverImg, icon: Icon }, idx) => (
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out cursor-pointer min-h-[450px] flex flex-col items-center justify-center border border-[#072D42]/10 hover:border-[#072D42]/30 hover:bg-gradient-to-br hover:from-[#072D42] hover:to-[#0A3A5A]"
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + idx * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Icono superior CON CONTORNO */}
                    <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="relative w-16 h-16 rounded-full bg-[#WHITE] group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                        <Icon className="w-8 h-8 text-beige group-hover:text-white transition-colors duration-500" />
                        {/* Contorno alrededor del icono circular */}
                        <div className="absolute inset-0 rounded-full border-2 border-beige/30 group-hover:border-white/50 transition-colors duration-500"></div>
                      </div>
                    </div>

                    {/* Imagen principal CON CONTORNO */}
                    <div className="relative mb-8">
                      <div className="relative">
                        <img 
                          src={src} 
                          alt={alt} 
                          className="w-32 h-32 md:w-36 md:h-36 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
                        />
                        {/* Contorno sutil alrededor de la imagen */}
                        <div className="absolute inset-0 border border-[#072D42]/20 rounded-lg group-hover:border-white/30 transition-colors duration-500"></div>
                      </div>
                      
                      {/* Overlay de QR al hover - CENTRADO */}
                      {hoverIndex === idx && (
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-white p-4 rounded-2xl shadow-2xl w-40 h-40 flex items-center justify-center border border-[#072D42]/20">
                            <img 
                              src={hoverImg} 
                              alt={`QR de ${alt}`} 
                              className="max-w-full max-h-full object-contain" 
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Texto */}
                    <div className="text-center flex-grow flex flex-col justify-center">
                      <p className="font-playfair text-xl md:text-2xl font-normal text-[#072D42] group-hover:text-white text-center leading-tight whitespace-pre-line transition-colors duration-500 mb-4">
                        {text.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                      
                      {/* Enlace externo */}
                      <div className="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-inter text-sm text-white/80">Visitar sitio</span>
                        <ExternalLink className="w-4 h-4 text-white/80" />
                      </div>
                    </div>

                    {/* Efecto de borde superior al hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#072D42] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
                  </motion.a>
                ))}
              </div>

              {/* Línea separadora elegante */}
              <div className="flex items-center justify-center mt-20 mb-12">
                <div className="h-px w-32 bg-[#072D42]/20"></div>
                <div className="mx-6">
                  <Building className="w-6 h-6 text-[#072D42]/40" />
                </div>
                <div className="h-px w-32 bg-[#072D42]/20"></div>
              </div>

              {/* Información de contacto adicional */}
              <motion.div 
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3 className="font-playfair text-2xl md:text-3xl text-[#072D42] mb-6 font-normal">
                  ¿Interesado en colaborar?
                </h3>
                <p className="font-inter text-lg text-[#072D42]/80 leading-relaxed mb-8">
                  Estamos siempre abiertos a nuevas alianzas estratégicas que fortalezcan 
                  la preservación de nuestra historia empresarial.
                </p>
                <button className="bg-[#072D42] hover:bg-[#0A3A5A] text-white px-8 py-3 rounded-lg font-montserrat font-medium tracking-wide transition-all duration-300 transform hover:scale-105">
                  Contactar Ahora
                </button>
              </motion.div>
            </motion.section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactoPage;