const techStack = [
  { name: "Python", icon: "🐍" },
  { name: "FastAPI", icon: "⚡" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "LangChain", icon: "🦜" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
];

const TechStackSection = () => (
  <section className="py-20 bg-background border-t border-b border-border" id="tech-stack">
    <div className="container overflow-hidden">
      <p className="text-center text-[10px] font-bold tracking-[2.5px] text-primary uppercase mb-10">CORE TECHNOLOGIES</p>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 max-w-[900px] mx-auto">
        {techStack.map((tech) => (
          <div key={tech.name} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface border border-border transition-all hover:bg-surface-hover hover:border-glow hover:shadow-glow cursor-default">
            <span className="text-xl">{tech.icon}</span>
            <span className="font-semibold text-[0.95rem] text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;
