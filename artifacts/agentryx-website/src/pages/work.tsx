import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, ArrowUpRight, CheckCircle, BarChart3, Clock, Users } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
function inView(delay = 0) {
  return { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.8, delay, ease } };
}

const INDUSTRIES = ["All", "E-Commerce", "Fintech", "Healthcare", "Logistics"];

const CASE_STUDIES = [
  {
    id: "01", company: "NexusCorp", industry: "E-Commerce",
    services: ["AI Workflow Automation", "Digital Workers"],
    challenge: "NexusCorp was processing 15,000+ daily orders across 6 disconnected systems — a fulfillment centre in LA, a WMS in Chicago, and 4 3PL partners. Manual routing errors were costing $180k/month in reshipment fees.",
    solution: "We deployed a multi-agent routing system: NEXUS coordinates order assignment, CARRIER matches optimal logistics partner in real-time, and RETURNS handles reverse logistics end-to-end. All connected to their existing ERP via custom API layer.",
    timeline: "6 weeks", teamSize: "3 engineers", stack: ["LangGraph", "GPT-4o", "PostgreSQL", "Shopify", "Custom WMS API"],
    results: [
      { metric: "84%", label: "Reduction in processing time", color: "text-violet-400" },
      { metric: "$180k", label: "Monthly cost savings", color: "text-violet-300" },
      { metric: "0", label: "Headcount added vs 3× revenue growth", color: "text-violet-200" },
      { metric: "99.8%", label: "Order routing accuracy", color: "text-violet-100" },
    ],
    accentClass: "from-violet-500 to-indigo-500",
    textAccent: "text-violet-400", bgAccent: "rgba(139,92,246,0.05)",
    quote: "We went from 8 people manually routing orders to zero. The system handles exceptions better than humans did.",
    quoteName: "David Chen", quoteRole: "COO, NexusCorp",
  },
  {
    id: "02", company: "Apex Financial", industry: "Fintech",
    services: ["Machine Learning Implementation"],
    challenge: "Apex was reviewing 50,000+ daily transactions with a legacy rules engine that ran overnight batch jobs — meaning fraud was discovered 48 hours after it happened. By then, chargebacks had already hit.",
    solution: "We built APEX: a real-time ML risk engine combining a custom XGBoost classifier with an LSTM temporal model for transaction sequence analysis. Inference runs in under 3.2 seconds and integrates directly with their payment processor via webhook.",
    timeline: "9 weeks", teamSize: "4 engineers + 1 data scientist", stack: ["Custom XGBoost", "LSTM", "PyTorch", "Stripe", "Kafka", "Redis"],
    results: [
      { metric: "$2.3M", label: "Fraud prevented in first quarter", color: "text-blue-400" },
      { metric: "3.2s", label: "vs. 48 hours detection latency", color: "text-blue-300" },
      { metric: "94%", label: "Precision on flagged transactions", color: "text-blue-200" },
      { metric: "0.6%", label: "False positive rate (down from 14%)", color: "text-blue-100" },
    ],
    accentClass: "from-blue-500 to-cyan-500",
    textAccent: "text-blue-400", bgAccent: "rgba(59,130,246,0.05)",
    quote: "The ROI was clear within weeks. We protected more revenue in Q1 than we spent on the entire build. It's not even close.",
    quoteName: "Sarah Okafor", quoteRole: "CTO, Apex Financial",
  },
  {
    id: "03", company: "MedFlow Health", industry: "Healthcare",
    services: ["Machine Learning Implementation", "AI Workflow Automation"],
    challenge: "MedFlow's clinical team was manually entering 200+ unstructured physician notes per day into their EHR. Each entry took 8–12 minutes and was error-prone. Three full-time data entry staff were dedicated to this single task.",
    solution: "MEDIX: a fine-tuned Llama 3.1 model trained on 400k+ de-identified clinical notes. It extracts diagnoses, medications, vitals, and follow-up actions from free-form text, normalises to ICD-10, and writes directly to the EHR via HL7 FHIR API.",
    timeline: "11 weeks", teamSize: "3 engineers + 2 ML researchers", stack: ["Llama 3.1 70B", "FHIR API", "PostgreSQL", "HL7", "AWS SageMaker"],
    results: [
      { metric: "96%", label: "Extraction accuracy (vs. 91% human)", color: "text-emerald-400" },
      { metric: "18s", label: "vs. 10-minute manual entry time", color: "text-emerald-300" },
      { metric: "3 FTEs", label: "Redeployed to patient-facing care", color: "text-emerald-200" },
      { metric: "0", label: "HIPAA incidents since deployment", color: "text-emerald-100" },
    ],
    accentClass: "from-emerald-500 to-teal-500",
    textAccent: "text-emerald-400", bgAccent: "rgba(16,185,129,0.05)",
    quote: "Our clinical team now spends their time with patients, not keyboards. That's the outcome we hired Agentryx to create.",
    quoteName: "Marcus Reid", quoteRole: "Head of Data, MedFlow Health",
  },
  {
    id: "04", company: "Vertex Logistics", industry: "Logistics",
    services: ["Digital Workers", "AI Workflow Automation"],
    challenge: "Vertex was spending 22 hours/week manually generating load plans, carrier assignment sheets, and compliance documents for cross-border freight. A 12-person ops team was handling paperwork instead of building client relationships.",
    solution: "A suite of three digital workers: CARGO handles load optimisation, COMPLY monitors customs and trade regulations in 12 countries, and DOCS generates all freight documentation automatically — triggered by shipment creation events.",
    timeline: "5 weeks", teamSize: "2 engineers", stack: ["CrewAI", "Claude 3.5", "PostgreSQL", "SAP Integration", "Custom TMS API"],
    results: [
      { metric: "22h", label: "Per week recovered for ops team", color: "text-indigo-400" },
      { metric: "12", label: "Countries in compliance coverage", color: "text-indigo-300" },
      { metric: "99.4%", label: "Document accuracy rate", color: "text-indigo-200" },
      { metric: "4× faster", label: "Shipment documentation time", color: "text-indigo-100" },
    ],
    accentClass: "from-indigo-500 to-violet-500",
    textAccent: "text-indigo-400", bgAccent: "rgba(99,102,241,0.05)",
    quote: "In week one, COMPLY caught a customs regulation change that would have held up $400k of freight. That alone paid for the whole project.",
    quoteName: "James Harlow", quoteRole: "VP Operations, Vertex Logistics",
  },
];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.industry === filter);

  return (
    <div className="min-h-screen pt-[72px] pb-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}
          className="py-16 border-b border-border/40 mb-12">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-5 font-mono">// SELECTED WORK</p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.02]">
              Results that<br /><span className="text-gradient">speak plainly.</span>
            </h1>
            <p className="text-[16px] text-muted-foreground leading-relaxed max-w-sm">
              Four clients. Real numbers from production systems. Every metric is verifiable.
            </p>
          </div>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {INDUSTRIES.map((ind) => (
            <button key={ind} onClick={() => setFilter(ind)}
              className={cn("px-4 py-2 rounded-full text-[12px] font-mono font-semibold transition-all duration-200 border",
                filter === ind
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "glass border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
              )}>
              {ind}
            </button>
          ))}
        </div>

        {/* Case studies */}
        <div className="space-y-6">
          {shown.map((study, i) => (
            <motion.div key={study.id} {...inView(i * 0.07)}>
              <div className="glass-strong rounded-3xl border border-border relative overflow-hidden" style={{ background: study.bgAccent }}>
                <div className={cn("absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r", study.accentClass)} />

                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-black font-mono text-muted-foreground/30 tracking-widest">{study.id}</span>
                        <span className="h-px w-8 bg-border" />
                        <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground px-2.5 py-1 rounded-full border border-border">{study.industry}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">{study.company}</h2>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {study.services.map((s) => (
                          <span key={s} className="text-[11px] font-mono px-2.5 py-1 rounded-full glass border border-border text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Clock className="w-3 h-3 text-muted-foreground/40" />
                        <span className="text-[11px] font-mono text-muted-foreground">{study.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <Users className="w-3 h-3 text-muted-foreground/40" />
                        <span className="text-[11px] font-mono text-muted-foreground">{study.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-3">Challenge</p>
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-3">Solution</p>
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {study.results.map((r) => (
                      <div key={r.label} className="glass rounded-2xl p-4 border border-border text-center">
                        <div className={cn("text-3xl font-black leading-none mb-1", r.color)}>{r.metric}</div>
                        <p className="text-[11px] text-muted-foreground leading-snug font-mono">{r.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="mb-8">
                    <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-2">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {study.stack.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-lg glass border border-border text-muted-foreground/60">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className={cn("rounded-2xl p-5 border", study.textAccent === "text-violet-400" ? "border-violet-500/15 bg-violet-500/[0.04]"
                    : study.textAccent === "text-blue-400" ? "border-blue-500/15 bg-blue-500/[0.04]"
                    : study.textAccent === "text-emerald-400" ? "border-emerald-500/15 bg-emerald-500/[0.04]"
                    : "border-indigo-500/15 bg-indigo-500/[0.04]")}>
                    <p className="text-[14px] text-foreground/70 font-medium leading-relaxed mb-3">"{study.quote}"</p>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center text-[9px] font-black text-white",
                        study.accentClass)}>
                        {study.quoteName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="text-[12px] font-semibold text-foreground">{study.quoteName}</span>
                        <span className="text-[11px] text-muted-foreground font-mono ml-2">{study.quoteRole}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...inView()} className="mt-16">
          <div className="glass-strong rounded-3xl border border-border p-10 md:p-14 text-center relative overflow-hidden">
            <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-36 rounded-full bg-primary/10 blur-[70px] pointer-events-none" />
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-4 relative z-10">
              Your operation next?
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-sm mx-auto mb-8 leading-relaxed relative z-10">
              Book a free 30-minute scoping call. We'll tell you honestly if we can help — and what the ROI looks like.
            </p>
            <a href="mailto:hello@agentryx.com"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_50px_rgba(139,92,246,0.55)] transition-all duration-300">
              Start the conversation <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
