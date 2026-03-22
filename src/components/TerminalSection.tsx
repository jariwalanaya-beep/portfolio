const lines = [
  { type: "cmd", prompt: "shivam@karlspace:~$", text: './deploy-agent --client="FinTech-001" --env=production' },
  { type: "out", text: "▶ Connecting to PostgreSQL cluster..." },
  { type: "success", text: "✓ Database schema validated (47 tables, 312 indexes)" },
  { type: "out", text: "▶ Loading business logic layer v2.4.1..." },
  { type: "success", text: "✓ Custom prompt chains loaded (14 agents active)" },
  { type: "out", text: "▶ Initialising Master Control Dashboard..." },
  { type: "success", text: "✓ Dashboard live" },
  { type: "out", text: "▶ Starting agent orchestration loop..." },
  { type: "success", text: "✓ Agent-01 Lead Qualifier — Running" },
  { type: "success", text: "✓ Agent-02 Outreach Automator — Running" },
  { type: "success", text: "✓ Agent-03 Data Enricher — Running" },
  { type: "success", text: "✓ Agent-04 Report Generator — Running" },
  { type: "out", text: "▶ Deploying client interaction portal..." },
  { type: "success", text: "✓ Portal live — SSL secured" },
  { type: "gap" },
  { type: "highlight", text: "🚀 Infrastructure fully operational" },
  { type: "sub", text: "Automated 1,240 man-hours/month" },
  { type: "sub", text: "Estimated ROI: 847%" },
  { type: "gap" },
  { type: "cursor" },
];

const colorMap: Record<string, string> = {
  out: "text-muted-foreground/60",
  success: "text-primary",
  highlight: "text-foreground font-semibold text-[0.95rem]",
  sub: "text-muted-foreground text-[0.82rem]",
};

const TerminalSection = () => (
  <section className="pb-24" id="terminal">
    <div className="container">
      <div className="text-center mb-16">
        <div className="text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">UNDER THE HOOD</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
          What the <span className="gradient-text">Infrastructure</span> Looks Like
        </h2>
      </div>
      <div className="rounded-2xl overflow-hidden border border-border shadow-deep bg-[hsl(var(--terminal-bg))]" style={{ boxShadow: "var(--shadow-deep), var(--shadow-glow)" }}>
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-[hsl(var(--terminal-bar))]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c841]" />
          <span className="ml-3 text-xs text-dim font-body">karlspace — agent-deploy — zsh</span>
        </div>
        <div className="p-7 font-mono text-sm leading-[1.9]">
          {lines.map((l, i) => {
            if (l.type === "gap") return <div key={i} className="h-2" />;
            if (l.type === "cursor")
              return (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary font-semibold whitespace-nowrap">karlspace@ubuntu:~$</span>
                  <span className="text-primary terminal-cursor">█</span>
                </div>
              );
            if (l.type === "cmd")
              return (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary font-semibold whitespace-nowrap">{l.prompt}</span>
                  <span className="text-foreground/90">{l.text}</span>
                </div>
              );
            return (
              <div key={i} className={colorMap[l.type] || "text-muted-foreground"}>
                {l.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default TerminalSection;
