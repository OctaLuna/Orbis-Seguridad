import { useEffect, useMemo, useState } from "react";
import { cn } from "../lib/utils";

export default function MobileTopNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? null);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => Boolean(el));

    if (elements.length === 0) return;

    const handleInitial = () => {
      const byTop = [...elements].sort((a, b) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top))[0];
      if (byTop?.id) setActive(byTop.id);
    };

    handleInitial();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target && visible.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const onClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <nav aria-label="Secciones" className="md:hidden sticky top-0 z-50 w-full px-3 py-3 bg-white/95 backdrop-blur-sm border-b border-[#072D42]/10">
      <div className="w-full max-w-full overflow-x-auto scrollbar-hide">
        <ul className="flex items-center gap-2 min-w-max px-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="flex-shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={onClick(s.id)}
                  className={cn(
                    "group relative block px-4 py-2 rounded-lg transition-all duration-200",
                    "text-sm font-medium whitespace-nowrap",
                    isActive
                      ? "bg-[#072D42] text-white border border-[#072D42]"
                      : "bg-white text-[#072D42]/80 border border-[#072D42]/20 hover:bg-[#F4E9D7] hover:text-[#072D42]"
                  )}
                >
                  <span className="relative flex items-center justify-center">
                    {s.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-1 left-1/4 h-0.5 rounded-full bg-[#F29E38] transition-all duration-300",
                        isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                      )}
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}