const clients = [
  "Fintech Startups", "E-commerce Brands", "Recruitment Agencies",
  "SaaS Companies", "Real Estate Operations", "Media Companies",
];

const ClientsTicker = () => (
  <section className="py-9 overflow-hidden">
    <div className="container">
      <p className="text-center text-[10px] font-bold tracking-[2px] text-dim mb-5">
        TRUSTED BY FOUNDERS AT
      </p>
    </div>
    <div className="relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 w-[120px] z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[120px] z-10 bg-gradient-to-l from-background to-transparent" />
      <div className="ticker-track text-[0.95rem] font-semibold text-muted-foreground">
        {[...clients, ...clients].map((c, i) => (
          <span key={i} className="flex items-center gap-8">
            {c}
            <span className="text-primary text-[0.6rem]">•</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default ClientsTicker;
