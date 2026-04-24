import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const ObjetivoSection = () => (
  <AnimatedSection 
    style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "clamp(1rem, 3vw, 1.8rem)",
      flexWrap: "wrap"
    }}
    delay={0.1}
  >
    <motion.div 
      className="flex-1 min-w-[240px] order-2 lg:order-1"
      variants={{
        hidden: { opacity: 0, x: -20, scale: 0.98 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      }}
    >
      <motion.img
        src={require("../../assets/vita.jpg")}
        alt="Objetivo de nuestro trabajo"
        className="w-full rounded-xl shadow-md"
        style={{
          aspectRatio: "1.618 / 1",
          objectFit: "cover"
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.99 }}
      />
    </motion.div>
    
    <motion.div 
      className="flex-1 min-w-[240px] order-1 lg:order-2"
      variants={{
        hidden: { opacity: 0, x: 20, scale: 0.98 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      }}
    >
      <motion.h2 
        className="font-bodoni font-bold mb-6"
        style={{
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          color: "inherit",
          lineHeight: "1.2",
          letterSpacing: "clamp(0.01rem, 0.03rem, 0.05rem)"
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        Objetivo de nuestro trabajo
      </motion.h2>
      <motion.p 
        className="font-miles leading-relaxed"
        style={{
          fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
          color: "inherit",
          lineHeight: "1.5"
        }}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        Mostrar el aporte histórico y actual de las empresas bolivianas con más de 40 años de trayectoria,
        a través de un sistema de información que permite registrar, consultar y analizar datos clave mediante
        dashboards interactivos, rescatando su legado y su rol en el desarrollo económico y social del país.
      </motion.p>
    </motion.div>
  </AnimatedSection>
);

export default ObjetivoSection;
