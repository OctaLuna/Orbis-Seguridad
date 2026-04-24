import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { motion } from "framer-motion";
import jessicaImg from '../../assets/jessica.jpg';
import OvandoImg from '../../assets/ovando.jpg';
import GuidoImg from '../../assets/guido.jpg';

const cardsData = [
  {
    title: "Frontend",
    text: "Equipo encargado de dar vida a la página web, transformando código en experiencias llenas de pasión y alegría.",
    role: "Desarrolladores",
    backType: "list",
    backContent: [
      "Octavio Luna",
      "Leonardo Ibarra",
      "Leandro Colque",
      "Rodny Siles",
      "Kevin Sancalli",
      "Einar Guillen",
      "Huascar Duran",
      "Alejandro Zamorano",
    ],
  },
  {
    title: "Backend",
    text: "Equipo que da vida al motor de la página web, conectando la lógica con los datos para que todo funcione de manera fluida y eficiente.",
    role: "Desarrollador",
    backType: "list",
    backContent: [
      "Sergio Arias",
      "Christian Coronel",
      "Leonardo Delgado",
      "Jean Fernandez",
      "Alan Flores",
      "Alina Mollinedo",
      "Marvin Mollo",
      "Raquel Osorio",
    ],
  },

  {
    title: "Base de datos",
    text: "Somos el corazón del proyecto. Nuestro equipo gestiona datos que laten y dan vida a cada acción, asegurando que todo funcione con fluidez y coherencia.",
    role: "Desarrollador",
    backType: "list",
    backContent: [
      "Alvarez Adriana",
      "Gonzales Adrian",
      "Jiménez Manuel",
      "Laguna Diego",
      "Menchaca Andres",
      "Ordóñez Adrián",
      "Velazco Jesus",
      "Yahuita Luciana",
    ],
  },
  {
    title: "Dashboard",
    text: "Equipo encargado de dar vida a los datos de las grandes empresas bolivianas, transformando cifras históricas en un dashboard que honra su legado y proyecta su futuro con claridad y visión.",
    role: "Desarrollador",
    backType: "list",
    backContent: [
      "Adriana Rocha",
      "Luís Paredes",
      "Carlos Pinell",
      "Tania Pérez",
      "Dilan Mamani",
      "Ignacio Retamozo",
      "Ramiro Quenta",
      "Ivonne Colque",
    ],

  },
  {
    title: "Daniela Carolina Ovando Santander",
    text: "Msc Systems Engineer | Business Intelligence | Data Science | Agile | Innovation | Data Strategy | Data Government | University Professor",
    role: "Ingeniera que hizo posible todo esto",
    backType: "image",
    backContent: OvandoImg,
  },
  {
    title: "Jessica Doris Lanza Butrón",
    text: "Directora Administración de Empresas e Innovación Empresarial. Universidad Católica Boliviana San Pablo. Sede La Paz",
    role: "Cliente",
    backType: "image",
    backContent: jessicaImg,
  },
  {
    title: "Guido Jinés Dávila",
    text: "",
    role: "Cliente",
    backType: "image",
    backContent: GuidoImg,
  },
];
const PersonalSection = () => {
  const [index, setIndex] = useState(0);

  const visibleCount = 4;
  const lastIndex = cardsData.length - visibleCount;

  const visibleCards = cardsData.slice(index, index + visibleCount);

  const handleNext = () => {
    if (index < lastIndex) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <motion.section 
      className="text-center"
      style={{
        padding: "clamp(1rem, 3vh, 1.8rem) 0",
        margin: "clamp(1.5rem, 4vh, 2rem) auto"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.h2
        className="font-bodoni font-bold select-none mb-8"
        style={{
          fontSize: "clamp(1rem, 2.8vw, 1.5rem)",
          color: "#072D42",
          lineHeight: "1.2",
          letterSpacing: "clamp(0.01rem, 0.03rem, 0.05rem)"
        }}
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        LAS PERSONAS Y EQUIPOS QUE HICIERON POSIBLE
      </motion.h2>

      <motion.div 
        className="flex items-center justify-center gap-3 flex-nowrap max-w-5xl mx-auto px-3"
        style={{ overflow: "visible" }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handlePrev}
          className={`rounded-full text-xl border-none cursor-pointer select-none flex-shrink-0 transition-all duration-200 shadow-md hover:shadow-lg ${
            index === 0 
              ? 'bg-text-muted text-surface-elevated opacity-30 pointer-events-none' 
              : 'bg-primary text-surface-elevated hover:bg-primary/90'
          }`}
          style={{
            width: "clamp(2rem, 3.5vw, 2.5rem)",
            height: "clamp(2rem, 3.5vw, 2.5rem)"
          }}
          aria-label="Anterior"
        >
          ◀
        </motion.button>

        <motion.div 
          className="flex gap-3 flex-grow justify-center"
          style={{ 
            overflow: "visible",
            padding: "1rem 0" // Espacio para que las cartas no se corten al hacer hover
          }}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {visibleCards.map((card, i) => (
            <motion.div
              key={index + i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              style={{
                zIndex: 1 // Asegurar que las cartas hovered estén por encima
              }}
            >
              <TestimonialCard card={card} />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleNext}
          className={`rounded-full text-xl border-none cursor-pointer select-none flex-shrink-0 transition-all duration-200 shadow-md hover:shadow-lg ${
            index === lastIndex 
              ? 'bg-text-muted text-surface-elevated opacity-30 pointer-events-none' 
              : 'bg-primary text-surface-elevated hover:bg-primary/90'
          }`}
          style={{
            width: "clamp(2rem, 3.5vw, 2.5rem)",
            height: "clamp(2rem, 3.5vw, 2.5rem)"
          }}
          aria-label="Siguiente"
        >
          ▶
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default PersonalSection;
