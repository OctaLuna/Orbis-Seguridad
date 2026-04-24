import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedSection = ({ children, style, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
      style={{
        padding: "clamp(1rem, 3vw, 1.8rem)",
        maxWidth: "1000px",
        margin: "0 auto clamp(1.5rem, 4vh, 2rem)",
        background: isHovered 
          ? "linear-gradient(135deg, #072D42 0%, #0A3A5A 100%)" 
          : "linear-gradient(135deg, #FEFCFB 0%, #F5F3F0 100%)",
        ...style,
      }}
    >
      {/* Overlay decorativo sutil */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 61.8% 38.2%, #F29E38 0%, transparent 70%)"
        }}
      />
      
      {/* Contenido con animaciones escalonadas */}
      <motion.div
        variants={childVariants}
        className="relative z-10"
        style={{
          color: isHovered ? "#FEFCFB" : "#464E59"
        }}
      >
        {children}
      </motion.div>

      {/* Borde decorativo sutil */}
      <motion.div
        className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          borderColor: "#F29E38",
          borderWidth: "1px"
        }}
      />
    </motion.section>
  );
};

export default AnimatedSection;
