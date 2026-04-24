import React from "react";

const VideoPanel = ({ children, height = "50vh" }) => {
  // La altura es una prop dinámica, por lo que la manejamos con un objeto de estilo.
  // Es la forma más limpia cuando el valor no es fijo.
  const panelStyle = {
    height: height,
  };

  return (
    <div
      style={panelStyle}
      // APLICACIÓN MINIMALISTA: Bordes simples y limpios
      className="w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Clonamos el `children` para aplicarle clases en lugar de estilos en línea. */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                // Estas clases aseguran que el video (o cualquier otro elemento)
                // llene el panel y se mantenga centrado con transiciones suaves.
                className: "w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105",
              })
            : child
        )}
      </div>
    </div>
  );
};

export default VideoPanel;
