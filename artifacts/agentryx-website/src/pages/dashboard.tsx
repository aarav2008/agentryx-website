import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import {
  Activity, TrendingUp, TrendingDown, Zap, Shield, BarChart3,
  Users, DollarSign, AlertCircle, CheckCircle, Clock, RefreshCw,
  ArrowUpRight, ArrowDownRight, Cpu, Database,
} from "lucide-react";

/* ══════════════════════ MOCK DATA ════════════════════════════ */

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// 30 days of task throughput
const DAILY_TASKS = (() => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const trend = 1 + (29 - i) * 0.009;
    const nexus  = Math.round((850  + rand(-100, 200))  * trend);
    const apex   = Math.round((6200 + rand(-500, 800))  * trend);
    const medix  = Math.round((380  + rand(-60,  120))  * trend);
    const glide  = Math.round((260  + rand(-40,  90))   * trend);
    const atlas  = Math.round((1600 + rand(-200, 350))  * trend);
    const vertex = Math.round((520  + rand(-80,  160))  * trend);
    data.push({ date: label, nexus, apex, medix, glide, atlas, vertex, total: nexus + apex + medix + glide + atlas + vertex });
  }
  return data;
})();

// 12 months of revenue impact
const REVENUE_IMPACT = (() => {
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  return months.map((month, i) => ({
    month,
    laborSaved:    Math.round(75000  + i * 8500  + rand(-5000,  8000)),
    fraudPrevented:Math.round(45000  + i * 19000 + rand(-8000,  15000)),
    efficiency:    Math.round(38000  + i * 5200  + rand(-4000,  7000)),
  }));
})();

// Task breakdown by type
const TASK_TYPES = [
  { name: "Order Processing",    value: 42, color: "#7c3aed" },
  { name: "Risk Scoring",        value: 31, color: "#3b82f6" },
  { name: "NLP Extraction",      value: 13, color: "#10b981" },
  { name: "Lead Qualification",  value: 8,  color: "#6366f1" },
  { name: "Reconciliation",      value: 4,  color: "#06b6d4" },
  { name: "Doc Classification",  value: 2,  color: "#a855f7" },
];

// Tasks per agent this week
const AGENT_WEEKLY = [
  { day: "Mon", NEXUS: 812,  APEX: 6120, MEDIX: 394, GLIDE: 271, ATLAS: 1584, VERTEX: 498 },
  { day: "Tue", NEXUS: 934,  APEX: 5980, MEDIX: 421, GLIDE: 319, ATLAS: 1712, VERTEX: 562 },
  { day: "Wed", NEXUS: 1012, APEX: 7240, MEDIX: 388, GLIDE: 247, ATLAS: 1948, VERTEX: 631 },
  { day: "Thu", NEXUS: 891,  APEX: 6740, MEDIX: 445, GLIDE: 302, ATLAS: 1820, VERTEX: 517 },
  { day: "Fri", NEXUS: 1104, APEX: 7810, MEDIX: 412, GLIDE: 358, ATLAS: 2014, VERTEX: 688 },
  { day: "Sat", NEXUS: 742,  APEX: 5230, MEDIX: 291, GLIDE: 198, ATLAS: 1204, VERTEX: 388 },
  { day: "Sun", NEXUS: 694,  APEX: 4980, MEDIX: 247, GLIDE: 171, ATLAS: 1094, VERTEX: 342 },
];

