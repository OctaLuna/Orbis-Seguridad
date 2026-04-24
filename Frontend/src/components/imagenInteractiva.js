import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImagenInteractiva = ({ items, imagenDefault, ancho = "100%" }) => {
  const [seleccionado, setSeleccionado] = useState(null);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-surface-elevated border border-stroke h-full"
      style={{ width: ancho, marginLeft: 0 }}
    >
      {/* --- Barra de iconos - Responsive padding --- */}
  <div className="w-full flex items-center justify-between py-2 md:py-3 lg:py-4 gap-2 md:gap-4 lg:gap-6 bg-white border-t-2 md:border-t-4 lg:border-t-6 border-b-2 md:border-b-4 lg:border-b-6 border-primary px-2 md:px-4 lg:px-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-1 flex justify-center"
          >
            <motion.img
              src={item.icono}
              alt={`icono-${index}`}
              className="h-6 md:h-8 lg:h-10 xl:h-12 cursor-pointer transition-all duration-200 hover:brightness-110"
              whileHover={{ scale: 1.1, opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSeleccionado(item)}
            />
          </div>
        ))}
      </div>

  {/* --- Panel de contenido animado - Responsive spacing (fondo más claro) --- */}
  <div className="w-full bg-surface-elevated flex flex-col items-center gap-4 md:gap-6 lg:gap-8 flex-grow overflow-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <AnimatePresence mode="wait">
          {seleccionado ? (
            <motion.div
              key={seleccionado.subtitulo}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="flex flex-col items-center w-full"
            >
              {/* Responsive title */}
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-playfair font-medium text-primary text-center tracking-tight mb-4 md:mb-6 lg:mb-8">
                {seleccionado.subtitulo}
              </h2>

              <motion.img
                src={seleccionado.imagen}
                alt="contenido"
                className="max-w-full h-32 md:h-40 lg:h-48 xl:h-56 object-contain my-4 md:my-6 lg:my-8 rounded-lg shadow-md border border-stroke"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              {/* Responsive text */}
              <motion.p
                className="text-center max-w-2xl text-sm md:text-base lg:text-lg font-miles text-text-main leading-relaxed px-2 md:px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {seleccionado.texto}
              </motion.p>
            </motion.div>
          ) : (
            <motion.img
              key="default"
              src={imagenDefault}
              alt="default"
              className="w-full h-full max-h-48 md:max-h-64 lg:max-h-80 object-contain rounded-lg shadow-sm border border-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImagenInteractiva;
