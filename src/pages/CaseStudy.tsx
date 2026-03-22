import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const checklist = [
  "AI agent answers calls and books appointments in real time",
  "Sends instant SMS confirmation with appointment code",
  "Reschedules or cancels based on patient request",
  "Syncs directly to doctor schedules - zero double bookings",
];

const outcomes = [
  {
    title: "Revenue",
    text: "Clinics went from losing patients to missed calls, to recovering $10,000+ per month in booked appointments.",
  },
  {
    title: "Automation",
    text: "The AI agent books, reschedules, and cancels appointments autonomously - staff no longer touch the phone.",
  },
  {
    title: "Reliability",
    text: "Every call gets a response. Every booking writes to the database. Every patient gets an SMS confirmation code.",
  },
];

const metrics = [
  { value: "24/7", label: "Availability", detail: "No blind booking windows" },
  { value: "$10k+", label: "Recovered Revenue", detail: "Per month from missed calls" },
  { value: "100%", label: "Calls Captured", detail: "Routed or queued for callback" },
  { value: "-1h", label: "Response Delay", detail: "Average callback time reduced" },
];

const CaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[8%] right-[10%] h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-14">
          <Link to="/" className="text-base font-bold tracking-tight [font-family:var(--font-display)] sm:text-lg">
            Karl<span className="text-primary">space</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#before-after" className="transition-colors hover:text-foreground">
              Before &amp; After
            </a>
            <a href="#what-changed" className="transition-colors hover:text-foreground">
              What Changed
            </a>
            <a href="#stats" className="transition-colors hover:text-foreground">
              Stats
            </a>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-4 sm:text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-8 sm:px-8 lg:px-14 lg:pt-10">
        <section className="relative grid min-h-[70vh] grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--bg-surface))] p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div className="absolute right-0 top-0 h-full w-[56%] bg-[radial-gradient(ellipse_at_70%_50%,hsla(142,71%,45%,0.14)_0%,transparent_65%)]" />

          <div className="relative z-10 reveal opacity-0 translate-y-6 transition-all duration-700 ease-out [&.visible]:translate-y-0 [&.visible]:opacity-100">
            <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="h-[2px] w-6 bg-primary" />
              Case Study
            </p>
            <h1 className="mb-5 text-6xl font-bold leading-[0.92] tracking-tight [font-family:var(--font-display)] sm:text-7xl lg:text-8xl">
              AI Call
              <br />
              Agent
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
              The AI voice agent that books, reschedules, and cancels clinic appointments - automatically, 24/7.
            </p>

            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground/85 sm:text-lg lg:text-[22px] lg:leading-[1.45]">
                  <span className="mt-1 text-primary">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 reveal opacity-0 translate-y-6 transition-all duration-700 ease-out delay-150 [&.visible]:translate-y-0 [&.visible]:opacity-100">
            <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-primary/35 bg-black/20 shadow-[0_24px_70px_rgba(0,0,0,0.5),0_0_60px_hsla(142,71%,45%,0.18)]">
              <img
                src="/case-study/pokk-img2.png"
                alt="Call system workflow"
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="before-after" className="reveal mt-16 rounded-2xl border border-border bg-[hsl(var(--bg-surface))] p-6 opacity-0 translate-y-6 transition-all duration-700 ease-out sm:p-10 [&.visible]:translate-y-0 [&.visible]:opacity-100">
          <div className="mb-10">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <span className="h-[2px] w-6 bg-primary" />
              Architecture
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight [font-family:var(--font-display)] sm:text-4xl lg:text-5xl">
              Before &amp; After
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="overflow-hidden rounded-xl border border-border bg-surface">
              <p className="m-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Before
              </p>
              <img src="/case-study/pokk-img1.png" alt="Before state" className="w-full opacity-90 transition-opacity hover:opacity-100" />
            </article>

            <article className="overflow-hidden rounded-xl border border-border bg-surface">
              <p className="m-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                After
              </p>
              <img src="/case-study/pokk-img3.png" alt="After state" className="w-full opacity-90 transition-opacity hover:opacity-100" />
            </article>
          </div>
        </section>

        <section id="what-changed" className="reveal mt-16 rounded-2xl border border-border bg-[hsl(var(--bg-surface))] p-6 opacity-0 translate-y-6 transition-all duration-700 ease-out sm:p-10 [&.visible]:translate-y-0 [&.visible]:opacity-100">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="h-[2px] w-6 bg-primary" />
            THE "AFTER" - THE OUTCOME
          </p>
          <h2 className="text-3xl font-bold tracking-tight [font-family:var(--font-display)] sm:text-4xl lg:text-5xl">
            What Changed
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Before this system, every missed call was a lost patient. Now the AI agent handles every inbound call,
            checks doctor availability in real time, books the slot, and fires an SMS confirmation - all without a
            single human involved.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <article
                key={outcome.title}
                className="group rounded-xl border border-border bg-[hsl(var(--bg-elevated))] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
              >
                <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  <span className="h-[2px] w-4 bg-primary" />
                  {outcome.title}
                </p>
                <p className="text-sm leading-relaxed text-foreground/75">{outcome.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="stats"
          className="reveal mt-16 rounded-2xl border border-border bg-[hsl(var(--bg-surface))] p-6 opacity-0 translate-y-6 transition-all duration-700 ease-out sm:p-10 [&.visible]:translate-y-0 [&.visible]:opacity-100"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="h-[2px] w-6 bg-primary" />
            Performance
          </p>

          <div className="mt-8 grid grid-cols-1 gap-[1px] overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="bg-[hsl(var(--bg-elevated))] p-7">
                <p className="text-4xl font-bold leading-none tracking-tight text-primary [font-family:var(--font-display)] sm:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{metric.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{metric.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal mt-16 overflow-hidden rounded-2xl border border-border bg-[hsl(var(--bg-surface))] opacity-0 translate-y-6 transition-all duration-700 ease-out [&.visible]:translate-y-0 [&.visible]:opacity-100">
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_auto]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                ● Ready To Deploy
              </p>
              <h2 className="text-3xl font-bold tracking-tight [font-family:var(--font-display)] sm:text-4xl lg:text-5xl">
                Build This For Your Business
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                We can map your inbound call flow, identify revenue leaks, and deploy the same system architecture to
                fit your operation.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:items-end">
              <p className="text-xs text-muted-foreground sm:text-right">
                Trusted workflow
                <br />
                for service-first teams
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-1 hover:brightness-110"
              >
                Book a Free Audit
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseStudy;
