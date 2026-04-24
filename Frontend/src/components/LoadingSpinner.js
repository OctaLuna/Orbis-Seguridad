import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = "Cargando...", isLoading = true }) => {
  // Minimalist design: subtle pulsing circles with staggered animation
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const circleVariants = {
    start: {
      scale: 1,
      opacity: 0.3,
    },
    end: {
      scale: 1.2,
      opacity: 0.8,
    },
  };

  const transition = {
    duration: 1.2,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {isLoading && (
        <motion.div
          className="flex justify-around w-12 h-6"
          variants={containerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            className="block w-2 h-2 bg-text-muted rounded-full"
            variants={circleVariants}
            transition={transition}
          />
          <motion.span
            className="block w-2 h-2 bg-text-muted rounded-full"
            variants={circleVariants}
            transition={transition}
          />
          <motion.span
            className="block w-2 h-2 bg-text-muted rounded-full"
            variants={circleVariants}
            transition={transition}
          />
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
