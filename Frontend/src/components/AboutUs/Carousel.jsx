import React, { useState } from "react";
import CardFlip from "./CardFlip";

const Carousel = ({ cardsData }) => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 4;
  const totalCards = cardsData.length;

  const prev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  };

  const next = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  // Obtener las 4 cards visibles, tomando en cuenta que puede pasar del final y empezar desde 0
  const visibleCards = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleCards.push(cardsData[(startIndex + i) % totalCards]);
  }

  const carouselContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: "2rem",
    gap: "1rem",
    flexWrap: "nowrap",
    overflow: "hidden",
  };

  const cardsWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexShrink: 0,
  };

  const buttonStyle = {
    backgroundColor: "#154734",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    color: "#e4d0a9",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    position: "relative",
    zIndex: 10,
  };

  return (
    <section aria-label="Carrusel de personas y equipos" style={{ width: "100%", maxWidth: "1600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontWeight: "700", marginBottom: "1rem", color: "#003E73" }}>
        LAS PERSONAS Y EQUIPOS QUE HICIERON POSIBLE
      </h2>

      <div style={carouselContainerStyle}>
        <button aria-label="Anterior" style={{ ...buttonStyle, marginRight: "1rem" }} onClick={prev}>&#9664;</button>
        <div style={cardsWrapperStyle}>
          {visibleCards.map((card, i) => (
            <CardFlip key={startIndex + i} data={card} />
          ))}
        </div>
        <button aria-label="Siguiente" style={{ ...buttonStyle, marginLeft: "1rem" }} onClick={next}>&#9654;</button>
      </div>
    </section>
  );
};

export default Carousel;
