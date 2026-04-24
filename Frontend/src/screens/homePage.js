import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral";
// import ImagenInteractiva from "../components/imagenInteractiva";
import CarruselImagenes from "../components/carruselImagenes";


const HomePage = ({ loggedInUser }) => {
  return (
  <div className="w-full min-h-screen bg-background flex flex-col" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      {/* Video Principal - Responsive height */}
      <section className="relative">
        <VideoPanel height="clamp(40vh, 61.8vh, 80vh)">
          <video 
            className="w-full h-full object-cover" 
            src="/media/homePage/video.webm" 
            autoPlay 
            muted 
            loop 
          />
        </VideoPanel>
      </section>

      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>

      {/* Barra de Separación - Empresas que Forjaron el País */}
      <section className="relative">
        <BarraHorizontal
          texto="EMPRESAS QUE FORJARON EL PAIS"
          height="clamp(3vh, 6.18vh, 8vh)"
          margenHorizontal="clamp(10vw, 19.1vw, 25vw)"
          imagen="/media/homePage/barra.png"
        />
      </section>

      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>

      {/* Sección Principal de Contenido - Layout áureo perfectamente alineado */}
      <section className="w-full px-4 md:px-8 lg:px-16 xl:px-32 min-h-min">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start" style={{ gap: 'clamp(2rem, 6.18vw, 4rem)' }}>
            {/* Panel Izquierdo - Dos Paneles Apilados Más Llamativos */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center lg:justify-start mt-8 lg:mt-12" style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}>
              {/* Panel Superior - Promocional Investigación */}
              <div className="w-full max-w-[450px] lg:max-w-none">
                <div className="relative flex flex-col z-10 ml-auto bg-white shadow-sm"
                  style={{
                    width: "100%",
                    borderColor: "#E5E7EB",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  {/* Header sin icono */}
                  <div
                    className="px-6 md:px-8 lg:px-10 py-4 md:py-5 relative"
                    style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}
                  >
                    <h2 className="font-playfair font-semibold text-primary text-2xl md:text-3xl text-center tracking-tight">
                      Centro de Investigación
                    </h2>
                  </div>

                  {/* Contenido expandido */}
                  <div className="px-6 md:px-8 lg:px-10 py-6 flex items-center justify-center">
                    <div className="text-center max-w-lg">
                      <p className="font-miles text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                        Esta plataforma también está dedicada a la investigación académica, facilitando el análisis profundo de datos empresariales y contribuyendo al desarrollo del conocimiento en el sector privado boliviano.
                      </p>
                      <div className="flex justify-center gap-4 text-sm text-primary font-medium">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Análisis de Datos
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Conocimiento Empresarial
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Inferior - Revista Más Llamativa */}
              <div className="w-full max-w-[450px] lg:max-w-none">
                <div className="relative p-6">
                  <div
                    className="relative bg-white shadow-sm rounded-2xl"
                    style={{
                      borderColor: "#E5E7EB",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Título arriba de la imagen */}
                    <div className="p-6 text-center">
                      <h3 className="font-playfair font-semibold text-primary text-2xl md:text-3xl mb-4 tracking-tight">
                        Revista Académica
                      </h3>
                    </div>

                    {/* Imagen de la revista - Estilo Minimalista Vintage */}
                    <div className="relative w-full flex justify-center px-6 pb-6">
                      <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 bg-white p-2 shadow-sm">
                        <img
                          src="/media/revista/revista.png"
                          alt="Revista"
                          className="max-w-full h-auto object-contain rounded"
                          style={{ filter: 'sepia(0.1) contrast(1.05) brightness(1.02)', maxHeight: '450px' }}
                        />
                        {/* Badge "Próximamente" sobre la imagen */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/80 text-primary shadow-md border border-gray-200">
                            Próximamente
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido de texto abajo */}
                    <div className="px-6 pb-6 text-center">
                      <p className="font-miles text-base md:text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
                        Fruto de la investigación con empresas y sus datos, esta revista destaca nuestro compromiso como centro de investigación, ofreciendo insights profundos sobre el desarrollo empresarial en Bolivia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenedor Lateral Derecho - Proporción áurea 69.1% pegado al lateral derecho */}
            <div className="w-full lg:w-[60%] flex justify-end">
              <div className="w-full ml-auto -mr-4 md:-mr-8 lg:-mr-16 xl:-mr-32">
                <ContenedorLateral
                  subtitulo="SEMANA DE ACTIVIDADES"
                  imagen="/media/homePage/work.jpeg"
                  ancho="100%"
                  ovaloRedondez="20px"
                  cuadroRedondez="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>
      
      {/* Barra de Separación - Recorridos de +40 Años */}
      <section className="relative">
        <BarraHorizontal
          texto="RECORRIDOS DE +40 AÑOS"
          height="clamp(3vh, 6.18vh, 8vh)"
          margenHorizontal="clamp(10vw, 19.1vw, 25vw)"
          imagen="/media/homePage/barra.png"
        />
      </section>

      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>

      {/* Carrusel de Imágenes - Responsive padding */}
      <section className="w-full bg-surface py-8 md:py-12 lg:py-16">
        <CarruselImagenes
          altura={600}
          filas={3}
          loggedInUser={loggedInUser}
        />
      </section>
    </div>
  );
};

export default HomePage;