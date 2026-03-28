import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-5 pointer-events-none"
    >
      <nav
        className={cn(
          "pointer-events-auto w-full max-w-5xl rounded-2xl transition-all duration-500 relative overflow-hidden",
          scrolled ? "glass-strong" : "glass"
        )}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-400/60 to-violet-500/0"
        />

        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_24px_rgba(139,92,246,0.6)] transition-shadow duration-300">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-8 4.5 8 4.5 8-4.5M12 12l8-4.5M12 12v9m-8-4.5v-9l8 4.5" />
              </svg>
            </div>
            <span className="text-white font-black text-lg tracking-tight">Agentryx</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={scrollTo(l.href)}
                className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white rounded-xl hover:bg-white/[0.06] transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl glass text-sm font-semibold text-white hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
          >
            Book a Consultation
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto absolute top-full mt-2 left-4 right-4 glass-strong rounded-2xl p-3 flex flex-col gap-1"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={scrollTo(l.href)}
              className="px-4 py-3 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            className="mt-1 px-4 py-3 rounded-xl text-center text-sm font-semibold text-white glass hover:bg-white/[0.07] transition-colors"
          >
            Book a Consultation
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
