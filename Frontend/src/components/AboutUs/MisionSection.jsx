import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const MisionSection = () => (
  <AnimatedSection 
    style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "clamp(1rem, 3vw, 1.8rem)",
      flexWrap: "wrap"
    }}
    delay={0.2}
  >
    <motion.div 
      className="flex-1 min-w-[240px]"
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
        IMPORTANCIA DEL LEGADO EMPRESARIAL
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
        Las empresas bolivianas con más de 40 años no son solo testigos silenciosos de nuestra historia; son la fuerza que ha resistido los embates del tiempo, sobrevivido a cambios políticos, económicos y sociales, y se han convertido en pilares fundamentales de nuestro presente. Más que un legado, representan nuestro futuro: un recordatorio constante de que Bolivia tiene talento, capacidad y determinación para crear, innovar y prosperar.
      </motion.p>
    </motion.div>
    
    <motion.div 
      className="flex-1 min-w-[240px]"
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
      <motion.img
        src={require("../../assets/futbol.jpg")}
        alt="Legado empresarial boliviano"
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
  </AnimatedSection>
);

export default MisionSection;
