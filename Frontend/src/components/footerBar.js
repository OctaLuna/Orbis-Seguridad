import React from "react";
import { motion } from "framer-motion";

const FooterBar = () => {
  return (
    <footer className="bg-surface text-center py-6 border-t border-stroke shadow-[0_-2px_8px_rgba(0,0,0,0.05)] mt-12">
      <div className="max-w-7xl mx-auto px-5">
        <p className="font-miles text-base text-text-main mb-3 tracking-wide">
          Tutorizado por: Jessica Doris Lanza Butron
        </p>
        <ul className="flex flex-wrap justify-center gap-6 list-none p-0 m-0">
          <li>
            <motion.a
              href="/contacto"
              // Usamos clases de Tailwind para el estilo base y el hover del color
              className="font-bodoni text-sm text-primary tracking-wider transition-colors duration-300 hover:text-accent"
              // Usamos framer-motion para transformaciones y animaciones de tap
              whileHover={{ y: -2 }} // Ligero levantamiento al pasar el cursor
              whileTap={{ scale: 0.95 }}
            >
              Contacto
            </motion.a>
          </li>
          <li>
            <motion.a
              href="/historia"
              className="font-bodoni text-sm text-primary tracking-wider transition-colors duration-300 hover:text-accent"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Nosotros
            </motion.a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterBar;
