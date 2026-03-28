import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BrainCircuit, Layers, Sparkles, Globe, Shield, Zap, Cpu } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
function inView(delay = 0) {
  return { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.8, delay, ease } };
}

const TEAM = [
  {
    name: "Aarav Patel", role: "Founder & CEO", init: "AP",
    deptColor: "from-violet-500 to-purple-600",
    bio: "10 years in enterprise software architecture before founding Agentryx. Former ML engineer at Google Brain where he led a team building large-scale recommendation systems. Recognised in Forbes 30 Under 30.",
    focus: "AI Strategy, Company Vision", linkedin: "#", twitter: "#",
    funFact: "Has deployed AI systems that process over 50M events/day combined.",
  },
  {
    name: "Dr. Sarah Mitchell", role: "Chief Technology Officer", init: "SM",
    deptColor: "from-blue-500 to-cyan-600",
    bio: "PhD Computer Science from Stanford, dissertation on scalable probabilistic inference. Led ML infrastructure at two successful exits — one fintech ($380M), one healthtech (acquired by Optum). 12 years building production AI systems.",
    focus: "ML Systems, Technical Architecture", linkedin: "#", twitter: "#",
    funFact: "Built the first production RLHF pipeline outside of a major lab in 2021.",
  },
  {
    name: "James Whitfield", role: "Head of Engineering", init: "JW",
    deptColor: "from-indigo-500 to-blue-600",
    bio: "Ex-Principal Engineer at Palantir, where he architected the distributed data processing layer handling intelligence workloads for 12 national governments. Specialist in high-throughput, low-latency system design.",
    focus: "Agent Systems, Production Engineering", linkedin: "#", twitter: "#",
    funFact: "His systems have collectively processed over $2 trillion in financial transactions.",
  },
  {
    name: "Leila Hassan", role: "Head of Data Science", init: "LH",
    deptColor: "from-emerald-500 to-teal-600",
    bio: "Research background at OpenAI, working on GPT fine-tuning and alignment research. Published 12 peer-reviewed papers on NLP and domain adaptation. Expert in making general-purpose LLMs reliable for regulated industries.",
    focus: "NLP, Model Training & Alignment", linkedin: "#", twitter: "#",
    funFact: "Her clinical NLP work has been cited in over 80 academic papers.",
  },
  {
    name: "Marco Ferretti", role: "Head of Client Success", init: "MF",
    deptColor: "from-amber-500 to-orange-600",
    bio: "Former management consultant at McKinsey, where he led AI transformation programmes for Fortune 500 clients. Bridges the gap between technical delivery and business outcomes. Ensures every build ships on time with measurable ROI.",
    focus: "Client Delivery, Business Outcomes", linkedin: "#", twitter: "#",
    funFact: "Has never delivered a project more than one day late in 11 years.",
  },
  {
    name: "Priya Venkatesan", role: "Lead AI Engineer", init: "PV",
    deptColor: "from-cyan-500 to-blue-600",
    bio: "Ex-DeepMind, specialist in multi-agent systems and reinforcement learning for real-world applications. Architected the core orchestration framework that powers all Agentryx deployments. Holds 3 AI patents.",
    focus: "Multi-Agent Orchestration, RL", linkedin: "#", twitter: "#",
    funFact: "Her agent framework handles 9M+ daily tasks across all deployments.",
  },
];

const VALUES = [
  { icon: Shield, title: "No vaporware", desc: "We build systems that work in production. Not demos, not POCs, not slides. If it's not in prod, it doesn't count.", c: "text-violet-400", bg: "rgba(139,92,246,0.1)" },
  { icon: Zap, title: "Speed without chaos", desc: "We move fast because we're disciplined, not careless. Rapid delivery is only valuable when it's also reliable.", c: "text-blue-400", bg: "rgba(59,130,246,0.1)" },
  { icon: Layers, title: "Outcomes, not outputs", desc: "We measure success by the business metric that moved — not lines of code written or models trained.", c: "text-emerald-400", bg: "rgba(16,185,129,0.1)" },
  { icon: Globe, title: "Honest advice", desc: "If AI won't help you, we'll say so. We'd rather lose a deal than take your money for something that won't work.", c: "text-cyan-400", bg: "rgba(6,182,212,0.1)" },
];

