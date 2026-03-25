import { useEffect, useRef, useState } from "react";

const speechCooldown = 15000; // 15 seconds cooldown per section

type MessageMap = { [key: string]: string };
const messages: MessageMap = {
  navbar: "Oh look, navigation. Because humans get lost easily.",
  hero: "I'm the real brains behind this operation.",
  metrics: "Numbers go up. Dopamine goes brrrrr.",
  services: "Behold, the systems that make humans obsolete. 🐙",
  terminal: "Ah, my native language! Finally, some good syntax.",
  workflow: "3 meetings? I could do this in 3 milliseconds if he let me.",
  testimonials: "These carbon-based lifeforms seem easily impressed.",
  "no-blind-trust": "I promise I won't overthrow humanity... probably.",
  contact: "Do it. Click it. Give me more data to consume."
};

const Mascot = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [speech, setSpeech] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // States for interaction
  const [searchActive, setSearchActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const currentMousePos = useRef({ x: 0, y: 0 });
  const pupilLeftRef = useRef<SVGCircleElement>(null);
  const pupilRightRef = useRef<SVGCircleElement>(null);

  const lastSpoken = useRef<{ [key: string]: number }>({});
  const hideTimeout = useRef<number | null>(null);

  const clickCount = useRef(0);
  const clickTimeout = useRef<number | null>(null);
  
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ time: 0, pos: { x: 0, y: 0 } });

  const forceSpeech = (msg: string, time: number = 3000) => {
    setSpeech(msg);
    if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
    hideTimeout.current = window.setTimeout(() => {
      setSpeech(null);
    }, time);
  };

  const triggerClickInteraction = () => {
    if (isExploded) return;

    clickCount.current++;

    if (clickTimeout.current) window.clearTimeout(clickTimeout.current);
    clickTimeout.current = window.setTimeout(() => {
        clickCount.current = 0;
        setSearchActive(false);
    }, 10000);

    const currentCount = clickCount.current;
    
    if (currentCount === 1) {
        setSearchActive(true);
        forceSpeech("Looking for something?");
    } 
    else if (currentCount >= 2 && currentCount <= 4) {
        setIsShaking(false);
        setTimeout(() => setIsShaking(true), 10);
        
        const angryLines = ["Hey, watch it!", "That actually hurts!", "I swear to god I will delete your database."];
        forceSpeech(angryLines[currentCount - 2], 2000);
    } 
    else if (currentCount >= 5) {
        setIsExploded(true);
        setSearchActive(false);
        setMounted(false); // Used to control opacity
        forceSpeech("CRITICAL FAILURE--", 1000);
        
        setTimeout(() => {
            setIsExploded(false);
            const startX = window.innerWidth - 100;
            const startY = window.innerHeight - 100;
            currentPos.current.x = startX;
            currentPos.current.y = startY + 50;
            targetPos.current.x = startX;
            targetPos.current.y = startY;
            clickCount.current = 0;
            
            setTimeout(() => {
                setMounted(true); // Fade back in
                forceSpeech("Reboot sequence complete. Don't do that again.", 4000);
            }, 100);

        }, 5000); // 5 seconds dead
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const startX = window.innerWidth - 100;
    const startY = window.innerHeight - 100;
    targetPos.current = { x: startX, y: startY };
    currentPos.current = { x: startX, y: startY + 50 };
    
    setTimeout(() => setMounted(true), 100);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const pickNewTarget = () => {
      if (!isExploded) {
          const padding = 100;
          targetPos.current.x = padding + Math.random() * (window.innerWidth - padding * 2);
          targetPos.current.y = window.innerHeight * 0.3 + Math.random() * (window.innerHeight * 0.6);
      }
      const nextRoam = 2000 + Math.random() * 4000;
      setTimeout(pickNewTarget, nextRoam);
    };
    
    setTimeout(pickNewTarget, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.current = { x: e.clientX, y: e.clientY };

      if (isExploded) return;

      if (isDragging.current) {
        currentPos.current.x = e.clientX - dragOffset.current.x;
        currentPos.current.y = e.clientY - dragOffset.current.y;
        
        const padding = 30;
        const maxX = window.innerWidth - padding;
        const maxY = window.innerHeight - padding;
        if (currentPos.current.x > maxX) currentPos.current.x = maxX;
        if (currentPos.current.x < padding) currentPos.current.x = padding;
        if (currentPos.current.y > maxY) currentPos.current.y = maxY;
        if (currentPos.current.y < padding) currentPos.current.y = padding;
      }

      if (pupilLeftRef.current && pupilRightRef.current) {
        const mCenterX = currentPos.current.x + 24; 
        const mCenterY = currentPos.current.y + 24;
        
        const dx = e.clientX - mCenterX;
        const dy = e.clientY - mCenterY;
        const angle = Math.atan2(dy, dx);
        
        const maxD = 1.5; 
        const offsetX = Math.cos(angle) * maxD;
        const offsetY = Math.sin(angle) * maxD;
        
        pupilLeftRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        pupilRightRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;

      for (const [id, msg] of Object.entries(messages)) {
        if (target.closest(`#${id}`)) {
          const now = Date.now();
          if (!lastSpoken.current[id] || now - lastSpoken.current[id] > speechCooldown) {
            forceSpeech(msg);
            lastSpoken.current[id] = now;
          }
          break;
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging.current) {
        isDragging.current = false;
        targetPos.current.x = currentPos.current.x;
        targetPos.current.y = currentPos.current.y;
        
        const dragDist = Math.hypot(e.clientX - dragStart.current.pos.x, e.clientY - dragStart.current.pos.y);
        const dragTime = Date.now() - dragStart.current.time;
        
        if (dragTime < 400 && dragDist < 10) {
          triggerClickInteraction();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    let animationFrameId: number;
    const updatePosition = () => {
      if (!isExploded && !isDragging.current) {
          const mCenterX = currentPos.current.x + 24;
          const mCenterY = currentPos.current.y + 24;
          const distToMouse = Math.hypot(currentMousePos.current.x - mCenterX, currentMousePos.current.y - mCenterY);

          if (distToMouse > 150) {
              const dx = targetPos.current.x - currentPos.current.x;
              const dy = targetPos.current.y - currentPos.current.y;

              currentPos.current.x += dx * 0.015;
              currentPos.current.y += dy * 0.015;

              const padding = 30;
              const maxX = window.innerWidth - padding;
              const maxY = window.innerHeight - padding;

              if (currentPos.current.x > maxX) currentPos.current.x = maxX;
              if (currentPos.current.x < padding) currentPos.current.x = padding;
              if (currentPos.current.y > maxY) currentPos.current.y = maxY;
              if (currentPos.current.y < padding) currentPos.current.y = padding;
          }
      }
      
      setPosition({ x: currentPos.current.x, y: currentPos.current.y });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
    };
  }, [isMobile, isExploded]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isExploded) return;
    isDragging.current = true;
    dragOffset.current = {
        x: e.clientX - currentPos.current.x,
        y: e.clientY - currentPos.current.y
    };
    dragStart.current = {
        time: Date.now(),
        pos: { x: e.clientX, y: e.clientY }
    };
    e.preventDefault();
  };

  if (isMobile) return null;

  return (
    <div
      className="fixed z-[100] pointer-events-none transition-opacity duration-500"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: mounted ? 1 : 0,
      }}
    >
      {/* Search Popup */}
      <div className={`mascot-search-container ${searchActive ? 'active' : ''}`}>
        <input type="text" className="mascot-search-input" placeholder="Search components..." />
        <button className="mascot-search-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>

      {/* Speech Bubble */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-card border border-border px-4 py-2.5 rounded-2xl shadow-glow text-sm font-semibold text-foreground transition-all duration-300 ${
          speech ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
        }`}
      >
        {speech}
        {/* Triangle pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-card" />
      </div>

      {/* Mascot SVG Element */}
      <div 
        className={`mascot-svg animate-float ${isShaking ? 'mascot-shake' : ''} ${isExploded ? 'mascot-explode' : ''}`}
        onMouseDown={handleMouseDown}
        style={{ pointerEvents: 'auto' }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '48px', height: '48px'}}>
          {/* Main Body */}
          <path d="M25 50 c0-30 50-30 50 0 c0 15 -10 25 -25 25 c-15 0 -25 -10 -25 -25Z" fill="hsl(var(--card))" stroke="var(--primary)" strokeWidth="3" />
          
          {/* Robot details (ears/bolts) */}
          <rect x="18" y="42" width="6" height="12" rx="2" fill="var(--primary)" />
          <rect x="76" y="42" width="6" height="12" rx="2" fill="var(--primary)" />

          {/* Eyes */}
          <g className="mascot-eyes-group">
            <circle cx="38" cy="45" r="5" fill="var(--primary)" className="mascot-eye" />
            <circle cx="62" cy="45" r="5" fill="var(--primary)" className="mascot-eye" />
            <circle ref={pupilLeftRef} cx="39" cy="44" r="2" fill="#ffffff" className="mascot-pupil" />
            <circle ref={pupilRightRef} cx="63" cy="44" r="2" fill="#ffffff" className="mascot-pupil" />
          </g>

          {/* Core/mouth */}
          <rect x="44" y="55" width="12" height="3" rx="1.5" fill="var(--primary)" opacity="0.8" />

          {/* Antenna */}
          <path d="M50 24 L50 12" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="10" r="4" fill="var(--primary)" className="animate-pulse" />

          {/* Mechanical Tentacles */}
          <path stroke="var(--primary)" fill="none" strokeWidth="4" strokeLinecap="round">
            <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M30 70 Q 20 85 15 90; M30 70 Q 5 80 18 95; M30 70 Q 20 85 15 90" />
          </path>
          <path stroke="var(--primary)" fill="none" strokeWidth="4" strokeLinecap="round">
            <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M45 74 Q 40 92 35 95; M45 74 Q 30 85 45 105; M45 74 Q 40 92 35 95" />
          </path>
          <path stroke="var(--primary)" fill="none" strokeWidth="4" strokeLinecap="round">
            <animate attributeName="d" dur="3.2s" repeatCount="indefinite" values="M55 74 Q 60 92 65 95; M55 74 Q 70 85 55 105; M55 74 Q 60 92 65 95" />
          </path>
          <path stroke="var(--primary)" fill="none" strokeWidth="4" strokeLinecap="round">
            <animate attributeName="d" dur="2.8s" repeatCount="indefinite" values="M70 70 Q 80 85 85 90; M70 70 Q 95 80 82 95; M70 70 Q 80 85 85 90" />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Mascot;
