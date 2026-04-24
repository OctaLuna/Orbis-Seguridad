import React from "react";

const contenedorImagenes = ({ alto, imagenes }) => {
  return (
    <div
      className="w-full flex items-center"
      style={{ height: alto }}
    >
      {imagenes.map((item, index) => (
        <div
          key={index}
          className="relative flex-1 h-full overflow-hidden"
        >
          {/* Cinta blanca con texto centrado */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
            <div className="w-full bg-white bg-opacity-60 py-2 text-black text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center">
                {item.titulo}
            </div>
            </div>


          {/* Imagen recortada centrada */}
          <img
            src={item.ruta}
            alt={item.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default contenedorImagenes;
