const testimonials = [
  {
    quote: '"We had lead data scattered across multiple sheets. Karlspace turned it into a structured database and deployed an outreach system that runs continuously."',
    name: "Arjun Fernandez",
    role: "Founder, Fintech Startup",
    initials: "AF",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    result: "📈 Lead qualification time: 4 hours → 3 minutes",
  },
  {
    quote: '"Most vendors sell fragile automations. Karlspace delivered a full operational backbone."',
    name: "Shreya Rathore",
    role: "Operations Director, E-commerce Brand",
    initials: "SR",
    gradient: "from-primary to-[#06b6d4]",
    result: "⚡ 8,400 man-hours automated annually",
    featured: true,
  },
  {
    quote: '"The visibility into every automated task changed how we run operations."',
    name: "Karan Mehta",
    role: "CEO, Recruitment Agency",
    initials: "KM",
    gradient: "from-secondary to-destructive",
    result: "🎯 Placement speed increased by 340%",
  },
];

const TestimonialsSection = () => (
  <section className="py-24" id="testimonials">
    <div className="container">
      <div className="text-center mb-16">
        <div className="text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">CLIENT STORIES</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
          Results That <span className="gradient-text">Speak Themselves</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-glow ${
              t.featured
                ? "border-primary/30 bg-gradient-to-br from-primary/[0.07] to-primary/[0.03]"
                : "border-border bg-surface"
            }`}
          >
            <div className="text-[0.95rem] text-secondary tracking-widest mb-5">★★★★★</div>
            <blockquote className="text-[0.93rem] leading-relaxed text-muted-foreground italic mb-6">
              {t.quote}
            </blockquote>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0`}>
                {t.initials}
              </div>
              <div>
                <strong className="block text-sm font-bold">{t.name}</strong>
                <span className="text-xs text-muted-foreground">{t.role}</span>
              </div>
            </div>
            <div className="text-sm font-semibold text-secondary px-3.5 py-2 bg-primary/[0.08] border border-primary/20 rounded-lg">
              {t.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
