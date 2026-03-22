const AboutSection = () => (
  <section className="py-24" id="about">
    <div className="container">
      <div className="max-w-[800px] mx-auto text-center">
        <div className="text-[11px] font-bold tracking-[2.5px] text-primary uppercase mb-3">ABOUT SHIVAM</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-8">
          I Build the <span className="gradient-text">Operating Layer</span><br/>That Powers Your Company.
        </h2>
        
        <div className="text-left space-y-6 text-muted-foreground text-lg leading-relaxed bg-surface border border-border rounded-[2rem] p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_hsla(142,71%,45%,0.08)_0%,_transparent_70%)] pointer-events-none" />
          
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center">
                <span className="font-display text-2xl font-bold gradient-text">S</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground">Shivam</h3>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Founder, Karlspace</p>
            </div>
          </div>

          <p className="relative z-10">
            I don't build simple bots.
          </p>
          <p className="relative z-10">
            I design and deploy AI infrastructure systems that replace manual workflows with scalable, intelligent operations.
          </p>
          <p className="relative z-10">
            Instead of scattered tools, spreadsheets, and disconnected automations, I build the highly-integrated systems that become the backbone of your daily operations.
          </p>
          
          <div className="flex gap-4 mt-8 pt-8 border-t border-border relative z-10">
            <a href="https://github.com/shivam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
            <a href="#contact" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Demo Links ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
