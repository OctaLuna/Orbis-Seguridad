// TestimonialCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFlip = () => setFlipped(!flipped);

  return (
    <motion.div
      className="perspective-1000 cursor-pointer mx-1"
      style={{
        width: "clamp(200px, 18vw, 260px)",
        height: "clamp(260px, 28vh, 320px)"
      }}
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && toggleFlip()}
      aria-label={`Card de ${card.title}, click para girar`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        y: -3,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: "clamp(200px, 18vw, 260px)",
        height: "clamp(260px, 28vh, 320px)",
        zIndex: isHovered ? 10 : 1 // Z-index dinámico para hover
      }}
    >
      <motion.div 
        className={`relative w-full h-full rounded-xl transition-transform duration-500 transform-style-preserve-3d shadow-md select-none ${
          flipped ? 'rotate-y-180' : 'rotate-y-0'
        }`}
        style={{
          background: "#072D42" // Azul sólido como antes
        }}
        whileHover={{
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 }
        }}
      >
        {/* Frente */}
        <div className="absolute w-full h-full rounded-xl backface-hidden flex flex-col justify-center items-center p-4 text-center">
          <motion.h3 
            className="font-bodoni font-bold mb-4 text-surface-elevated uppercase tracking-wider select-none"
            style={{
              fontSize: "clamp(0.9rem, 2.2vw, 1.2rem)",
              lineHeight: "1.2"
            }}
            whileHover={{ scale: 1.01 }}
          >
            {card.title}
          </motion.h3>
          <motion.p 
            className="font-miles leading-relaxed mb-4 break-words text-surface-elevated"
            style={{
              fontSize: "clamp(0.7rem, 1.6vw, 0.9rem)",
              lineHeight: "1.4"
            }}
            whileHover={{ scale: 1.005 }}
          >
            {card.text}
          </motion.p>
          <motion.div 
            className="font-bodoni font-bold text-surface-elevated select-none"
            style={{
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)"
            }}
            whileHover={{ scale: 1.01 }}
          >
            {card.role}
          </motion.div>
        </div>

        {/* Reverso */}
        <div className="absolute w-full h-full rounded-xl backface-hidden flex flex-col justify-center items-center p-3 text-center transform rotate-y-180 overflow-y-hidden">
          {card.backType === "list" ? (
            <motion.ul 
              className="list-none p-0 m-0 w-fit text-surface-elevated text-center select-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {card.backContent.map((item, i) => (
                <motion.li 
                  key={i} 
                  className="font-miles my-1"
                  style={{
                    fontSize: "clamp(0.7rem, 1.6vw, 0.9rem)"
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.01, x: 2 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.img
              src={card.backContent}
              alt={`Imagen de ${card.title}`}
              className="rounded-full object-cover select-none mx-auto block"
              style={{
                width: "clamp(80px, 20vw, 110px)",
                height: "clamp(80px, 20vw, 110px)"
              }}
              draggable={false}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.03, rotate: 2 }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
