import { useInView } from "../hooks/use-in-view";
import { cn } from "../lib/utils";

export function Reveal({ children, className, delay = 0, direction = "up" }) {
  const { ref, inView } = useInView();
  const base = direction === "up" ? "translate-y-6" : 
               direction === "down" ? "-translate-y-6" : 
               direction === "left" ? "translate-x-6" : "-translate-x-6";

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        inView ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", base),
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}