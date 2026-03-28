import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, BrainCircuit, UserCog, CheckCircle, ArrowUpRight, Clock, Zap, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const ease = [0.16, 1, 0.3, 1] as const;
function inView(delay = 0) {
  return { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.8, delay, ease } };
}

const SERVICES_DETAIL = [
  {
    icon: Bot, id: "automation",
    label: "AI Workflow Automation",
    tagline: "Turn manual processes into autonomous pipelines.",
    gradient: "from-violet-500 to-purple-600",
    iconBg: "rgba(139,92,246,0.12)", textAccent: "text-violet-400", borderAccent: "border-violet-500/20",
    description: "We design, build, and deploy autonomous systems that eliminate the manual work silently destroying your team's productivity. Every process we automate is backed by a measurable SLA and runs without babysitting.",
    useCases: [
      { name: "Order Management", desc: "Multi-agent routing, fulfillment, returns, and carrier coordination across any ERP/WMS." },
      { name: "Invoice Processing", desc: "Extract, validate, route and pay invoices end-to-end without human touchpoints." },
      { name: "Customer Onboarding", desc: "Automated KYC, document review, account setup and welcome sequences." },
      { name: "HR & Ops Workflows", desc: "Hiring pipeline management, employee onboarding, policy compliance monitoring." },
      { name: "Reporting & Alerts", desc: "Scheduled report generation, anomaly detection, and proactive stakeholder alerts." },
    ],
    capabilities: ["Multi-agent coordination", "Real-time API orchestration", "Error handling & retry logic", "Audit trail & logging", "Zero-downtime deployment", "Custom integration layer"],
    avgTimeline: "4–8 weeks",
    avgROI: "84% reduction in processing time",
    industries: ["E-Commerce", "Logistics", "Insurance", "Healthcare Admin"],
  },
  {
    icon: BrainCircuit, id: "ml",
    label: "Machine Learning Implementation",
    tagline: "Custom models trained on your data, deployed to production.",
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "rgba(59,130,246,0.12)", textAccent: "text-blue-400", borderAccent: "border-blue-500/20",
    description: "We take your proprietary data and turn it into an intelligent system that learns, predicts, and acts. Not a generic API call to OpenAI — a real model, trained on your domain, deployed where you need it.",
    useCases: [
      { name: "Fraud Detection", desc: "Real-time transaction scoring with sub-second inference latency." },
      { name: "Demand Forecasting", desc: "Predict demand across SKUs, regions, and time horizons with 94%+ accuracy." },
      { name: "Churn Prediction", desc: "Score customer health and trigger intervention flows before they leave." },
      { name: "Document Classification", desc: "Classify, extract and route any document type at scale." },
      { name: "Recommendation Engines", desc: "Product, content, or service recommendations personalised per user." },
    ],
    capabilities: ["Fine-tuning on proprietary data", "RLHF & feedback loops", "A/B testing framework", "Feature engineering pipeline", "Model versioning & rollback", "Real-time inference endpoint"],
    avgTimeline: "6–12 weeks",
    avgROI: "96% avg. accuracy achieved",
    industries: ["Fintech", "Healthcare", "E-Commerce", "SaaS"],
  },
  {
    icon: UserCog, id: "workers",
    label: "Digital Workers",
    tagline: "Autonomous AI agents that never take a day off.",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "rgba(16,185,129,0.12)", textAccent: "text-emerald-400", borderAccent: "border-emerald-500/20",
    description: "Digital workers are persistent AI agents that own entire job functions. They monitor inboxes, make decisions, execute tasks and report back — integrating natively with your existing tools, not replacing them.",
    useCases: [
      { name: "Lead Research Agent", desc: "Finds, qualifies, enriches and scores inbound leads automatically 24/7." },
      { name: "Support Triage Agent", desc: "Reads, classifies and routes support tickets. Resolves tier-1 issues autonomously." },
      { name: "Financial Analyst Agent", desc: "Monitors accounts, flags anomalies, and prepares daily financial summaries." },
      { name: "Compliance Monitor", desc: "Watches for policy violations, regulatory changes, and contract breaches." },
      { name: "Procurement Agent", desc: "Sources quotes, compares vendors, flags exceptions, and raises purchase orders." },
    ],
    capabilities: ["24/7 autonomous operation", "Tool-use & API access", "Memory & context retention", "Human-in-the-loop escalation", "Elastic scaling on demand", "SLA-backed uptime guarantee"],
    avgTimeline: "3–6 weeks",
    avgROI: "3× headcount leverage",
    industries: ["Sales", "Finance", "Legal", "Operations"],
  },
];

