import { useState } from "react";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="container">
        <div className="relative text-center rounded-[2rem] p-16 md:p-20 border border-primary/20 overflow-hidden" style={{ background: "var(--gradient-subtle)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,_hsla(142,71%,45%,0.15)_0%,_transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">GET STARTED</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight mb-5">
              Ready to Replace Chaos<br />With <span className="gradient-text">Infrastructure?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-[520px] mx-auto mb-9 leading-relaxed">
              Book a free 30-minute audit to discover how AI infrastructure can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-[460px] mx-auto mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full border border-border bg-foreground/5 text-foreground text-[0.95rem] outline-none focus:border-glow transition-colors placeholder:text-dim"
              />
              <button
                onClick={handleSubmit}
                className="px-7 py-3.5 rounded-full font-semibold text-[0.95rem] text-primary-foreground hover:-translate-y-0.5 transition-all whitespace-nowrap"
                style={{ background: sent ? "linear-gradient(135deg, hsl(160,84%,39%), hsl(187,72%,41%))" : "var(--gradient-primary)" }}
              >
                {sent ? "✓ Request Sent!" : "Book Free Audit →"}
              </button>
            </div>
            <p className="text-xs text-dim">No commitment. No pitch deck. Just clarity.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
