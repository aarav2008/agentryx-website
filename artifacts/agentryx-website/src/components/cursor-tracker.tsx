import { useEffect, useRef } from "react";

export function CursorTracker() {
  const orbRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -2000, y: -2000 });
  const pos = useRef({ x: -2000, y: -2000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Initialise at center so gradient doesn't flash from corner
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.4;
    target.current = { x: cx, y: cy };
    pos.current = { x: cx, y: cy };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Smooth lerp — both the orb AND the CSS-variable background gradient
      // trail behind the cursor with the same fluid lag
      pos.current.x = lerp(pos.current.x, target.current.x, 0.065);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.065);

      const { x, y } = pos.current;

      // Drive the visible orb
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      // Drive the full-page background gradient shift via CSS custom properties
      // (used in html::after in index.css)
      document.documentElement.style.setProperty("--cursor-px", `${x}px`);
      document.documentElement.style.setProperty("--cursor-py", `${y}px`);

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
      {/*
        Visible orb — .cursor-orb picks up `background: var(--orb-gradient)`
        from CSS so the colour updates automatically when the theme changes.
      */}
      <div
        ref={orbRef}
        className="cursor-orb"
        style={{
          position: "absolute",
          top: "-400px",
          left: "-400px",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />
    </div>
  );
}