const PROCESS = [
  { step: "01", title: "Scoping Call", duration: "30 min", desc: "We understand your problem and decide if it's a fit. No-nonsense." },
  { step: "02", title: "Discovery Sprint", duration: "1–2 weeks", desc: "Deep dive into your workflows, data, and tech stack. We produce a blueprint." },
  { step: "03", title: "Build Phase", duration: "3–10 weeks", desc: "Engineering-led development with weekly demos and staged integration." },
  { step: "04", title: "Production Launch", duration: "1 week", desc: "Full deployment, smoke testing, and team handover with runbooks." },
  { step: "05", title: "Monitoring Period", duration: "90 days", desc: "We stay on. Retraining, bug fixes, and optimization included standard." },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-[72px] pb-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}
          className="py-16 border-b border-border/40 mb-16">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-5 font-mono">// SERVICES</p>
          <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.02] mb-6">
            Three disciplines.<br /><span className="text-gradient">One team.</span>
          </h1>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-xl">
            We don't do AI theatre. Every engagement produces working systems in production — not slides, not POCs that never ship.
          </p>
        </motion.div>

        {/* Services detail */}
        {SERVICES_DETAIL.map((svc, idx) => (
          <motion.section key={svc.id} {...inView()} className={cn("py-16 border-b border-border/30", idx === SERVICES_DETAIL.length - 1 && "border-none")}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <div className={cn("inline-flex items-center gap-3 px-4 py-2 rounded-xl border mb-6", svc.borderAccent)} style={{ background: svc.iconBg }}>
                  <svc.icon className={cn("w-4 h-4", svc.textAccent)} />
                  <span className={cn("text-[11px] font-mono font-bold uppercase tracking-widest", svc.textAccent)}>{svc.label}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-[1.08] mb-4">{svc.tagline}</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">{svc.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="glass rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">Timeline</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{svc.avgTimeline}</span>
                  </div>
                  <div className="glass rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">Result</span>
                    </div>
                    <span className={cn("text-sm font-bold", svc.textAccent)}>{svc.avgROI}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-3">Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.industries.map((ind) => (
                      <span key={ind} className="glass text-[11px] font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground">{ind}</span>
                    ))}
                  </div>
                </div>

                <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary/70 hover:text-primary transition-colors font-mono group">
                  SEE CASE STUDIES <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-3">Use Cases</p>
                  <div className="space-y-2">
                    {svc.useCases.map((uc) => (
                      <div key={uc.name} className="glass rounded-xl p-4 border border-border hover:border-primary/20 transition-colors group cursor-default">
                        <div className="flex items-start gap-3">
                          <div className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", svc.textAccent.replace("text-", "bg-"))} />
                          <div>
                            <span className="text-[13px] font-semibold text-foreground">{uc.name}</span>
                            <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{uc.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-3">What's included</p>
                  <div className="glass rounded-2xl border border-border p-5 grid grid-cols-2 gap-2">
                    {svc.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-[12px]">
                        <CheckCircle className={cn("w-3 h-3 flex-shrink-0", svc.textAccent)} />
                        <span className="text-foreground/70">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Process timeline */}
        <motion.section {...inView()} className="py-16 border-t border-border/40">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// OUR PROCESS</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-12">From first call to live in production.</h2>
          <div className="relative">
            <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            <div className="space-y-6">
              {PROCESS.map((step, i) => (
                <motion.div key={step.step} {...inView(i * 0.08)} className="flex gap-6 items-start">
                  <div className="w-11 h-11 rounded-full glass-strong border border-border flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-[11px] font-black font-mono text-primary">{step.step}</span>
                  </div>
                  <div className="glass rounded-2xl border border-border p-5 flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground/40" />
                        <span className="text-[11px] font-mono text-muted-foreground/60">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed md:col-span-2">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section {...inView()} className="mt-12">
          <div className="glass-strong rounded-3xl border border-border p-10 md:p-16 text-center relative overflow-hidden">
            <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-primary/12 blur-[80px] pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4 relative z-10">
              Not sure which service fits?<br /><span className="text-gradient">Start with Discovery.</span>
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-md mx-auto mb-8 leading-relaxed relative z-10">
              A 1–2 week sprint where we map your workflows and tell you exactly what's worth automating — before you commit to anything.
            </p>
            <a href="mailto:hello@agentryx.com"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_50px_rgba(139,92,246,0.55)] transition-all duration-300">
              Book a Discovery Sprint <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
