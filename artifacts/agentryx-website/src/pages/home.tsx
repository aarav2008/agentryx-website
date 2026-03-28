import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  Bot, BrainCircuit, UserCog, ArrowUpRight, Layers, Sparkles,
  Search, CheckCircle, GitBranch, Activity, BarChart3, Shield,
  Zap, Database, TrendingUp, MessageSquareQuote, ChevronRight,
  Plus, Minus, Clock, Repeat, Users, Server, Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Constants ────────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Motion helpers ───────────────────────────────────────── */
function fadeUp(delay = 0) {
  return { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.95, delay, ease } };
}
function inView(delay = 0) {
  return { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.8, delay, ease } };
}

/* ─── Counter ──────────────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(count, to, { duration: 2.2, ease: "easeOut", onUpdate: (v) => setDisplay(decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()) });
    return ctrl.stop;
  }, [isInView, to]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── Magnetic Button ──────────────────────────────────────── */
function MagneticButton({ children, className, href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: (e: React.MouseEvent) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  }, [x, y]);
  return (
    <motion.a ref={ref} href={href} onClick={onClick} style={{ x, y }} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>
      {children}
    </motion.a>
  );
}

/* ─── Glass Card ───────────────────────────────────────────── */
function Card({ children, className, strong = false, ...p }: React.HTMLAttributes<HTMLDivElement> & { strong?: boolean }) {
  return <div className={cn("rounded-2xl shimmer-card", strong ? "glass-strong" : "glass", className)} {...p}>{children}</div>;
}

/* ══════════════════════ DATA ══════════════════════════════════ */

const SERVICES = [
  {
    icon: Bot, color: "violet",
    title: "AI Workflow Automation",
    desc: "We design autonomous systems that connect your entire operation and eliminate manual work permanently. From order routing to invoice processing — running 24/7 without intervention.",
    tags: ["Multi-agent pipelines", "API orchestration", "Zero-downtime rollout"],
    stat: "84% avg. time reduction",
    gradient: "from-violet-500 to-purple-600",
    iconBg: "rgba(139,92,246,0.12)",
    textAccent: "text-violet-400",
  },
  {
    icon: BrainCircuit, color: "blue",
    title: "Machine Learning Implementation",
    desc: "Custom model training on your proprietary data. Risk engines, NLP extractors, recommendation systems — deployed to production, not to slides.",
    tags: ["Fine-tuning & RLHF", "Real-time inference", "Domain adaptation"],
    stat: "96% avg. accuracy achieved",
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "rgba(59,130,246,0.12)",
    textAccent: "text-blue-400",
  },
  {
    icon: UserCog, color: "emerald",
    title: "Digital Workers",
    desc: "Autonomous AI agents that handle repetitive operational tasks around the clock. They integrate with your existing stack, scale on demand, and never call in sick.",
    tags: ["24/7 autonomous ops", "Stack-native integration", "Elastic scaling"],
    stat: "3× headcount leverage",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "rgba(16,185,129,0.12)",
    textAccent: "text-emerald-400",
  },
];

const CASE_STUDIES = [
  {
    id: "01", company: "NexusCorp", industry: "E-Commerce",
    challenge: "15,000+ daily orders routed manually across 6 disconnected systems",
    solution: "Multi-agent autonomous routing, fulfillment, and returns management integrated with ERP, WMS, and 12 carrier APIs.",
    metric: "84%", metricLabel: "Reduction in processing time",
    secondary: "0 headcount added · 3× revenue growth",
    tags: ["AI Automation", "Digital Workers", "ERP Integration"],
    accentClass: "from-violet-500 to-indigo-500",
    textAccent: "text-violet-400",
  },
  {
    id: "02", company: "Apex Financial", industry: "Fintech",
    challenge: "Legacy fraud detection lagged 48 hours behind live transactions",
    solution: "Real-time ML risk engine scoring 50,000+ transactions/hour with custom feature engineering.",
    metric: "$2.3M", metricLabel: "Fraud prevented — first quarter",
    secondary: "Detection latency: 48h → 3.2 seconds",
    tags: ["Machine Learning", "Real-time Inference", "Risk"],
    accentClass: "from-blue-500 to-cyan-500",
    textAccent: "text-blue-400",
  },
  {
    id: "03", company: "MedFlow Health", industry: "Healthcare",
    challenge: "200+ unstructured clinical notes per day entered into EHR manually",
    solution: "Fine-tuned NLP extraction and normalization pipeline on domain-specific clinical terminology.",
    metric: "96%", metricLabel: "Accuracy in data extraction",
    secondary: "3 FTEs redeployed to patient care",
    tags: ["NLP", "Data Pipeline", "Healthcare AI"],
    accentClass: "from-emerald-500 to-teal-500",
    textAccent: "text-emerald-400",
  },
];