const MILESTONES = [
  { year: "2022", title: "Founded", desc: "Agentryx incorporated with a focus on enterprise AI automation. First client onboarded within 30 days." },
  { year: "2023", title: "First million", desc: "Crossed $1M ARR. Deployed 28 automation systems across 12 clients. Hired the first engineering team." },
  { year: "Q1 2024", title: "ML practice launched", desc: "Expanded into custom ML model development. First healthcare AI deployment: MEDIX for MedFlow Health." },
  { year: "Q3 2024", title: "Digital Workers product", desc: "Launched persistent agent platform. NEXUS processes 1,100+ orders/day. Team grew to 18 people." },
  { year: "2025", title: "9M+ daily tasks", desc: "Platform now processes over 9 million tasks per day across 6 deployed agents. 24 enterprise clients globally." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-[72px] pb-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}
          className="py-16 border-b border-border/40 mb-16">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-5 font-mono">// ABOUT</p>
          <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.02] mb-6">
            We don't sell<br /><span className="text-gradient">vaporware.</span>
          </h1>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
            Agentryx was built on a simple premise: AI is moving faster than most companies can adapt. While the world debates theory, we focus on practical deployment — systems in production, metrics that move, work that lasts.
          </p>
        </motion.div>

        {/* Story + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div {...inView()}>
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-6">Why we built this.</h2>
            <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
              <p>When Aarav was an ML engineer at Google, he watched enterprise companies spend millions on AI consulting engagements that produced beautiful presentations and nothing else. The gap between AI potential and actual business value was — and still is — enormous.</p>
              <p>Agentryx was built to close that gap. We're a team of engineers, researchers, and operators who've built and deployed real AI systems at scale. We don't come from consulting. We come from production.</p>
              <p className="text-foreground/65 font-semibold">The measure of our work isn't the model we trained. It's the business metric that moved because of it.</p>
            </div>
          </motion.div>
          <motion.div {...inView(0.1)} className="grid grid-cols-2 gap-3">
            {[
              { val: "2022", label: "Founded", c: "text-violet-400" },
              { val: "24+", label: "Enterprise clients", c: "text-blue-400" },
              { val: "9M+", label: "Tasks processed daily", c: "text-emerald-400" },
              { val: "6", label: "Active digital workers", c: "text-cyan-400" },
              { val: "$2.3M", label: "Fraud prevented (Q1)", c: "text-violet-300" },
              { val: "99.2%", label: "Avg agent uptime", c: "text-emerald-300" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl border border-border p-5">
                <div className={cn("text-3xl font-black mb-1", s.c)}>{s.val}</div>
                <div className="text-[11px] font-mono text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Values */}
        <motion.section {...inView()} className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// VALUES</p>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-10">What we believe.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} {...inView(i * 0.08)}>
                <div className="glass rounded-2xl border border-border p-6 h-full">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: v.bg }}>
                    <v.icon className={cn("w-4 h-4", v.c)} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Milestones */}
        <motion.section {...inView()} className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// HISTORY</p>
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-10">How we got here.</h2>
          <div className="relative">
            <div className="absolute left-[21px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            <div className="space-y-5">
              {MILESTONES.map((m, i) => (
                <motion.div key={m.year} {...inView(i * 0.07)} className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full glass-strong border border-primary/30 flex items-center justify-center flex-shrink-0 z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="glass rounded-2xl border border-border p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-mono font-black text-primary/70">{m.year}</span>
                      <h3 className="text-sm font-bold text-foreground">{m.title}</h3>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section {...inView()} className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 font-semibold mb-4 font-mono">// TEAM</p>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <h2 className="text-3xl font-black text-foreground tracking-tight">The people behind the stack.</h2>
            <p className="text-muted-foreground text-[14px]">Ex-Google, Stanford, Palantir, OpenAI, DeepMind, McKinsey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} {...inView(i * 0.08)}>
                <div className="glass rounded-2xl border border-border p-6 h-full flex flex-col group cursor-default hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-xl font-black text-white shadow-lg flex-shrink-0", member.deptColor)}>
                      {member.init}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-foreground tracking-tight">{member.name}</h3>
                      <p className="text-[11px] text-primary/70 font-mono font-semibold">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-4">{member.bio}</p>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-border">
                    <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest mb-1">Fun fact</p>
                    <p className="text-[11px] text-foreground/60 italic">{member.funFact}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    <Cpu className="w-3 h-3 text-muted-foreground/30" />
                    <span className="text-[10px] font-mono text-muted-foreground/40">{member.focus}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div {...inView()}>
          <div className="glass-strong rounded-3xl border border-border p-10 md:p-14 text-center relative overflow-hidden">
            <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-36 rounded-full bg-primary/10 blur-[70px] pointer-events-none" />
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-4 relative z-10">
              Want to build something real?
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-sm mx-auto mb-8 leading-relaxed relative z-10">
              We work with a small number of clients at any time. If the fit is right, we move fast.
            </p>
            <a href="mailto:hello@agentryx.com"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_50px_rgba(139,92,246,0.55)] transition-all duration-300">
              hello@agentryx.com <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
