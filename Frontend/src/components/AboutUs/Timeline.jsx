import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export function Timeline({ items }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(items.length - 1, i + 1));

  return (
    <div className="w-full">
      {/* Timeline para desktop */}
      <div className="hidden md:flex items-center gap-4 select-none">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActive(idx)}
            className={cn(
              "flex-1 group p-3 rounded-lg transition-all relative",
              idx !== items.length - 1 && "pr-4",
              active === idx 
                ? "bg-[#F4E9D7]" 
                : "bg-transparent hover:bg-[#F4E9D7]/30"
            )}
            aria-current={active === idx}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "size-8 shrink-0 rounded-full border grid place-items-center text-xs font-semibold transition-all",
                  active === idx
                    ? "border-transparent text-white bg-[#072D42]"
                    : "border-[#072D42]/30 bg-white text-[#072D42]"
                )}
              >
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className={cn("text-sm", active === idx ? "text-[#072D42] font-medium" : "text-[#072D42]/70")}>
                  {item.label}
                </p>
                <div
                  className={cn(
                    "h-1 rounded-full mt-1 transition-all",
                    active === idx
                      ? "bg-[#072D42]"
                      : "bg-[#072D42]/20"
                  )}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Contenido de la timeline */}
      <div className="mt-6 border border-[#072D42]/20 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prev}
            className="p-2 rounded-md hover:bg-[#F4E9D7] text-[#072D42] transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-[#072D42]/60">
              {items[active].label}
            </p>
            <h4 className="font-serif text-2xl text-[#072D42] mt-1">
              {items[active].title}
            </h4>
          </div>
          <button
            onClick={next}
            className="p-2 rounded-md hover:bg-[#F4E9D7] text-[#072D42] transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <p className="text-[#072D42]/80 leading-relaxed">
          {items[active].description}
        </p>
      </div>

      {/* Indicadores para móvil */}
      <div className="md:hidden mt-4 flex items-center justify-center gap-2 text-xs text-[#072D42]/60">
        {items.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-6 rounded-full",
              i === active
                ? "bg-[#072D42]"
                : "bg-[#072D42]/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}