import React, { useState } from "react";

const CardFlip = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped(!flipped);

  const containerStyle = {
    width: 360,
    height: 400,
    perspective: 1000,
    cursor: "pointer",
    margin: "1rem auto", // margen vertical reducido
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    transition: "transform 0.5s ease",
    transformStyle: "preserve-3d",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    backgroundColor: "#154734",
    color: "#e4d0a9",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    userSelect: "none",
  };

  const faceStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 1.5rem 1rem 1.5rem", // reduce margen abajo para la lista
    boxSizing: "border-box",
    textAlign: "center",
  };

  const frontStyle = { ...faceStyle };

  const backStyle = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    overflowY: "hidden", // quita scroll visible
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "1.2rem",
    color: "#e4d0a9",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    userSelect: "none",
  };

  const textStyle = {
    fontSize: "1rem",
    lineHeight: 1.6,
    marginBottom: "1.8rem",
    wordBreak: "break-word",
  };

  const roleStyle = {
    fontWeight: "bold",
    fontSize: "1.3rem",
    userSelect: "none",
  };

  const backListStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "fit-content",
    color: "#e4d0a9",
    textAlign: "center",
    userSelect: "none",
  };

  const backListItemStyle = {
    fontSize: "1.15rem",
    margin: "0.25rem 0", // margen vertical reducido para que no ocupe mucho
  };

  const backImageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "12px",
    objectFit: "contain",
    userSelect: "none",
  };

  return (
    <div
      style={containerStyle}
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && toggleFlip()}
      aria-label={`Card de ${card.title}, click para girar`}
    >
      <div style={innerStyle}>
        {/* Frente */}
        <div style={frontStyle}>
          <h3 style={titleStyle}>{card.title}</h3>
          <p style={textStyle}>{card.text.repeat(2)}</p>
          <div style={roleStyle}>{card.role}</div>
        </div>

        {/* Reverso */}
        <div style={backStyle}>
          {card.backType === "list" ? (
            <ul style={backListStyle}>
              {card.backContent.map((item, i) => (
                <li key={i} style={backListItemStyle}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <img
              src={card.backContent}
              alt={`Imagen de ${card.title}`}
              style={backImageStyle}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
