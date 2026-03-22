const Footer = () => (
  <footer className="border-t border-border py-10 bg-card">
    <div className="container flex flex-col items-center gap-6 text-center">
      <div>
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          Karl<span className="text-primary">space</span>
        </a>
        <p className="text-sm text-muted-foreground max-w-[360px] mt-2">
          AI Infrastructure for the AI-First Era
        </p>
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
        {["Services", "Process", "Clients", "Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {l}
          </a>
        ))}
      </div>
      <p className="text-xs text-dim">© 2025 Karlspace<br/>AI Infrastructure by Shivam</p>
    </div>
  </footer>
);

export default Footer;
