// src/components/Button.jsx

import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        font-serif font-normal text-lg tracking-wider
        text-navy border border-navy 
        bg-transparent 
        px-8 py-3 rounded-md 
        transition-all duration-300 ease-in-out
        hover:bg-navy hover:text-white hover:shadow-lg
        transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-navy focus:ring-opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;