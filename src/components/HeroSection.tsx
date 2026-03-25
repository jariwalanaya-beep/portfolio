import MobiusStrip from './MobiusStrip';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16" id="hero">
      {/* Background effects — overflow hidden only here so glow blobs don't scroll */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="grid-overlay" />
        <div className="glow-blob w-[500px] h-[500px] bg-primary/[0.06] -top-[150px] -left-[150px] absolute" />
        <div className="glow-blob w-[320px] h-[320px] bg-primary/[0.05] top-[40%] -right-[80px] absolute" />
        <div className="glow-blob w-[240px] h-[240px] bg-secondary/[0.04] -bottom-[80px] left-[40%] absolute" />
      </div>
      
      {/* Mobius Strip Animation */}
      <MobiusStrip />

      <div className="container relative z-10 flex flex-col items-start">
        <div className="animate-in inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-primary-light border border-primary/25 bg-primary/[0.08] mb-7">
          <span className="pulse-dot" />
          Karlspace
        </div>

        <h1 className="animate-in delay-1 font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-extrabold leading-[1.18] tracking-tight mb-5 max-w-[700px]">
          <span className="text-primary-light">AI Infrastructure</span> for the<br />
          <span className="gradient-text">AI-First</span> Era.
        </h1>

        <p className="animate-in delay-2 text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground max-w-[650px] mb-9 leading-relaxed">
          I'm Shivam, founder of Karlspace. I don't build simple bots.
          <br /><br />
          I design and deploy AI infrastructure systems that replace manual workflows with scalable, intelligent operations. Instead of scattered tools, spreadsheets, and disconnected automations, I build the <strong className="text-foreground">operating layer</strong> that powers your company.
        </p>

        <div className="animate-in delay-3 flex gap-4 flex-wrap mb-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.95rem] text-primary-foreground shadow-glow hover:-translate-y-0.5 transition-all"
            style={{ background: "var(--gradient-primary)" }}
          >
            Book a Free Audit →
          </a>
          <p className="text-sm text-muted-foreground max-w-[300px] self-center ml-2 border-l border-border pl-4">
            Discover what processes in your business can be automated and optimized with AI infrastructure.
          </p>
        </div>

        <div className="animate-in delay-4 flex items-center bg-surface border border-border rounded-2xl w-fit px-7 py-5 flex-wrap gap-y-4">
          <StatItem value="34+" label="AI Systems Built & Deployed" />
          <div className="w-px h-10 bg-border mx-4 md:mx-7 flex-shrink-0 hidden md:block" />
          <StatItem value="100%" label="Client Retention Rate" />
          <div className="w-px h-10 bg-border mx-4 md:mx-7 flex-shrink-0 hidden md:block" />
          <StatItem value="12,000+" label="Man-Hours Automated" />
          <div className="w-px h-10 bg-border mx-4 md:mx-7 flex-shrink-0 hidden md:block" />
          <StatItem value="0" label="Deadlines Missed" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center px-4 md:px-0">
    <span className="font-display text-3xl font-extrabold gradient-text leading-none">{value}</span>
    <span className="text-xs text-muted-foreground font-medium mt-1 whitespace-nowrap">{label}</span>
  </div>
);

export default HeroSection;
