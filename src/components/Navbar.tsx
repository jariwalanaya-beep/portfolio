import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          Karl<span className="text-primary">space</span>
        </a>
        <div className="flex items-center gap-4">
          <ul className={`items-center gap-8 ${menuOpen ? "flex flex-col absolute top-full left-0 right-0 p-6 bg-background/95 backdrop-blur-xl border-b border-border" : "hidden md:flex"}`}>
            <li>
              <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>Services</a>
            </li>
            <li>
              <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>Process</a>
            </li>
            <li>
              <a href="/case-study" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>Case Study</a>
            </li>
            <li>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>Clients</a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-sm font-semibold px-5 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                Let's Talk →
              </a>
            </li>
          </ul>
          <ThemeToggle />
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-[22px] h-[2px] bg-foreground rounded-sm" />
            <span className="block w-[22px] h-[2px] bg-foreground rounded-sm" />
            <span className="block w-[22px] h-[2px] bg-foreground rounded-sm" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