const PROCESS_STEPS = [
  { n: "01", icon: Search, title: "Discovery & Audit", desc: "We map your workflows, identify the highest-ROI automation opportunities, and define measurable success criteria before writing a line of code." },
  { n: "02", icon: GitBranch, title: "Solution Architecture", desc: "We design the full system — agents, models, data flows, integrations — and produce a technical blueprint you review and approve." },
  { n: "03", icon: Zap, title: "Build & Integrate", desc: "Engineering-led implementation with staged rollout, full test coverage, and zero-disruption integration into your live production stack." },
  { n: "04", icon: Activity, title: "Deploy & Monitor", desc: "Production launch with real-time observability, alerting, and 90 days of optimization included before we hand over the keys." },
];

const AGENTS = [
  { id: "NX-001", name: "NEXUS",  role: "Order Routing Agent",       client: "NexusCorp",       tasks: 15247,    uptime: 99.8, status: "live",     model: "LangGraph + GPT-4o" },
  { id: "AP-002", name: "APEX",   role: "Risk Scoring Engine",        client: "Apex Financial",  tasks: 8934281,  uptime: 99.2, status: "live",     model: "Custom XGBoost + LSTM" },
  { id: "MF-003", name: "MEDIX",  role: "Clinical NLP Extractor",     client: "MedFlow Health",  tasks: 42918,    uptime: 98.9, status: "live",     model: "Fine-tuned Llama 3.1" },
  { id: "GL-004", name: "GLIDE",  role: "Lead Qualification Agent",   client: "Undisclosed",     tasks: 29104,    uptime: 100,  status: "live",     model: "GPT-4o + CrewAI" },
  { id: "AT-005", name: "ATLAS",  role: "Financial Reconciliation",   client: "Undisclosed",     tasks: 174839,   uptime: 99.5, status: "training", model: "Claude 3.5 + Custom" },
  { id: "VX-006", name: "VERTEX", role: "Document Intelligence",      client: "Undisclosed",     tasks: 63491,    uptime: 99.1, status: "live",     model: "Mistral Large + RAG" },
];

