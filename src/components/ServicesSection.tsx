import { Database, Brain, LayoutDashboard, Users } from "lucide-react";

const services = [
  {
    icon: Database,
    number: "01",
    title: "Data Foundations",
    desc: "Before AI can operate effectively, your data must be structured correctly. I transform fragmented information — from spreadsheets, documents, and CRMs — into a high-performance data architecture.",
    tags: ["PostgreSQL", "Custom Schema Design", "Data Migration Pipelines"],
  },
  {
    icon: Brain,
    number: "02",
    title: "Intelligence Layer",
    desc: "The core AI system is engineered specifically around your company's rules and workflows. This ensures every automated action follows the logic your business requires.",
    tags: ["Custom LLM tuning", "Decision trees & workflow logic", "Multi-agent orchestration"],
    featured: true,
  },
  {
    icon: LayoutDashboard,
    number: "03",
    title: "Master Control Dashboard",
    desc: "Transparency is critical when implementing AI systems. I build custom monitoring dashboards that allow you to track every action taken by your AI infrastructure.",
    tags: ["Real-time task monitoring", "Operational analytics", "Custom administrative interface"],
  },
  {
    icon: Users,
    number: "04",
    title: "Client Interaction Layer",
    desc: "Your customers and internal teams interact with the system through polished interfaces designed to feel enterprise-grade.",
    tags: ["Client portals", "White-label dashboards", "API integrations"],
  },
];

const ServicesSection = () => (
  <section className="py-24" id="services">
    <div className="container">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">
          THE ARCHITECTURE
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-4">
          More Than an Agent —<br />
          <span className="gradient-text">A Complete System.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-[560px] mx-auto">
          Most AI solutions are isolated tools. Karlspace delivers a four-layer infrastructure designed for scale.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {services.map((s, i) => (
          <div
            key={i}
            className={`group relative rounded-2xl p-7 border transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-glow hover:border-glow ${
              s.featured
                ? "border-primary/25 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02]"
                : "border-border bg-surface"
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--gradient-subtle)" }} />
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-primary/[0.08] border border-primary/[0.18] flex items-center justify-center text-primary-light mb-4">
                <s.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="text-xs font-bold text-primary tracking-wider mb-2.5">{s.number}</div>
              {s.featured && (
                <span className="absolute top-5 right-5 text-[0.72rem] font-bold px-3 py-1 bg-primary/[0.12] border border-primary/[0.28] rounded-full text-primary-light">
                  Core Pillar
                </span>
              )}
              <h3 className="font-display text-lg font-bold mb-2.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs font-semibold px-3 py-1 bg-foreground/5 border border-border rounded-full text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
