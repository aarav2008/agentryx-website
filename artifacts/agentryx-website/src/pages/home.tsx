import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Bot, BrainCircuit, UserCog, ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Helpers ─────────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease },
  };
}
function inView(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.85, delay, ease },
  };
}

/* ─── Counter ─────────────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, {
      duration: 2.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── Magnetic Button ─────────────────────────────────────── */
function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─── Glass Card ──────────────────────────────────────────── */
function Card({ children, className, strong = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { strong?: boolean }) {
  return (
    <div className={cn("rounded-2xl shimmer-card", strong ? "glass-strong" : "glass", className)} {...props}>
      {children}
    </div>
  );
}

/* ─── Marquee ─────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "AI Workflow Automation",
  "Machine Learning",
  "Digital Workers",
  "Autonomous Agents",
  "Data Pipelines",
  "Enterprise AI",
  "Intelligent Systems",
  "Process Automation",
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden py-5 border-y border-white/[0.05]" style={{ background: "rgba(255,255,255,0.012)" }}>
      <div className="marquee flex gap-0 w-max">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-0 shrink-0">
            <span className="text-sm font-medium text-foreground/30 tracking-wide uppercase px-8 whitespace-nowrap">{item}</span>
            <span className="text-primary/35 text-lg">·</span>
          </div>
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

/* ─── Blobs ───────────────────────────────────────────────── */
function Blobs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Blob colours are driven by CSS custom properties so they adapt to each theme */}
      <div
        className="blob"
        style={{
          width: 700, height: 700,
          top: "-15%", left: "10%",
          background: "radial-gradient(circle, var(--blob-1-from) 0%, var(--blob-1-to) 60%, transparent 80%)",
          animation: "blob-drift-1 22s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 600, height: 600,
          top: "30%", right: "-10%",
          background: "radial-gradient(circle, var(--blob-2-from) 0%, var(--blob-2-to) 60%, transparent 80%)",
          animation: "blob-drift-2 28s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 500, height: 500,
          bottom: "10%", left: "30%",
          background: "radial-gradient(circle, var(--blob-3-from) 0%, var(--blob-3-to) 60%, transparent 80%)",
          animation: "blob-drift-3 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Blobs />

      <main className="relative z-10 w-full">

        {/* ─── HERO ──────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden"
        >
          {/* Decorative large background text */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <span
              className="text-[clamp(100px,22vw,280px)] font-black tracking-tighter leading-none text-stroke opacity-60"
              style={{ letterSpacing: "-0.04em" }}
            >
              AGENTRYX
            </span>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

            {/* Eyebrow */}
            <motion.div {...fadeUp(0.1)} className="mb-10">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-widest text-violet-300/80">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                AI Automation & Machine Learning
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div {...fadeUp(0.2)} className="mb-6">
              <h1 className="text-[clamp(48px,7.5vw,96px)] font-black leading-[1.02] tracking-tight">
                <span className="block text-gradient">Intelligent</span>
                <span className="block text-stroke-accent">Automation</span>
                <span className="block text-foreground/90">for the Modern</span>
                <span className="block text-foreground">Enterprise.</span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.35)}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
            >
              Agentryx builds bespoke AI solutions, machine learning models, and digital workers to eliminate fragmented workflows and scale your operations.
            </motion.p>

            {/* CTA */}
            <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton
                href="#contact"
                onClick={scrollTo("#contact")}
                className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full glass-strong text-foreground font-semibold text-base hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                Book a Consultation
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <a
                href="#services"
                onClick={scrollTo("#services")}
                className="text-sm text-muted-foreground hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/20"
              >
                See what we do
              </a>
            </motion.div>

          </div>

          {/* Floating stat chips */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute bottom-12 inset-x-0 pointer-events-none flex justify-center"
          >
            <div className="flex gap-3 flex-wrap justify-center px-6">
              {[
                { label: "AI Automation", sub: "End-to-end" },
                { label: "ML Models", sub: "Custom trained" },
                { label: "Digital Workers", sub: "24/7 autonomous" },
              ].map((chip, i) => (
                <div
                  key={chip.label}
                  className={cn("glass rounded-xl px-5 py-3 flex flex-col items-center gap-0.5", `float-${i + 1}`)}
                >
                  <span className="text-xs font-semibold text-foreground/80">{chip.label}</span>
                  <span className="text-[10px] text-muted-foreground">{chip.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── MARQUEE ─────────────────────────────────────── */}
        <Marquee />

        {/* ─── SERVICES BENTO ──────────────────────────────── */}
        <section id="services" className="py-36 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-16">
              <p className="text-xs uppercase tracking-widest text-violet-400/80 font-semibold mb-4">What We Do</p>
              <div className="flex items-end gap-6 flex-wrap">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                  <span className="text-foreground">End-to-end</span>
                  <br />
                  <span className="text-gradient">AI capability.</span>
                </h2>
                <p className="text-muted-foreground max-w-xs text-base mb-1 leading-relaxed">
                  From strategy to production. Not consulting theatre — real systems that run.
                </p>
              </div>
            </motion.div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

              {/* Card 1 — Large */}
              <motion.div {...inView(0)} className="md:col-span-3">
                <Card className="p-9 h-full min-h-[300px] flex flex-col justify-between group cursor-default">
                  <div>
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-7 group-hover:border-violet-500/30 transition-colors duration-500 border border-white/[0.06]">
                      <Bot className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">AI Workflow Automation</h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      Streamlining complex operational logistics and data pipelines. We design autonomous systems that connect your existing tools and eliminate the manual work holding your teams back — permanently.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm text-violet-400/70 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>24/7 autonomous operation</span>
                  </div>
                </Card>
              </motion.div>

              {/* Card 2 — Small */}
              <motion.div {...inView(0.08)} className="md:col-span-2">
                <Card className="p-9 h-full min-h-[300px] flex flex-col justify-between group cursor-default">
                  <div>
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-7 group-hover:border-violet-500/30 transition-colors duration-500 border border-white/[0.06]">
                      <BrainCircuit className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Machine Learning Implementation</h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      Custom model training and integration tailored to your specific business logic. Your proprietary data, turned into a competitive moat.
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Card 3 — Full width */}
              <motion.div {...inView(0.16)} className="md:col-span-5">
                <Card strong className="p-9 flex flex-col md:flex-row gap-10 md:items-center group cursor-default">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-7 group-hover:border-violet-500/30 transition-colors duration-500 border border-white/[0.06]">
                      <UserCog className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Digital Workers</h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px] max-w-lg">
                      Autonomous AI agents designed to handle repetitive administrative and operational tasks. They work around the clock, integrate with your existing stack, and scale as your business grows.
                    </p>
                  </div>
                  {/* Visual accent */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-white/[0.06] animate-spin" style={{ animationDuration: "20s" }} />
                      <div className="absolute inset-4 rounded-full border border-violet-500/20 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                      <div className="absolute inset-8 rounded-full border border-white/[0.04] animate-spin" style={{ animationDuration: "10s" }} />
                      <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                        <UserCog className="w-6 h-6 text-violet-300" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── STATS ───────────────────────────────────────── */}
        <section className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
            >
              <Card strong className="px-8 py-12 md:px-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x-0 md:divide-x divide-border">
                  {[
                    { label: "Workflows Automated", to: 140, suffix: "+" },
                    { label: "Hours Saved / Month", to: 12000, suffix: "+" },
                    { label: "ML Models Deployed", to: 38, suffix: "" },
                    { label: "Enterprise Clients", to: 24, suffix: "+" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex flex-col items-center gap-2 px-4">
                      <span className="text-4xl md:text-5xl font-black text-gradient">
                        <Counter to={stat.to} suffix={stat.suffix} />
                      </span>
                      <span className="text-sm text-muted-foreground leading-tight text-center">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ─── ABOUT ───────────────────────────────────────── */}
        <section id="about" className="py-36 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

              <motion.div {...inView()}>
                <p className="text-xs uppercase tracking-widest text-violet-400/80 font-semibold mb-5">About Agentryx</p>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.05] mb-8">
                  We don't sell
                  <br />
                  <span className="text-stroke-accent">
                    vaporware.
                  </span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-[16px]">
                  <p>
                    Agentryx was founded on a simple premise: AI is moving faster than most companies can adapt. While the world debates theory, we focus on practical deployment today.
                  </p>
                  <p>
                    We're a lean, deeply technical team of engineers, data scientists, and strategists. We build actual systems — agents, integrations, models — that reduce costs and multiply capabilities.
                  </p>
                  <p className="text-foreground/70 font-medium">
                    If you want to stop talking about AI and start using it to win, you're in the right place.
                  </p>
                </div>

                {/* Pillars */}
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    { icon: Layers, label: "AI-First" },
                    { icon: Sparkles, label: "Results-Driven" },
                    { icon: BrainCircuit, label: "Enterprise-Ready" },
                  ].map((p) => (
                    <div key={p.label} className="glass rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                      <p.icon className="w-5 h-5 text-violet-400" />
                      <span className="text-xs font-semibold text-foreground/70">{p.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Abstract visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, ease }}
                className="relative flex items-center justify-center aspect-square"
              >
                <div className="absolute inset-0 rounded-full bg-violet-600/10 blur-[80px]" />
                {/* Orbiting rings */}
                <div className="relative w-[85%] h-[85%] flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-white/[0.07] animate-spin" style={{ animationDuration: "30s" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-400/60 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                  </div>
                  {/* Mid ring */}
                  <div className="absolute inset-8 rounded-full border border-violet-500/20 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400/70 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  </div>
                  {/* Inner ring */}
                  <div className="absolute inset-16 rounded-full border border-white/[0.05] animate-spin" style={{ animationDuration: "12s" }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/60" />
                  </div>
                  {/* Core */}
                  <div className="relative z-10 w-28 h-28 rounded-full glass-strong flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.25)]">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm">
                      <BrainCircuit className="w-7 h-7 text-violet-300" />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── CONTACT ─────────────────────────────────────── */}
        <section id="contact" className="py-36 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()}>
              <Card
                strong
                className="relative overflow-hidden p-12 md:p-20 text-center flex flex-col items-center"
              >
                {/* Top glow */}
                <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-violet-500/15 blur-[100px] pointer-events-none" />

                {/* Decorative corner accents */}
                <div aria-hidden className="absolute top-0 left-0 w-24 h-24 rounded-br-full border-r border-b border-white/[0.05]" />
                <div aria-hidden className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full border-l border-t border-white/[0.05]" />

                <p className="text-xs uppercase tracking-widest text-violet-400/80 font-semibold mb-5 relative z-10">
                  Get In Touch
                </p>
                <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.08] mb-5 relative z-10">
                  Ready to transform
                  <br />
                  <span className="text-gradient">your operations?</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-12 relative z-10 leading-relaxed">
                  Let's identify where AI can deliver immediate, measurable impact for your business.
                </p>
                <MagneticButton
                  href="mailto:hello@agentryx.com"
                  className="relative z-10 group inline-flex items-center gap-2.5 px-10 py-4 rounded-full glass font-semibold text-foreground text-base hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
                >
                  hello@agentryx.com
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
              </Card>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
