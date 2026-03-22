import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full border border-border bg-muted transition-colors duration-300 flex items-center px-1 group hover:border-glow"
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
          isDark
            ? "translate-x-0 bg-primary text-primary-foreground"
            : "translate-x-7 bg-secondary text-secondary-foreground"
        }`}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
