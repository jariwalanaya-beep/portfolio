const steps = [
  {
    num: "01",
    tag: "Meeting 1",
    title: "Audit",
    sub: "Data & Needs Discovery",
    desc: "We analyze your current workflows and identify operational inefficiencies.",
    list: ["Workflow analysis", "Data source mapping", "Automation opportunities", "ROI estimation"],
  },
  {
    num: "02",
    tag: "Meeting 2",
    title: "Architecture Blueprint",
    sub: "Strategy & Architecture Lock-in",
    desc: "I present the complete AI infrastructure design before development begins.",
    list: ["System architecture diagram", "Agent specification document", "Implementation timeline"],
  },
  {
    num: "03",
    tag: "Meeting 3",
    title: "Deployment & Handover",
    sub: "Execution & Full Ownership",
    desc: "Your infrastructure goes live and your team receives full operational access.",
    list: ["Full deployment", "Control dashboard training", "Documentation and system ownership"],
    active: true,
  },
];

const WorkflowSection = () => (
  <section className="py-24 bg-card" id="workflow">
    <div className="container">
      <div className="text-center mb-16">
        <div className="text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">THE PROCESS</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-4">
          A Simple <span className="gradient-text">3-Meeting Sprint</span>
        </h2>
        <p className="text-lg text-muted-foreground">Founders value clarity and efficiency. My process is designed to deliver results quickly without unnecessary meetings.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {steps.map((s, i) => (
          <div key={i} className="relative px-0 md:px-10 first:md:pl-0 last:md:pr-0 mb-12 md:mb-0">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 right-0 w-1/2 h-px bg-gradient-to-r from-primary to-transparent" />
            )}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 transition-all ${
                s.active
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card"
              }`}
            >
              <span className="font-display text-lg font-bold text-primary">{s.num}</span>
            </div>
            <div className="text-[0.72rem] font-bold tracking-[1.5px] text-primary uppercase mb-2">{s.tag}</div>
            <h3 className="font-display text-2xl font-bold mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground font-medium mb-4">{s.sub}</p>
            <p className="text-[0.93rem] text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
            <ul>
              {s.list.map((item) => (
                <li key={item} className="text-sm text-muted-foreground py-1.5 border-b border-border flex items-center gap-2">
                  <span className="text-primary font-bold">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkflowSection;
