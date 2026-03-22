const TrustSection = () => (
  <section className="py-24 bg-card" id="no-blind-trust">
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <div className="text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">THE KARLSPACE DIFFERENCE</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-5">
            Most AI consultants deliver generic tools.<br />
            <span className="gradient-text">Karlspace delivers complete operational infrastructure.</span>
          </h2>
          <ul className="flex flex-col gap-5 mt-8">
            {[
              { icon: "👁", title: "Full Transparency", desc: "Monitor every AI action through real-time logs." },
              { icon: "🔒", title: "Complete Ownership", desc: "You receive full source code, system architecture, and documentation." },
              { icon: "📊", title: "Measurable ROI", desc: "Built-in analytics show exactly how many hours and resources are saved." },
            ].map((item) => (
              <li key={item.title} className="flex gap-4 items-start">
                <span className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </span>
                <div>
                  <strong className="block text-[0.95rem] mb-0.5">{item.title}</strong>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard mock */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-deep shadow-glow bg-[hsl(var(--terminal-bg))]">
          <div className="flex justify-between items-center px-5 py-3.5 border-b border-border bg-[hsl(var(--terminal-bar))]">
            <span className="text-sm font-semibold text-muted-foreground">Karlspace Control Panel</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
              <span className="pulse-dot" /> Live
            </span>
          </div>
          <div className="p-5 space-y-2">
            {["Agent-01 Lead Qualifier", "Agent-02 Outreach", "Agent-03 Data Enricher", "Agent-04 Reporter"].map((agent, i) => (
              <div key={agent} className="flex justify-between items-center px-4 py-3 bg-foreground/[0.03] border border-border rounded-lg">
                <span className="text-sm text-muted-foreground font-medium">{agent}</span>
                <span className={`text-[0.72rem] font-bold px-2.5 py-0.5 rounded-full ${i === 2 ? "text-dim bg-muted/30 border border-muted" : "text-primary bg-primary/10 border border-primary/30 status-pulse"}`}>
                  ● {i === 2 ? "Idle" : "Running"}
                </span>
              </div>
            ))}
            <div className="h-px bg-border my-4" />
            <div className="flex justify-around gap-3">
              {[
                { n: "1,247", l: "Tasks Done Today" },
                { n: "0ms", l: "Avg Error Rate" },
                { n: "99.9%", l: "Uptime" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <span className="block font-display text-xl font-bold gradient-text">{s.n}</span>
                  <span className="text-[0.72rem] text-dim font-medium">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TrustSection;