const TECH_STACK_LAYERS = [
  { layer: "Monitoring & Observability", tools: ["Custom Dashboard", "Prometheus", "PagerDuty", "OpenTelemetry"], color: "emerald", icon: Activity },
  { layer: "Infrastructure",             tools: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform"],      color: "cyan",    icon: Server },
  { layer: "Data & Memory",              tools: ["PostgreSQL", "Pinecone", "Redis", "Snowflake", "S3"],            color: "blue",    icon: Database },
  { layer: "Orchestration",              tools: ["LangGraph", "CrewAI", "Custom Framework", "n8n", "Temporal"],   color: "indigo",  icon: GitBranch },
  { layer: "Foundation Models",          tools: ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1 70B", "Mistral Large"], color: "violet", icon: BrainCircuit },
];

const TESTIMONIALS = [
  { quote: "Agentryx didn't just build us a tool — they fundamentally changed how our operations team functions. We haven't added headcount in eight months despite three-times growth. That's the real metric.", name: "David Chen", role: "COO", company: "NexusCorp", initials: "DC" },
  { quote: "Their ML model caught $2.3M in fraud in the first quarter alone. The ROI conversation was over in week one. I genuinely wish we'd engaged them two years earlier.", name: "Sarah Okafor", role: "CTO", company: "Apex Financial", initials: "SO" },
  { quote: "Six weeks from kickoff to production — unheard of for a project this complex. Their team understands enterprise constraints and moves fast anyway. No hand-holding required.", name: "Marcus Reid", role: "Head of Data", company: "MedFlow Health", initials: "MR" },
];

const INTEGRATIONS_ROW1 = ["Salesforce", "HubSpot", "Slack", "Notion", "AWS", "OpenAI", "Google Cloud", "Microsoft Azure", "Zapier", "Airtable"];
const INTEGRATIONS_ROW2 = ["PostgreSQL", "Snowflake", "Stripe", "Twilio", "Jira", "Shopify", "Zendesk", "MongoDB", "Databricks", "Pinecone"];

const TEAM = [
  { name: "Aarav Patel", role: "Founder & CEO", init: "AP", deptColor: "from-violet-500 to-purple-600", bio: "10 years in enterprise software. Former ML engineer at Google. Built the agent framework powering every Agentryx deployment.", focus: "AI Strategy & Architecture" },
  { name: "Dr. Sarah Mitchell", role: "Chief Technology Officer", init: "SM", deptColor: "from-blue-500 to-cyan-600", bio: "PhD CS, Stanford. Led ML infrastructure at two successful fintech and healthtech exits. Expert in scalable inference systems.", focus: "ML Systems & Infrastructure" },
  { name: "James Whitfield", role: "Head of Engineering", init: "JW", deptColor: "from-indigo-500 to-blue-600", bio: "Ex-Principal Engineer at Palantir. Architected distributed systems processing billions of daily events across three continents.", focus: "Agent Systems & Integration" },
  { name: "Leila Hassan", role: "Head of Data Science", init: "LH", deptColor: "from-emerald-500 to-teal-600", bio: "Ex-OpenAI researcher. Specialist in fine-tuning, RLHF, and production NLP models. Published 12 peer-reviewed papers.", focus: "NLP & Model Training" },
];

const FAQ_ITEMS = [
  { q: "What industries do you work with?", a: "We work across financial services, healthcare, logistics, e-commerce, and SaaS. Our focus is any company with high-volume operational workflows. If your team spends hours on tasks that follow rules, we can automate them." },
  { q: "How long does a typical engagement take?", a: "Discovery takes 1–2 weeks. A full build-and-deploy engagement typically runs 4–10 weeks depending on complexity and integrations. We always agree on milestones and deliverables upfront — no ambiguous timelines." },
  { q: "How do you price your work?", a: "We work on a project basis (fixed scope, fixed fee) or a retainer model for ongoing work. Every engagement starts with a scoped Discovery Sprint so you know exactly what you're getting before committing to a full build." },
  { q: "Will this work with our existing tools?", a: "Yes. We integrate with over 50 platforms out of the box — CRMs, ERPs, cloud providers, data warehouses, and communication tools. We don't require you to rip and replace anything." },
  { q: "Do you replace our employees?", a: "No — we automate the tasks that slow your employees down. Our clients consistently redeploy, not reduce, their teams. The result is higher-value work, not redundancies." },
  { q: "What happens after launch?", a: "Every engagement includes 90 days of production monitoring and optimization as standard. After that, you can self-manage or move to a Managed AI retainer for continuous improvements." },
];

const ENGAGEMENTS = [
  {
    name: "Discovery Sprint", duration: "1–2 weeks", icon: Search,
    desc: "A rapid audit of your workflows and systems. We deliver a concrete automation blueprint with ROI projections — before you commit to a build.",
    features: ["Full workflow mapping", "Automation opportunity analysis", "Technical feasibility report", "ROI projections", "Solution blueprint"],
    highlight: false,
  },
  {
    name: "Build & Ship", duration: "4–10 weeks", icon: Zap,
    desc: "End-to-end implementation from architecture to production. Integration, testing, staged rollout, and 90 days of monitoring included.",
    features: ["Everything in Discovery", "Full system build & integration", "CI/CD & test coverage", "Staged production rollout", "90-day monitoring"],
    highlight: true,
  },
  {
    name: "Managed AI", duration: "Ongoing retainer", icon: Repeat,
    desc: "A monthly partnership for continuous optimization, retraining, new automations, and strategic AI advisory as your business scales.",
    features: ["All Build & Ship benefits", "Continuous model optimization", "Retraining on new data", "New automation additions", "Dedicated engineer access"],
    highlight: false,
  },
];

const TICKER_ITEMS = [
  "● NX-001 NEXUS — processed 847 orders in the last hour",
  "● AP-002 APEX — scored 14,293 transactions · 3 flagged high risk",
  "● MF-003 MEDIX — extracted 94 clinical notes with 96.2% accuracy",
  "● GL-004 GLIDE — qualified 312 leads · routed to CRM",
  "● System-wide uptime: 99.2% · all 6 agents operational",
  "● ATLAS — 6,847 reconciliation entries processed overnight",
  "● VERTEX — classified 1,204 documents · zero manual review needed",
  "● 12,847 automated tasks completed today · $0 in manual labour",
];

/* ══════════════════════ COMPONENTS ══════════════════════════ */

/* ─── Ticker Strip ─────────────────────────────────────────── */
function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-b border-border/60 bg-emerald-500/[0.03]" style={{ height: 34 }}>
      <div className="ticker-anim flex items-center gap-0 w-max h-full">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-[11px] font-mono text-emerald-400/60 px-8 whitespace-nowrap tracking-wide">{item}</span>
            <span className="text-emerald-500/20 text-base">·</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}

/* ─── Live Dashboard ───────────────────────────────────────── */
const BAR_VALUES = [38, 54, 48, 70, 85, 66, 91, 82, 96, 79, 92, 100];
const ACTIVITY = [
  { msg: "NX-001 — Order #48291 routed → fulfillment center LA", t: "0.3s", ok: true },
  { msg: "AP-002 — TXN-99234 flagged · risk score 94/100", t: "1.1s", ok: false },
  { msg: "MF-003 — Clinical note #8829 extracted & normalized", t: "2.4s", ok: true },
  { msg: "GL-004 — 312 leads qualified and synced to Salesforce", t: "4.7s", ok: true },
  { msg: "VX-006 — Contract batch #44 classified · 99% confidence", t: "6.0s", ok: true },
];

function LiveDashboard() {
  return (
    <Card strong className="p-5 space-y-4 text-left glow-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-blink" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold font-mono">LIVE SYSTEM</span>
        </div>
        <span className="text-[11px] text-emerald-400 font-medium font-mono">6/6 AGENTS ACTIVE</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { val: "12,847", label: "Tasks today", icon: BarChart3, c: "text-violet-400" },
          { val: "99.2%",  label: "Uptime avg",  icon: CheckCircle, c: "text-emerald-400" },
          { val: "3.2s",   label: "Avg latency", icon: Zap, c: "text-blue-400" },
          { val: "$0",     label: "Manual errors", icon: Shield, c: "text-cyan-400" },
        ].map((k) => (
          <div key={k.label} className="glass rounded-xl p-3">
            <k.icon className={cn("w-3 h-3 mb-1.5", k.c)} />
            <div className={cn("text-lg font-black leading-none mb-0.5", k.c)}>{k.val}</div>
            <div className="text-[10px] text-muted-foreground font-mono">{k.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-muted-foreground">THROUGHPUT / HOUR</span>
          <span className="text-[10px] text-violet-400 font-mono">↑ 23% vs yesterday</span>
        </div>
        <div className="flex items-end gap-1 h-12">
          {BAR_VALUES.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t-[2px]"
              style={{ background: `linear-gradient(to top, rgba(139,92,246,0.8), rgba(99,102,241,0.5))`, height: "0%" }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.3 + i * 0.04, duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold font-mono mb-2">RECENT EVENTS</div>
        {ACTIVITY.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.1 }}
            className="flex items-center gap-2 text-[11px] font-mono">
            <span className={cn("w-1.5 h-1.5 flex-shrink-0 rounded-full", item.ok ? "bg-emerald-400/80" : "bg-amber-400/80")} />
            <span className="text-muted-foreground flex-1 truncate">{item.msg}</span>
            <span className="text-muted-foreground/30 flex-shrink-0">{item.t}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

/* ─── FAQ Accordion ────────────────────────────────────────── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div {...inView(index * 0.06)}>
      <button onClick={() => setOpen(!open)}
        className="w-full text-left glass rounded-2xl px-6 py-5 flex items-center justify-between gap-4 hover:border-primary/25 transition-all duration-300 border border-border group">
        <span className="text-[15px] font-semibold text-foreground/90 group-hover:text-foreground transition-colors">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full glass-strong border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
            <div className="px-6 py-4 text-[14px] text-muted-foreground leading-relaxed border-x border-b border-border/50 rounded-b-2xl -mt-2">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Marquee ──────────────────────────────────────────────── */
const MARQUEE_ITEMS = ["AI Workflow Automation", "Machine Learning", "Digital Workers", "Autonomous Agents", "Data Pipelines", "Enterprise AI", "Intelligent Systems", "Process Automation"];
function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={cn("flex gap-0 w-max", reverse ? "marquee-reverse" : "marquee")}>
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <div key={i} className="flex items-center gap-0 shrink-0">
          <span className="text-sm font-medium text-foreground/25 tracking-wide uppercase px-8 whitespace-nowrap">{item}</span>
          <span className="text-primary/30 text-lg">·</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Agent Row ────────────────────────────────────────────── */
function AgentRow({ agent, i }: { agent: typeof AGENTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const uptimePct = `${agent.uptime}%`;

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -12 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.5 }}
      className="grid grid-cols-12 gap-4 px-5 py-4 border-t border-border/40 items-center hover:bg-white/[0.015] transition-colors group">
      <div className="col-span-2 font-mono text-[11px] text-muted-foreground/50">{agent.id}</div>
      <div className="col-span-2">
        <span className="font-mono font-black text-[13px] tracking-wider bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{agent.name}</span>
      </div>
      <div className="col-span-3 text-[12px] text-foreground/70">{agent.role}</div>
      <div className="col-span-2 font-mono text-[12px] text-foreground/60">{agent.tasks.toLocaleString()}</div>
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
            {isInView && (
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: uptimePct, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
            )}
          </div>
          <span className="font-mono text-[11px] text-emerald-400/80 w-10 text-right">{agent.uptime}%</span>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-end">
        {agent.status === "live" ? (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-blink" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Live</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 spin-slow" style={{ border: "1px dashed rgba(251,191,36,0.5)" }} />
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Training</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Blobs ────────────────────────────────────────────────── */
function Blobs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="blob" style={{ width: 700, height: 700, top: "-15%", left: "10%", background: "radial-gradient(circle, var(--blob-1-from) 0%, var(--blob-1-to) 60%, transparent 80%)", animation: "blob-drift-1 22s ease-in-out infinite" }} />
      <div className="blob" style={{ width: 600, height: 600, top: "30%", right: "-10%", background: "radial-gradient(circle, var(--blob-2-from) 0%, var(--blob-2-to) 60%, transparent 80%)", animation: "blob-drift-2 28s ease-in-out infinite" }} />
      <div className="blob" style={{ width: 500, height: 500, bottom: "10%", left: "30%", background: "radial-gradient(circle, var(--blob-3-from) 0%, var(--blob-3-to) 60%, transparent 80%)", animation: "blob-drift-3 18s ease-in-out infinite" }} />
    </div>
  );
}

/* ══════════════════════ HOME PAGE ════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrollTo = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <Blobs />
      <main className="relative z-10 w-full">

        {/* ═══ TICKER ══════════════════════════════════════════ */}
        <div className="pt-[72px]">
          <TickerStrip />
        </div>

        {/* ═══ HERO ════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-[calc(100vh-106px)] flex items-center py-16 overflow-hidden bg-grid">
          <div aria-hidden className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="text-[clamp(70px,16vw,200px)] font-black tracking-tighter leading-none text-stroke opacity-30" style={{ letterSpacing: "-0.04em" }}>AGENTRYX</span>
          </div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div {...fadeUp(0.05)} className="mb-8">
                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-border text-[11px] font-bold uppercase tracking-[0.15em] text-primary/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary status-blink" />
                  AI-First Enterprise Automation
                </span>
              </motion.div>

              <motion.div {...fadeUp(0.15)} className="mb-6">
                <h1 className="text-[clamp(40px,5.5vw,76px)] font-black leading-[1.01] tracking-tight">
                  <span className="block text-gradient" style={{ textShadow: "0 0 60px rgba(139,92,246,0.25)" }}>Intelligent</span>
                  <span className="block text-stroke-accent">Automation</span>
                  <span className="block text-foreground/85">for the Modern</span>
                  <span className="block text-foreground">Enterprise.</span>
                </h1>
              </motion.div>

              <motion.p {...fadeUp(0.28)} className="text-base md:text-[17px] text-muted-foreground max-w-lg leading-relaxed mb-10">
                Agentryx builds bespoke AI systems, machine learning models, and autonomous digital workers that eliminate fragmented workflows and scale operations — without adding headcount.
              </motion.p>

              <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <MagneticButton href="#contact" onClick={scrollTo("#contact")}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_45px_rgba(139,92,246,0.55)] transition-all duration-300 cursor-pointer">
                  Book a Consultation
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
                <a href="#work" onClick={scrollTo("#work")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mt-1">
                  View our work <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              <motion.div {...fadeUp(0.48)} className="flex items-center gap-8 pt-6 border-t border-border/50">
                {[
                  { val: "140+", label: "Workflows automated", c: "text-violet-400" },
                  { val: "24+",  label: "Enterprise clients",  c: "text-blue-400" },
                  { val: "12k+", label: "Hours saved / month", c: "text-emerald-400" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className={cn("text-2xl font-black leading-none", s.c)}>{s.val}</span>
                    <span className="text-[11px] text-muted-foreground mt-1 font-mono">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.4, ease }} className="hidden lg:block">
              <LiveDashboard />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ MARQUEE ═════════════════════════════════════════ */}
        <div className="relative overflow-hidden py-4 border-y border-border/40">
          <Marquee />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>

        {/* ═══ SERVICES ════════════════════════════════════════ */}
        <section id="services" className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// CAPABILITIES</p>
              <div className="flex items-end gap-8 flex-wrap">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  <span className="text-foreground">Three core</span><br />
                  <span className="text-gradient">disciplines.</span>
                </h2>
                <p className="text-muted-foreground max-w-xs text-[15px] leading-relaxed">End-to-end. Strategy to production. No consulting theatre.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICES.map((svc, i) => (
                <motion.div key={svc.title} {...inView(i * 0.1)}>
                  <Card className={cn("p-8 h-full flex flex-col group cursor-default relative overflow-hidden")} style={{ borderColor: "transparent" }}>
                    <div className={cn("absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r opacity-70", svc.gradient)} />
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-border group-hover:border-primary/20 transition-colors duration-500 shrink-0" style={{ background: svc.iconBg }}>
                      <svc.icon className={cn("w-5 h-5", svc.textAccent)} />
                    </div>
                    <div className={cn("text-[10px] font-mono font-bold mb-3 tracking-widest uppercase", svc.textAccent)}>{svc.stat}</div>
                    <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">{svc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[13px] mb-6 flex-1">{svc.desc}</p>
                    <div className="flex flex-col gap-1.5">
                      {svc.tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                          <CheckCircle className={cn("w-3 h-3 flex-shrink-0", svc.textAccent)} />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CASE STUDIES ════════════════════════════════════ */}
        <section id="work" className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// SELECTED WORK</p>
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  <span className="text-foreground">Results that</span><br />
                  <span className="text-gradient">speak plainly.</span>
                </h2>
                <p className="text-muted-foreground max-w-xs text-[15px] leading-relaxed">Three clients. Real numbers. No case-study theatre.</p>
              </div>
            </motion.div>

            <motion.div {...inView(0)} className="mb-4">
              <Card strong className="relative overflow-hidden group cursor-default">
                <div className={cn("absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r", CASE_STUDIES[0].accentClass)} />
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[11px] font-black font-mono text-muted-foreground/40 tracking-widest">{CASE_STUDIES[0].id}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground px-2.5 py-1 rounded-full border border-border">{CASE_STUDIES[0].industry}</span>
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">{CASE_STUDIES[0].company}</h3>
                    <p className="text-sm text-muted-foreground/60 mb-5 italic font-medium">"{CASE_STUDIES[0].challenge}"</p>
                    <p className="text-[14px] text-muted-foreground leading-relaxed mb-7">{CASE_STUDIES[0].solution}</p>
                    <div className="flex flex-wrap gap-2">
                      {CASE_STUDIES[0].tags.map((t) => (
                        <span key={t} className="text-[11px] px-3 py-1 rounded-full glass border border-border text-muted-foreground font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <div className={cn("text-[clamp(80px,12vw,120px)] font-black leading-none bg-gradient-to-r bg-clip-text text-transparent", CASE_STUDIES[0].accentClass)} style={{ textShadow: "none", filter: "drop-shadow(0 0 30px rgba(139,92,246,0.4))" }}>
                      {CASE_STUDIES[0].metric}
                    </div>
                    <p className="text-base font-semibold text-foreground/70 mt-2">{CASE_STUDIES[0].metricLabel}</p>
                    <p className="text-sm text-muted-foreground/60 mt-1 font-mono">{CASE_STUDIES[0].secondary}</p>
                    <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground/60 transition-colors">
                      <TrendingUp className="w-4 h-4 text-violet-400" />
                      <span className="font-mono text-[12px]">Full case study available on request</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CASE_STUDIES.slice(1).map((study, i) => (
                <motion.div key={study.id} {...inView(i * 0.1)}>
                  <Card className="relative overflow-hidden group cursor-default h-full">
                    <div className={cn("absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r", study.accentClass)} />
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-[11px] font-black font-mono text-muted-foreground/40 tracking-widest">{study.id}</span>
                        <span className="h-px flex-1 bg-border" />
                        <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground px-2.5 py-1 rounded-full border border-border">{study.industry}</span>
                      </div>
                      <h3 className="text-2xl font-black text-foreground mb-1">{study.company}</h3>
                      <p className="text-[13px] text-muted-foreground/60 mb-5 italic">"{study.challenge}"</p>
                      <div className="flex items-end gap-4 mb-5">
                        <div className={cn("text-[56px] font-black leading-none bg-gradient-to-r bg-clip-text text-transparent", study.accentClass)}>
                          {study.metric}
                        </div>
                        <div className="pb-1.5">
                          <p className="text-sm font-semibold text-foreground/70">{study.metricLabel}</p>
                          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{study.secondary}</p>
                        </div>
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">{study.solution}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {study.tags.map((t) => <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full glass border border-border text-muted-foreground font-mono">{t}</span>)}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROCESS ═════════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// PROCESS</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                <span className="text-foreground">No ambiguity.</span><br /><span className="text-gradient">Just execution.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div key={step.n} {...inView(i * 0.08)}>
                  <Card className="p-6 h-full flex flex-col group cursor-default relative overflow-hidden">
                    <span aria-hidden className="absolute -top-3 -right-2 text-[72px] font-black text-foreground/[0.04] leading-none select-none pointer-events-none font-mono">{step.n}</span>
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center mb-5 border border-border group-hover:border-primary/30 transition-colors duration-500">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground/40 tracking-widest mb-2 font-mono">STEP {step.n}</div>
                    <h3 className="text-base font-bold text-foreground mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ AGENT REGISTRY ══════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-400/70 font-semibold mb-4 font-mono">// DIGITAL WORKER REGISTRY</p>
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  <span className="text-foreground">Active agents,</span><br /><span className="text-gradient">right now.</span>
                </h2>
                <div className="flex items-center gap-2 glass rounded-xl px-4 py-2 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 status-blink" />
                  <span className="text-[11px] font-mono text-emerald-400">5 active · 1 training · 0 errors</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...inView(0.05)}>
              <Card strong className="overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-white/[0.01]">
                  {["AGENT ID", "NAME", "ROLE", "TASKS RUN", "UPTIME", "STATUS"].map((h, i) => (
                    <div key={h} className={cn("text-[10px] uppercase tracking-[0.14em] text-muted-foreground/40 font-mono font-semibold",
                      i === 0 ? "col-span-2" : i === 1 ? "col-span-2" : i === 2 ? "col-span-3" : i === 3 ? "col-span-2" : i === 4 ? "col-span-2" : "col-span-1 text-right"
                    )}>{h}</div>
                  ))}
                </div>
                {/* Agent rows */}
                {AGENTS.map((agent, i) => <AgentRow key={agent.id} agent={agent} i={i} />)}
                {/* Footer */}
                <div className="px-5 py-3 border-t border-border bg-white/[0.01] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground/40">Last updated: just now · auto-refreshing every 30s</span>
                  <span className="text-[11px] font-mono text-muted-foreground/40">Total tasks processed: 9,260,380</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ═══ STATS ═══════════════════════════════════════════ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <Card strong className="px-8 py-10 md:px-14 relative overflow-hidden">
                <div aria-hidden className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-border/50">
                  {[
                    { label: "Workflows Automated", to: 140, suffix: "+", c: "text-violet-400" },
                    { label: "Hours Saved / Month",  to: 12000, suffix: "+", c: "text-blue-400" },
                    { label: "ML Models Deployed",   to: 38, suffix: "", c: "text-indigo-400" },
                    { label: "Enterprise Clients",   to: 24, suffix: "+", c: "text-emerald-400" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-2 px-4">
                      <span className={cn("text-4xl md:text-5xl font-black", stat.c)}>
                        <Counter to={stat.to} suffix={stat.suffix} />
                      </span>
                      <span className="text-xs text-muted-foreground leading-tight text-center font-mono">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ═══ TECH STACK ARCHITECTURE ═════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// TECHNICAL ARCHITECTURE</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
                <span className="text-foreground">Our full</span>{" "}
                <span className="text-gradient">AI stack.</span>
              </h2>
              <p className="text-muted-foreground text-[15px]">Best-in-class tools at every layer — chosen for reliability, not hype.</p>
            </motion.div>

            <div className="space-y-2">
              {TECH_STACK_LAYERS.map((layer, i) => {
                const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
                  emerald: { border: "border-emerald-500/20", bg: "rgba(16,185,129,0.04)", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
                  cyan:    { border: "border-cyan-500/20",    bg: "rgba(6,182,212,0.04)",  text: "text-cyan-400",    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
                  blue:    { border: "border-blue-500/20",    bg: "rgba(59,130,246,0.04)", text: "text-blue-400",    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
                  indigo:  { border: "border-indigo-500/20",  bg: "rgba(99,102,241,0.04)", text: "text-indigo-400",  badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" },
                  violet:  { border: "border-violet-500/20",  bg: "rgba(139,92,246,0.04)", text: "text-violet-400",  badge: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
                };
                const c = colorMap[layer.color];
                const indent = (TECH_STACK_LAYERS.length - 1 - i) * 16;

                return (
                  <motion.div key={layer.layer} {...inView(i * 0.08)} style={{ marginLeft: indent, marginRight: indent }}>
                    <div className={cn("rounded-xl border px-5 py-4 flex items-center gap-5 flex-wrap", c.border)} style={{ background: c.bg }}>
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <layer.icon className={cn("w-4 h-4 flex-shrink-0", c.text)} />
                        <span className={cn("text-[11px] font-mono font-bold uppercase tracking-widest", c.text)}>{layer.layer}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.tools.map((tool) => (
                          <span key={tool} className={cn("text-[11px] px-2.5 py-1 rounded-lg border font-mono", c.badge)}>{tool}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// CLIENT VOICES</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                <span className="text-foreground">They said it</span><br /><span className="text-gradient">better than we would.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={t.name} {...inView(i * 0.1)}>
                  <Card className="p-7 h-full flex flex-col justify-between group cursor-default">
                    <div>
                      <MessageSquareQuote className="w-7 h-7 text-primary/25 mb-5" />
                      <p className="text-[14px] text-foreground/75 leading-relaxed font-medium mb-6">"{t.quote}"</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-[11px] font-black text-white flex-shrink-0">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{t.name}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{t.role} · {t.company}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ INTEGRATIONS ════════════════════════════════════ */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-10">
            <motion.div {...inView()} className="text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-3 font-mono">// INTEGRATIONS</p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Connects with your entire stack.</h2>
              <p className="text-muted-foreground text-[14px] mt-2">No rip-and-replace. Works alongside the tools your team already uses.</p>
            </motion.div>
          </div>
          <div className="space-y-3 overflow-hidden">
            {[{ items: INTEGRATIONS_ROW1, reverse: false }, { items: INTEGRATIONS_ROW2, reverse: true }].map((row, ri) => (
              <div key={ri} className="relative flex overflow-hidden">
                <div className={cn("flex gap-3 w-max", row.reverse ? "marquee-reverse" : "marquee")}>
                  {[...row.items, ...row.items].map((tool, j) => (
                    <div key={j} className="glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 flex-shrink-0 cursor-default group hover:border-primary/30 transition-colors duration-300 border border-border">
                      <Database className="w-3 h-3 text-primary/30 group-hover:text-primary/60 transition-colors" />
                      <span className="text-[12px] font-semibold text-foreground/50 group-hover:text-foreground/70 transition-colors whitespace-nowrap font-mono">{tool}</span>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
              </div>
            ))}
          </div>
        </section>

        {/* ═══ ABOUT ═══════════════════════════════════════════ */}
        <section id="about" className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...inView()}>
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-5 font-mono">// ABOUT US</p>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.05] mb-8">
                  We don't sell<br /><span className="text-stroke-accent">vaporware.</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                  <p>Agentryx was built on a simple premise: AI is moving faster than most companies can adapt. While the world debates theory, we focus on practical deployment today.</p>
                  <p>We're a lean, deeply technical team of engineers, data scientists, and strategists. We build actual systems — not decks, not POCs that never ship.</p>
                  <p className="text-foreground/65 font-medium">If you want to stop talking about AI and start using it to win, you're in the right place.</p>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[{ icon: Layers, label: "AI-First", c: "text-violet-400" }, { icon: Sparkles, label: "Results-Driven", c: "text-blue-400" }, { icon: BrainCircuit, label: "Enterprise-Ready", c: "text-emerald-400" }].map((p) => (
                    <div key={p.label} className="glass rounded-xl p-4 flex flex-col items-center gap-2 text-center border border-border">
                      <p.icon className={cn("w-4 h-4", p.c)} />
                      <span className="text-[11px] font-semibold text-foreground/60 font-mono">{p.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.1, ease }} className="relative flex items-center justify-center aspect-square">
                <div className="absolute inset-0 rounded-full bg-primary/8 blur-[80px]" />
                <div className="relative w-[85%] h-[85%] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-border/50 animate-spin" style={{ animationDuration: "30s" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-400/60 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                  </div>
                  <div className="absolute inset-8 rounded-full border border-primary/15 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/70" />
                  </div>
                  <div className="absolute inset-16 rounded-full border border-border/30 animate-spin" style={{ animationDuration: "12s" }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400/60" />
                  </div>
                  <div className="relative z-10 w-28 h-28 rounded-full glass-strong flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/25 to-indigo-600/15 flex items-center justify-center">
                      <BrainCircuit className="w-7 h-7 text-primary/70" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ TEAM ════════════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// THE TEAM</p>
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  <span className="text-foreground">The people</span><br /><span className="text-gradient">behind the stack.</span>
                </h2>
                <p className="text-muted-foreground max-w-xs text-[15px] leading-relaxed">Ex-Google, Stanford, Palantir, OpenAI. Builders, not advisors.</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TEAM.map((member, i) => (
                <motion.div key={member.name} {...inView(i * 0.1)}>
                  <Card className="p-6 h-full flex flex-col group cursor-default">
                    <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-xl font-black text-white mb-5 shadow-lg", member.deptColor)}>
                      {member.init}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-0.5 tracking-tight">{member.name}</h3>
                    <p className="text-[11px] text-primary/70 font-mono font-semibold mb-3">{member.role}</p>
                    <p className="text-[12px] text-muted-foreground leading-relaxed flex-1 mb-4">{member.bio}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <Cpu className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[10px] font-mono text-muted-foreground/50">{member.focus}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ENGAGEMENTS ═════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// HOW WE ENGAGE</p>
              <div className="flex items-end gap-8 flex-wrap">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  <span className="text-foreground">Three ways</span><br /><span className="text-gradient">to work with us.</span>
                </h2>
                <p className="text-muted-foreground max-w-xs text-[15px] leading-relaxed">Every engagement starts with a scoped Discovery Sprint — no surprises.</p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ENGAGEMENTS.map((eng, i) => (
                <motion.div key={eng.name} {...inView(i * 0.1)}>
                  <Card strong={eng.highlight} className={cn("p-7 h-full flex flex-col relative overflow-hidden group cursor-default", eng.highlight && "glow-pulse")}>
                    {eng.highlight && <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500" />}
                    {eng.highlight && (
                      <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-primary/15 text-primary/80 px-2.5 py-1 rounded-full font-mono font-bold">Most popular</span>
                    )}
                    <div className="w-10 h-10 rounded-lg glass border border-border flex items-center justify-center mb-5 group-hover:border-primary/30 transition-colors">
                      <eng.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight">{eng.name}</h3>
                    <div className="flex items-center gap-1.5 mb-4">
                      <Clock className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[11px] font-mono text-muted-foreground/60">{eng.duration}</span>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-6 flex-1">{eng.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {eng.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary/60 hover:text-primary transition-colors group/link font-mono">
                      GET STARTED <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═════════════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()} className="mb-12 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// FAQ</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                <span className="text-foreground">Questions we</span><br /><span className="text-gradient">actually get asked.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => <FAQItem key={item.q} q={item.q} a={item.a} index={i} />)}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═════════════════════════════════════════ */}
        <section id="contact" className="py-28 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div {...inView()}>
              <Card strong className="relative overflow-hidden p-12 md:p-20 text-center flex flex-col items-center">
                <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
                <div aria-hidden className="absolute top-0 left-0 w-24 h-24 rounded-br-full border-r border-b border-border/40" />
                <div aria-hidden className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full border-l border-t border-border/40" />
                <div aria-hidden className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

                <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-5 relative z-10 font-mono">// LET'S TALK</p>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.08] mb-5 relative z-10">
                  Ready to transform<br /><span className="text-gradient">your operations?</span>
                </h2>
                <p className="text-base text-muted-foreground max-w-md mx-auto mb-10 relative z-10 leading-relaxed">
                  Tell us what you're working with. We'll identify where AI can deliver the most immediate, measurable impact — before you commit to anything.
                </p>
                <MagneticButton href="mailto:hello@agentryx.com"
                  className="relative z-10 group inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all duration-300 cursor-pointer">
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
