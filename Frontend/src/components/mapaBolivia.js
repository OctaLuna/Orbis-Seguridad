import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ReactComponent as BoliviaSVG } from "../assets/bolivia.svg";

const COLORS = {
  defaultFill: "#32302f",
  defaultStroke: "#ffffff",
  hoverFill: "#4b5563",
  selectedFill: "#d97706",
  selectedStroke: "#92400e",
};

const normalizarDepartamento = (valor) =>
  typeof valor === "string"
    ? valor.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";

const MapaBolivia = ({ onDepartamentoToggle, selectedDepartamentos = [] }) => {
  const svgRef = useRef(null);
  const [hoveredDepartamento, setHoveredDepartamento] = useState(null);

  const departamentosSeleccionados = useMemo(() => {
    return new Set(
      selectedDepartamentos
        .map(normalizarDepartamento)
        .filter((dep) => dep.length > 0)
    );
  }, [selectedDepartamentos]);

  const hoveredNormalizado = useMemo(() => {
    const normalizado = normalizarDepartamento(hoveredDepartamento);
    return normalizado || null;
  }, [hoveredDepartamento]);

  const actualizarEstilos = useCallback(() => {
    const svgElement = svgRef.current;
    if (!svgElement) {
      return;
    }

    const paths = svgElement.querySelectorAll("[name]");
    paths.forEach((path) => {
      const departamento = path.getAttribute("name") || "";
      const normalizado = normalizarDepartamento(departamento);
      const estaSeleccionado = departamentosSeleccionados.has(normalizado);
      const estaHover = hoveredNormalizado === normalizado;

      path.setAttribute("aria-pressed", estaSeleccionado ? "true" : "false");
      path.style.cursor = "pointer";
      path.style.transition = "fill 120ms ease, stroke 120ms ease, stroke-width 120ms ease, opacity 120ms ease";
      path.style.outline = "none";
      path.style.boxShadow = "none";
      path.style.border = "none";

      if (estaSeleccionado) {
        path.style.fill = COLORS.selectedFill;
        path.style.stroke = COLORS.selectedStroke;
        path.style.strokeWidth = "1.4";
        path.style.opacity = "0.95";
      } else if (estaHover) {
        path.style.fill = COLORS.hoverFill;
        path.style.stroke = COLORS.selectedStroke;
        path.style.strokeWidth = "1.1";
        path.style.opacity = "0.9";
      } else {
        path.style.fill = COLORS.defaultFill;
        path.style.stroke = COLORS.defaultStroke;
        path.style.strokeWidth = ".5";
        path.style.opacity = "0.8";
      }
    });
  }, [departamentosSeleccionados, hoveredNormalizado]);

  useEffect(() => {
    actualizarEstilos();
  }, [actualizarEstilos]);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) {
      return undefined;
    }

    const paths = Array.from(svgElement.querySelectorAll("[name]"));

    const manejarTecla = (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const nombre = event.currentTarget?.getAttribute("name");
      if (!nombre) {
        return;
      }

      event.preventDefault();
      onDepartamentoToggle?.(nombre);
    };

    paths.forEach((path) => {
      path.setAttribute("role", "button");
      path.setAttribute("tabindex", "0");
      path.style.outline = "none";
      path.style.boxShadow = "none";
      path.addEventListener("keydown", manejarTecla);
    });

    return () => {
      paths.forEach((path) => {
        path.removeEventListener("keydown", manejarTecla);
      });
    };
  }, [onDepartamentoToggle]);

  const obtenerNombreDepartamento = useCallback((event) => {
    const target = event.target.closest("[name]");
    return target ? target.getAttribute("name") : null;
  }, []);

  const manejarClick = useCallback(
    (event) => {
      const nombre = obtenerNombreDepartamento(event);
      if (!nombre) {
        return;
      }

      onDepartamentoToggle?.(nombre);
    },
    [obtenerNombreDepartamento, onDepartamentoToggle]
  );

  const manejarMouseOver = useCallback(
    (event) => {
      const nombre = obtenerNombreDepartamento(event);
      if (nombre) {
        setHoveredDepartamento(nombre);
      }
    },
    [obtenerNombreDepartamento]
  );

  const manejarMouseLeave = useCallback(() => {
    setHoveredDepartamento(null);
  }, []);

  return (
    <div className="w-full h-full flex items-start justify-center">
      <div
        className="w-full h-full flex items-start justify-center"
        style={{ transform: "translateY(-20px)" }}
      >
        <BoliviaSVG
          ref={svgRef}
          className="bolivia-map w-[150%] h-[150%]"
          onClick={manejarClick}
          onMouseOver={manejarMouseOver}
          onMouseLeave={manejarMouseLeave}
        />
      </div>
    </div>
  );
};

export default MapaBolivia;