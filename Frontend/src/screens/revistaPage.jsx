import React from "react";
import "./revistaPage.css";

export default function RevistaPage() {
  return (
    <div className="revista-container">
      <div className="revista-divider"></div>
      
      <div className="revista-hover-area">
        <img
          src="/media/revista/revista.png"
          alt="Portada Revista"
          className="revista-img"
        />
        <div className="revista-tooltip">
          Revista desarrollada por la carrera de Ing. de Sistemas
          <br />
          de la Universidad Católica Boliviana
        </div>
      </div>

      <p className="revista-footer-text">
        Edición especial — Universidad Católica Boliviana © 2026
      </p>
    </div>
  );
}