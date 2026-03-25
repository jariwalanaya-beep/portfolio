import { useEffect, useRef, useState } from "react";

const metrics = [
  { target: 34, suffix: "+", label: "AI Systems Built & Deployed" },
  { target: 100, suffix: "%", label: "Client Retention Rate" },
  { target: 12000, suffix: "+", label: "Man-Hours Automated" },
  { target: 0, suffix: "", label: "Deadlines Missed" },
];

const MetricsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState(metrics.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          // Small delay so React finishes painting before counters start
          setTimeout(() => {
            metrics.forEach((m, i) => {
              if (m.target === 0) return; // already at 0, no animation needed
              const duration = 2000;
              const step = 16;
              const increment = m.target / (duration / step);
              let current = 0;
              const timer = setInterval(() => {
                current = Math.min(current + increment, m.target);
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = Math.floor(current);
                  return next;
                });
                if (current >= m.target) clearInterval(timer);
              }, step);
            });
          }, 100);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section ref={ref} className="py-12 border-t border-b border-border bg-card">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={i} className="text-center py-8 px-6 relative">
              {i > 0 && (
                <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-border hidden md:block" />
              )}
              <span className="font-display text-[clamp(2.4rem,4vw,3.5rem)] font-extrabold gradient-text">
                {counts[i].toLocaleString()}
              </span>
              <span className="font-display text-3xl font-extrabold text-primary">{m.suffix}</span>
              <p className="text-sm text-muted-foreground font-medium mt-1.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