const AGENTS = [
  { id: "NX-001", name: "NEXUS",  role: "Order Routing",      status: "live",     uptime: 99.8, tasksToday: 1104,  model: "LangGraph + GPT-4o",       client: "NexusCorp",      p50: "0.4s", p99: "1.2s" },
  { id: "AP-002", name: "APEX",   role: "Risk Scoring",       status: "live",     uptime: 99.2, tasksToday: 7810,  model: "Custom XGBoost + LSTM",    client: "Apex Financial", p50: "3.1s", p99: "8.4s" },
  { id: "MF-003", name: "MEDIX",  role: "Clinical NLP",       status: "live",     uptime: 98.9, tasksToday: 412,   model: "Fine-tuned Llama 3.1",     client: "MedFlow Health", p50: "1.7s", p99: "4.1s" },
  { id: "GL-004", name: "GLIDE",  role: "Lead Qualification", status: "live",     uptime: 100,  tasksToday: 358,   model: "GPT-4o + CrewAI",          client: "Undisclosed",    p50: "0.9s", p99: "2.3s" },
  { id: "AT-005", name: "ATLAS",  role: "Reconciliation",     status: "training", uptime: 99.5, tasksToday: 2014,  model: "Claude 3.5 + Custom",      client: "Undisclosed",    p50: "5.2s", p99: "12.8s" },
  { id: "VX-006", name: "VERTEX", role: "Document Intel",     status: "live",     uptime: 99.1, tasksToday: 688,   model: "Mistral Large + RAG",      client: "Undisclosed",    p50: "2.1s", p99: "5.7s" },
];

const ACTIVITY_LOG = [
  { time: "just now",  agent: "NX-001", event: "Order #51204 routed → fulfillment center LAX",          ok: true  },
  { time: "12s ago",   agent: "AP-002", event: "TXN-10283 scored 94/100 — flagged high risk",            ok: false },
  { time: "34s ago",   agent: "MF-003", event: "Clinical note #9241 extracted · 98.1% confidence",      ok: true  },
  { time: "1m ago",    agent: "VX-006", event: "Contract batch #51 classified in 1.8s",                  ok: true  },
  { time: "2m ago",    agent: "GL-004", event: "48 leads qualified · synced to Salesforce",              ok: true  },
  { time: "3m ago",    agent: "AT-005", event: "Reconciliation batch #204 — 1,204 entries processed",   ok: true  },
  { time: "4m ago",    agent: "AP-002", event: "TXN-10271 scored 89/100 — flagged medium risk",          ok: false },
  { time: "5m ago",    agent: "NX-001", event: "Order #51197 routed → warehouse Chicago",               ok: true  },
  { time: "7m ago",    agent: "VX-006", event: "Invoice batch #140 classified · zero errors",           ok: true  },
  { time: "10m ago",   agent: "MF-003", event: "Discharge summary #4821 normalized successfully",       ok: true  },
];

/* ══════════════════════ CHART THEME ══════════════════════════ */

const CHART_COLORS = {
  nexus: "#7c3aed", apex: "#3b82f6", medix: "#10b981",
  glide: "#6366f1", atlas: "#f59e0b", vertex: "#06b6d4",
};

function useChartTheme() {
  const { theme } = useTheme();
  const light = theme === "frost";
  return {
    axisProps: {
      tick: { fill: light ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "Menlo, monospace" },
      axisLine: { stroke: light ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.06)" },
      tickLine: false as const,
    },
    gridProps: { stroke: light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.04)", strokeDasharray: "0" },
  };
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl border border-border p-3 shadow-2xl min-w-[160px]">
      <p className="text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[11px] mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-foreground/60 capitalize">{p.name}:</span>
          <span className="font-mono font-bold text-foreground ml-auto pl-3">
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value || 0), 0);
  return (
    <div className="glass-strong rounded-xl border border-border p-3 shadow-2xl min-w-[180px]">
      <p className="text-[10px] font-mono text-muted-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[11px] mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-foreground/60">{p.name}:</span>
          <span className="font-mono font-bold text-foreground ml-auto pl-3">${(p.value / 1000).toFixed(0)}k</span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2 flex items-center justify-between text-[11px]">
        <span className="text-foreground/50 font-mono">Total</span>
        <span className="font-mono font-black text-emerald-400">${(total / 1000).toFixed(0)}k</span>
      </div>
    </div>
  );
}

/* ══════════════════════ SUB-COMPONENTS ══════════════════════ */

