import React from "react";

const BarraHorizontal = ({
  texto,
  height = "clamp(0.1vh, 0.6vh, 0.5vh)", // Un poco menos alto que antes
  margenHorizontal = "clamp(1vw, 2vw, 2vw)",
  imagen,
}) => {
  const containerStyle = { height };

  const imageStyle = {
    backgroundImage: `url(${imagen})`,
    width: margenHorizontal,
    margin: 0,
  };

  return (
    <div 
      style={{
        ...containerStyle,
        borderTopWidth: '0.5px',
        borderBottomWidth: '0.5px',
        padding: 0,
        margin: 0
      }}
      className="w-full flex items-center overflow-hidden bg-surface-elevated/80 backdrop-blur-sm border-stroke/30 shadow-sm"
    >
      <div
        style={imageStyle}
        className="bg-repeat-x bg-center h-[40%] flex-shrink-0 bg-[length:auto_100%] opacity-30 transition-opacity duration-300"
      />
      <div
        className="flex-grow h-full flex items-center justify-center font-miles text-text-main text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] tracking-wide transform -translate-y-[0.5%] font-medium uppercase px-0 transition-colors duration-200"
      >
        {texto}
      </div>
      <div
        style={imageStyle}
        className="bg-repeat-x bg-center h-[40%] flex-shrink-0 bg-[length:auto_100%] opacity-30 transition-opacity duration-300"
      />
    </div>
  );
};

export default BarraHorizontal;