function KpiCard({ icon: Icon, label, value, delta, deltaDir, color }: {
  icon: React.ComponentType<any>; label: string; value: string;
  delta: string; deltaDir: "up" | "down"; color: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="glass-strong rounded-2xl p-5 border border-border hover:border-primary/20 transition-colors h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center")} style={{ background: color + "18" }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <div className={cn("flex items-center gap-1 text-[11px] font-mono font-semibold", deltaDir === "up" ? "text-emerald-400" : "text-red-400")}>
            {deltaDir === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {delta}
          </div>
        </div>
        <div className="text-3xl font-black text-foreground mb-1 leading-none">{value}</div>
        <div className="text-[11px] font-mono text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}

function SectionCard({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass rounded-2xl border border-border p-5 h-full flex flex-col", className)}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-foreground tracking-tight">{title}</h3>
          {subtitle && <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

/* ══════════════════════ DASHBOARD PAGE ══════════════════════ */

export default function Dashboard() {
  const { axisProps, gridProps } = useChartTheme();
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("30d");
  const displayed = timeRange === "7d" ? DAILY_TASKS.slice(-7) : DAILY_TASKS;
  const todayTasks = DAILY_TASKS[DAILY_TASKS.length - 1].total;
  const yesterdayTasks = DAILY_TASKS[DAILY_TASKS.length - 2].total;
  const taskDelta = (((todayTasks - yesterdayTasks) / yesterdayTasks) * 100).toFixed(1);
  const monthRevenue = REVENUE_IMPACT[REVENUE_IMPACT.length - 1];
  const totalSaved = monthRevenue.laborSaved + monthRevenue.fraudPrevented + monthRevenue.efficiency;

  return (
    <div className="min-h-screen pt-[72px] pb-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">

        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="py-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-foreground tracking-tight">AI Operations</h1>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-blink" />LIVE
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground font-mono">Last updated: just now · Auto-refresh every 30s</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass rounded-xl border border-border p-0.5 flex">
              {(["7d", "30d"] as const).map((r) => (
                <button key={r} onClick={() => setTimeRange(r)}
                  className={cn("px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all duration-200",
                    timeRange === r ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                  )}>
                  {r}
                </button>
              ))}
            </div>
            <button className="glass rounded-xl border border-border px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ─── KPI Cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <KpiCard icon={BarChart3}   label="Tasks today"     value={todayTasks.toLocaleString()}  delta={`${taskDelta}% vs yesterday`}     deltaDir="up"   color="#7c3aed" />
          <KpiCard icon={Activity}    label="Average uptime"  value="99.2%"                         delta="0.1% vs last week"                deltaDir="up"   color="#10b981" />
          <KpiCard icon={Cpu}         label="Agents active"   value="6 / 6"                         delta="1 in training"                    deltaDir="up"   color="#3b82f6" />
          <KpiCard icon={DollarSign}  label="Saved this month" value={`$${(totalSaved / 1000).toFixed(0)}k`} delta="19% vs last month"      deltaDir="up"   color="#f59e0b" />
        </div>

        {/* ─── Row 1: Throughput + Agent Status ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Area chart – task throughput */}
          <div className="lg:col-span-2">
            <SectionCard title="Task Throughput" subtitle={`Daily totals · last ${timeRange === "7d" ? "7" : "30"} days`} className="min-h-[320px]">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={displayed} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    {Object.entries(CHART_COLORS).map(([k, c]) => (
                      <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={c} stopOpacity={0.35} />
                        <stop offset="95%" stopColor={c} stopOpacity={0.02} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="date" {...axisProps} interval={timeRange === "30d" ? 5 : 0} />
                  <YAxis {...axisProps} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<ChartTooltip />} />
                  {Object.entries(CHART_COLORS).map(([k, c]) => (
                    <Area key={k} type="monotone" dataKey={k} name={k.toUpperCase()} stroke={c}
                      strokeWidth={1.5} fill={`url(#grad-${k})`} dot={false} />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                {Object.entries(CHART_COLORS).map(([k, c]) => (
                  <div key={k} className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                    {k.toUpperCase()}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Agent status table */}
          <SectionCard title="Agent Status" subtitle="Live · all systems" className="min-h-[320px]">
            <div className="space-y-2 overflow-auto h-full">
              {AGENTS.map((agent) => (
                <div key={agent.id} className="glass rounded-xl p-3 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {agent.status === "live"
                        ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-blink flex-shrink-0" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" style={{ border: "1px dashed rgba(251,191,36,0.7)" }} />
                      }
                      <span className="font-mono text-[12px] font-black text-violet-400">{agent.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">{agent.tasksToday.toLocaleString()} today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{ width: `${agent.uptime}%`, transition: "width 1.2s ease" }} />
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400/80">{agent.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground/50 font-mono">{agent.role}</span>
                    <span className={cn("text-[9px] font-mono uppercase tracking-wider", agent.status === "live" ? "text-emerald-400/60" : "text-amber-400/60")}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* ─── Row 2: Revenue + Pie chart ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Stacked area – revenue impact */}
          <div className="lg:col-span-2">
            <SectionCard title="Revenue Impact" subtitle="12-month cumulative value delivered ($)" className="min-h-[320px]">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={REVENUE_IMPACT} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    {[
                      { key: "laborSaved", color: "#7c3aed" },
                      { key: "fraudPrevented", color: "#3b82f6" },
                      { key: "efficiency", color: "#10b981" },
                    ].map(({ key, color }) => (
                      <linearGradient key={key} id={`rev-${key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.03} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="month" {...axisProps} />
                  <YAxis {...axisProps} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<RevenueTooltip />} />
                  <Area type="monotone" dataKey="laborSaved"     name="Labor Saved"      stroke="#7c3aed" strokeWidth={1.5} fill="url(#rev-laborSaved)"      dot={false} stackId="1" />
                  <Area type="monotone" dataKey="fraudPrevented" name="Fraud Prevented"  stroke="#3b82f6" strokeWidth={1.5} fill="url(#rev-fraudPrevented)"   dot={false} stackId="1" />
                  <Area type="monotone" dataKey="efficiency"     name="Efficiency Gains" stroke="#10b981" strokeWidth={1.5} fill="url(#rev-efficiency)"       dot={false} stackId="1" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                {[{ label: "Labor Saved", c: "#7c3aed" }, { label: "Fraud Prevented", c: "#3b82f6" }, { label: "Efficiency Gains", c: "#10b981" }].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.c }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Donut chart – task breakdown */}
          <SectionCard title="Task Breakdown" subtitle="By type · all time" className="min-h-[320px]">
            <div className="flex flex-col items-center h-full">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={TASK_TYPES} cx="50%" cy="50%" innerRadius={52} outerRadius={76}
                    paddingAngle={3} dataKey="value" stroke="none">
                    {TASK_TYPES.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip content={({ active, payload }: any) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="glass-strong rounded-xl border border-border p-2.5 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                          <span className="text-foreground/70">{d.name}</span>
                        </div>
                        <div className="font-mono font-black text-foreground mt-1">{d.value}%</div>
                      </div>
                    );
                  }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-1.5 mt-2">
                {TASK_TYPES.map((t) => (
                  <div key={t.name} className="flex items-center gap-2 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
                    <span className="text-muted-foreground flex-1 font-mono truncate">{t.name}</span>
                    <span className="font-mono font-bold text-foreground">{t.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ─── Row 3: Bar chart – tasks by agent this week ──────── */}
        <div className="mb-4">
          <SectionCard title="Tasks by Agent" subtitle="This week · daily breakdown">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AGENT_WEEKLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={1}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="day" {...axisProps} />
                  <YAxis {...axisProps} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<ChartTooltip />} />
                  {Object.entries(CHART_COLORS).map(([k, c]) => (
                    <Bar key={k} dataKey={k.toUpperCase()} name={k.toUpperCase()} fill={c} radius={[2, 2, 0, 0]} opacity={0.8} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* ─── Row 4: System health + Activity log ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* System health */}
          <SectionCard title="System Health" subtitle="All components nominal">
            <div className="space-y-3">
              {[
                { name: "NEXUS Routing Engine",     status: "Operational",  latency: "0.4s", ok: true },
                { name: "APEX Risk API",            status: "Operational",  latency: "3.1s", ok: true },
                { name: "MEDIX NLP Pipeline",       status: "Operational",  latency: "1.7s", ok: true },
                { name: "GLIDE CRM Connector",      status: "Operational",  latency: "0.9s", ok: true },
                { name: "ATLAS Reconciliation",     status: "Training",     latency: "5.2s", ok: false },
                { name: "VERTEX Doc Classifier",    status: "Operational",  latency: "2.1s", ok: true },
                { name: "Orchestration Layer",      status: "Operational",  latency: "0.1s", ok: true },
                { name: "Vector Memory (Pinecone)", status: "Operational",  latency: "0.2s", ok: true },
                { name: "Data Warehouse Sync",      status: "Operational",  latency: "0.8s", ok: true },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-3 text-[11px]">
                  {s.ok
                    ? <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    : <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  }
                  <span className="text-foreground/60 flex-1 font-mono truncate">{s.name}</span>
                  <span className={cn("font-mono text-[10px]", s.ok ? "text-emerald-400/60" : "text-amber-400/60")}>{s.status}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/40">{s.latency}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Activity log */}
          <div className="lg:col-span-2">
            <SectionCard title="Event Log" subtitle="Real-time agent activity">
              <div className="space-y-1.5 overflow-auto max-h-[320px]">
                {ACTIVITY_LOG.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 py-2 px-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                    <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", item.ok ? "bg-emerald-400/80" : "bg-amber-400/80")} />
                    <span className="font-mono text-[11px] text-violet-400/70 flex-shrink-0 w-14">{item.agent}</span>
                    <span className="text-[11px] text-foreground/60 font-mono flex-1 leading-snug">{item.event}</span>
                    <span className="text-[10px] text-muted-foreground/30 font-mono flex-shrink-0 whitespace-nowrap">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* ─── Agent Detail Table ──────────────────────────────── */}
        <div className="mt-4">
          <SectionCard title="Agent Registry" subtitle="Full specification · all deployed workers">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Agent ID", "Name", "Role", "Client", "Tasks Today", "Uptime", "Model", "P50", "P99", "Status"].map((h) => (
                      <th key={h} className="pb-3 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 pr-4 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {AGENTS.map((agent, i) => (
                    <motion.tr key={agent.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                      className="hover:bg-white/[0.015] transition-colors">
                      <td className="py-3 pr-4 font-mono text-[11px] text-muted-foreground/40">{agent.id}</td>
                      <td className="py-3 pr-4 font-mono font-black text-[12px] text-violet-400">{agent.name}</td>
                      <td className="py-3 pr-4 text-[12px] text-foreground/70">{agent.role}</td>
                      <td className="py-3 pr-4 text-[11px] text-muted-foreground font-mono">{agent.client}</td>
                      <td className="py-3 pr-4 font-mono text-[12px] text-foreground font-bold">{agent.tasksToday.toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                              style={{ width: `${agent.uptime}%` }} />
                          </div>
                          <span className="font-mono text-[11px] text-emerald-400/80">{agent.uptime}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-[11px] text-muted-foreground font-mono">{agent.model}</td>
                      <td className="py-3 pr-4 font-mono text-[11px] text-foreground/60">{agent.p50}</td>
                      <td className="py-3 pr-4 font-mono text-[11px] text-foreground/60">{agent.p99}</td>
                      <td className="py-3 pr-4">
                        {agent.status === "live"
                          ? <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-blink" />LIVE</span>
                          : <span className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />TRAINING</span>
                        }
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
