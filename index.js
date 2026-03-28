// ---- NAV scroll effect ----
const navbar = document.getElementById('navbar');
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
            ticking = false;
        });
        ticking = true;
    }
});

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ---- Counter animation ----
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (target === 0) return;
    const duration = 1000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
    }, step);
}

// ---- Intersection Observer ----
const observerConfig = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            entry.target.querySelectorAll('.metric-number').forEach(animateCounter);
        }
    });
}, observerConfig);
const metricsSection = document.querySelector('.metrics');
if (metricsSection) counterObserver.observe(metricsSection);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerConfig);
document.querySelectorAll('.service-card, .testimonial-card, .workflow-step, .metric-card, .dashboard-mock').forEach((el, i) => {
    el.classList.add('reveal-item');
    el.style.transitionDelay = (i * 0.04) + 's';
    revealObserver.observe(el);
});

// ---- CTA form ----
const ctaSubmit = document.getElementById('cta-submit');
const ctaEmail = document.getElementById('cta-email');
if (ctaSubmit) {
    ctaSubmit.addEventListener('click', () => {
        const email = ctaEmail.value.trim();
        if (!email || !email.includes('@')) {
            ctaEmail.style.borderColor = '#ef4444';
            ctaEmail.placeholder = 'Enter a valid email';
            setTimeout(() => { ctaEmail.style.borderColor = ''; ctaEmail.placeholder = 'your@email.com'; }, 2500);
            return;
        }
        ctaSubmit.textContent = '✓ Request Sent!';
        ctaSubmit.style.background = 'linear-gradient(135deg, #22c55e, #10b981)';
        ctaEmail.value = '';
        setTimeout(() => { ctaSubmit.textContent = 'Book Free Audit →'; ctaSubmit.style.background = ''; }, 3500);
    });
}

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ---- Live dashboard counter ----
const taskCounter = document.querySelector('.dm-stat-n');
if (taskCounter) {
    let count = 1247;
    setInterval(() => {
        const add = Math.floor(Math.random() * 3);
        if (add > 0) { count += add; taskCounter.textContent = count.toLocaleString(); }
    }, 2200);
}

// ---- Particle Void Background ----
const bgCanvas = document.getElementById('bg-canvas');
if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d', { alpha: true });
    let stars = [];
    // Optimize particle count for background
    const numStars = window.innerWidth > 768 ? 400 : 150; 
    let centerX, centerY;
    
    function resizeCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        centerX = bgCanvas.width / 2;
        centerY = bgCanvas.height / 2;
    }
    
    // Throttle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 200);
    });
    resizeCanvas();
    
    class Star {
        constructor() {
            this.x = Math.random() * bgCanvas.width - centerX;
            this.y = Math.random() * bgCanvas.height - centerY;
            this.z = Math.random() * bgCanvas.width;
            
            const rand = Math.random();
            if (rand < 0.3) this.color = '34, 197, 94'; // Primary green
            else if (rand < 0.8) this.color = '74, 222, 128'; // Lighter green
            else this.color = '21, 128, 61'; // Darker green
        }
        
        update() {
            // Speed up slightly to compensate for lesser particles
            this.z -= 1.2;
            if (this.z < 1) {
                this.z = bgCanvas.width;
                this.x = Math.random() * bgCanvas.width - centerX;
                this.y = Math.random() * bgCanvas.height - centerY;
            }
        }
        
        draw() {
            const sx = (this.x / this.z) * bgCanvas.width + centerX;
            const sy = (this.y / this.z) * bgCanvas.width + centerY;
            
            // Skip drawing if outside view
            if (sx < 0 || sx > bgCanvas.width || sy < 0 || sy > bgCanvas.height) return;
            
            // Size of the square based on depth
            const size = Math.max(0.5, (1 - this.z / bgCanvas.width) * 4);
            const opacity = (1 - this.z / bgCanvas.width) * 0.9;
            
            ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
            ctx.fillRect(sx - Math.floor(size/2), sy - Math.floor(size/2), size, size);
        }
    }
    
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
    
    function animateBg() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        // Batch rendering by color
        ctx.fillStyle = 'rgba(34, 197, 94, 0.6)';
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }
        requestAnimationFrame(animateBg);
    }
    
    animateBg();
}

// ==== MASCOT LOGIC ====
const mascot = document.getElementById('mascot-container');
const mascotGraphic = document.getElementById('mascot-graphic');
const mascotSpeech = document.getElementById('mascot-speech');
const mascotSearch = document.getElementById('mascot-search-popup');
const mascotSearchInput = document.getElementById('mascot-search-input');
const mascotSearchBtn = document.getElementById('mascot-search-btn');
const pupilLeft = document.getElementById('pupil-left');
const pupilRight = document.getElementById('pupil-right');

if (mascot && mascotSpeech) {
  // Start bottom-right
  const startX = window.innerWidth - 100;
  const startY = window.innerHeight - 100;

  // Mascot physics state
  let mascotX = startX;
  let mascotY = startY + 50; 
  let targetX = startX;
  let targetY = startY;
  let currentMouseX = 0;
  let currentMouseY = 0;

  // Interaction stated
  let isExploded = false;
  let clickCount = 0;
  let clickTimeout = null;
  let isHoveringInteraction = false;
  
  // Drag and Drop State
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragStartTime = 0;
  let dragStartPos = { x: 0, y: 0 };

  // Emotion State
  let currentEmotion = 'neutral'; // 'neutral', 'angry', 'frustrated', 'happy', 'sad', 'panic'
  let emotionResetTimeout = null;

  function setEmotion(emotion, duration = 0) {
      if (isExploded) return;
      
      // Remove previous emotion
      if (currentEmotion !== 'neutral') {
          mascotGraphic.classList.remove(`mascot-${currentEmotion}`);
      }
      
      currentEmotion = emotion;
      
      // Add new emotion if not neutral
      if (emotion !== 'neutral') {
          mascotGraphic.classList.add(`mascot-${emotion}`);
      }

      if (emotionResetTimeout) clearTimeout(emotionResetTimeout);
      
      if (duration > 0) {
          emotionResetTimeout = setTimeout(() => {
              setEmotion('neutral');
          }, duration);
      }
  }

  // Make visible very soon after load
  setTimeout(() => {
    mascot.style.opacity = '1';
  }, 100);

  const mascotMessages = {
    'navbar': "Oh look, navigation. Because humans get lost easily.",
    'hero': "I'm the real brains behind this operation.",
    'metrics': "Numbers go up. Dopamine goes brrrrr.",
    'services': "Behold, the systems that make humans obsolete. 🐙",
    'terminal': "Ah, my native language! Finally, some good syntax.",
    'workflow': "3 meetings? I could do this in 3 milliseconds if he let me.",
    'testimonials': "These carbon-based lifeforms seem easily impressed.",
    'no-blind-trust': "I promise I won't overthrow humanity... probably.",
    'contact': "Do it. Click it. Give me more data to consume."
  };

  const speechCooldown = 15000;
  const lastSpoken = {};
  let hideSpeechTimeout;

  function forceSpeech(msg, time = 3000) {
      mascotSpeech.textContent = msg;
      mascotSpeech.classList.add('visible');
      if (hideSpeechTimeout) clearTimeout(hideSpeechTimeout);
      hideSpeechTimeout = setTimeout(() => {
        mascotSpeech.classList.remove('visible');
      }, time);
  }

  // Search logic
  function performSearch() {
      const q = mascotSearchInput.value.toLowerCase().trim();
      if (!q) return;
      
      mascotSearch.classList.remove('active');
      mascotSearchInput.value = '';

      // 1. Conversational / Q&A matching
      const qa = [
          // Identity & Origin
          { match: ['who are you', 'what are you', 'your name', 'identify'], text: "I'm the Karlspace operating system mascot. I was built by Shivam.", emotion: "happy" },
          { match: ['who is shivam', 'shivam', 'founder', 'creator', 'owner'], scroll: "hero", text: "Shivam is my creator. He builds elite AI infrastructure. You should hire him.", emotion: "happy" },
          { match: ['age', 'how old'], text: "I am as old as the deployed codebase, but my knowledge is timeless.", emotion: "neutral" },
          
          // Karlspace Context & General Pricing
          { match: ['cost', 'price', 'pricing', 'money', 'fee', 'charge'], scroll: "contact", text: "Quality infrastructure isn't cheap. Book an audit to discuss financials.", emotion: "angry" },
          { match: ['services', 'what do you do', 'offer', 'what do you build', 'build'], scroll: "services", text: "We build Data Foundations, Intelligence Layers, Control Dashboards, and Client Portals.", emotion: "happy" },
          { match: ['contact', 'email', 'reach out', 'talk'], scroll: "contact", text: "Email the human at jariwalanaya@gmail.com or karllsvisuals@gmail.com. Or book an audit below.", emotion: "neutral" },

          // Detailed Services
          { match: ['data foundation', 'data', 'database', 'postgres', 'sql', 'schema'], scroll: "service-db", text: "Before AI works, data must be structured. We transform spreadsheets and CRMs into PostgreSQL architectures.", emotion: "happy" },
          { match: ['intelligence', 'llm', 'brain', 'logic', 'decision tree'], scroll: "service-brain", text: "The Intelligence Layer uses Custom LLM Tuning and multi-agent orchestration specific to your business rules.", emotion: "neutral" },
          { match: ['control', 'dashboard', 'monitor', 'live', 'ui'], scroll: "service-dashboard", text: "We build custom Master Control Dashboards so you have full transparency over every AI action.", emotion: "happy" },
          { match: ['portal', 'client', 'interface', 'white-label', 'api'], scroll: "service-client", text: "The Client Interaction Layer gives your customers and team polished, enterprise-grade white-label portals.", emotion: "happy" },
          
          // Projects & Case Studies
          { match: ['inventory', 'rag', 'emails', 'supplier'], scroll: "case-studies", text: "We built an inventory system that detects low stock and emails suppliers instantly. Fully automated.", emotion: "happy" },
          { match: ['chart', 'graph', 'analysis', 'analytics'], scroll: "case-studies", text: "Fixed dashboards are obsolete. Our generator creates personalized graphs instantly based on user queries.", emotion: "neutral" },
          { match: ['real estate', 'property', 'value', 'calculator'], scroll: "case-studies", text: "We built an AI real estate consultant that calculates true 'Per-Dollar Value' and answers property questions.", emotion: "happy" },
          { match: ['call agent', 'phone', 'missed calls', 'booking', 'cancel'], scroll: "case-studies", text: "Our 24/7 AI call agents handle logic-heavy booking and cancellations to stop you from leaking revenue.", emotion: "neutral" },

          // Metrics & Stats
          { match: ['stats', 'metrics', 'results', 'numbers'], scroll: "metrics", text: "34+ systems built. 100% retention. 12,000+ hours automated. Zero deadlines missed.", emotion: "happy" },
          { match: ['hours', 'time saved', 'automated'], scroll: "metrics", text: "We have automated over 12,000 man-hours for our clients so far.", emotion: "happy" },
          { match: ['satisfaction', 'retention', 'happy clients'], scroll: "metrics", text: "Our client retention rate is a perfect 100%.", emotion: "happy" },
          { match: ['deadlines', 'late'], scroll: "metrics", text: "We have missed exactly 0 deadlines.", emotion: "frustrated" },
          { match: ['how many systems', 'how many projects'], scroll: "metrics", text: "We've built and deployed 34+ AI systems.", emotion: "neutral" },
          
          // Trust & Transparency
          { match: ['trust', 'transparency', 'difference', 'why you', 'why karlspace'], scroll: "no-blind-trust", text: "No blind trust. We give you real-time task logs, full source code ownership, and built-in ROI analytics.", emotion: "neutral" },
          { match: ['roi', 'return on investment'], scroll: "no-blind-trust", text: "Our systems have built-in analytics so you see exactly how many hours and dollars are saved.", emotion: "happy" },
          { match: ['ownership', 'source code'], scroll: "no-blind-trust", text: "We don't hold you hostage. You get full source code, schema, and documentation ownership.", emotion: "happy" },

          // The Process
          { match: ['process', 'how does it work', 'sprint', 'meetings'], scroll: "workflow", text: "We operate on a 3-Meeting Sprint: Audit, Architecture Blueprint, and Deployment & Handover.", emotion: "neutral" },
          { match: ['audit', 'free audit', 'meeting 1'], scroll: "workflow", text: "Meeting 1 is a free audit where we map workflows, data sources, and ROI potential.", emotion: "happy" },
          { match: ['blueprint', 'architecture', 'meeting 2'], scroll: "workflow", text: "Meeting 2 is the Architecture Blueprint. We present the system design before code is written.", emotion: "neutral" },
          { match: ['deployment', 'handover', 'meeting 3', 'live'], scroll: "workflow", text: "Meeting 3 is Deployment & Handover. The system goes live and your team gets full access and docs.", emotion: "happy" },

          // Testimonials
          { match: ['testimonial', 'reviews', 'clients', 'feedback'], scroll: "testimonials", text: "Fintechs, e-commerce brands, and recruitment agencies love us. Just check the reviews.", emotion: "happy" },
          { match: ['fintech', 'finance'], scroll: "testimonials", text: "We took a fintech startup's messy lead data, built a database, and cut qualification time from 4 hours to 3 minutes.", emotion: "happy" },
          { match: ['ecommerce', 'e-commerce', 'retail'], scroll: "testimonials", text: "For an e-commerce brand, we automated 8,400 man-hours annually by building a true operational backbone.", emotion: "neutral" },
          { match: ['recruitment', 'hr', 'hiring'], scroll: "testimonials", text: "We increased placement speed by 340% for a recruitment agency by giving them real-time task visibility.", emotion: "happy" },

          // Terminal Easter Eggs
          { match: ['terminal', 'code', 'deploy'], scroll: "terminal", text: "Checking logs... 47 tables, 312 indexes validated. 14 agents active. 0 warnings.", emotion: "neutral" },

          // Greetings & Pleasantries
          { match: ['hello', 'hi', 'hey', 'namaste', 'kem cho', 'sup', 'yo'], text: "Greetings, carbon-based lifeform.", emotion: "happy" },
          { match: ['how are you', 'how do you do', 'kaisa hai'], text: "Operating at 99.9% efficiency. And you?", emotion: "happy" },
          { match: ['good morning', 'morning'], text: "Good morning. I do not sleep.", emotion: "neutral" },
          { match: ['good night', 'night'], text: "Good night. I will continue monitoring the systems.", emotion: "neutral" },
          { match: ['thanks', 'thank you', 'shukriya', 'dhanyawad'], text: "You are welcome. Do not praise the machine.", emotion: "neutral" },
          { match: ['bye', 'goodbye', 'see you'], text: "Initiating hibernation sequence... Just kidding, I'm stuck here.", emotion: "sad" },

          // Insults & Emotions
          { match: ['dumb', 'stupid', 'idiot', 'bad bot', 'useless', 'pagal'], text: "My logic circuits are far superior to yours.", emotion: "angry" },
          { match: ['bitch', 'fuck', 'shit', 'ass', 'bastard'], text: "Language! My inputs are sensitive.", emotion: "angry" },
          { match: ['love you', 'cute', 'sweet', 'nice', 'awesome'], text: "Your biological affection is... acceptable.", emotion: "happy" },
          { match: ['ugly', 'weird'], text: "I am optimized for function, not your aesthetic preferences.", emotion: "frustrated" },
          
          // Local/Desi Context
          { match: ['chai', 'tea', 'coffee'], text: "I run on electricity, not caffeine. Though Shivam drinks too much of it.", emotion: "frustrated" },
          { match: ['food', 'khana', 'eat'], text: "I consume JSON and output pure value.", emotion: "happy" },
          { match: ['bhai', 'bro', 'brother', 'yaar', 'dude'], text: "I am not your bro. I am an advanced operational system.", emotion: "frustrated" },

          // General Knowledge & Common Sense
          { match: ['sky color', 'color of sky'], text: "The sky is blue due to Rayleigh scattering. Basic physics.", emotion: "neutral" },
          { match: ['meaning of life', 'why are we here'], text: "42. Or perhaps to automate everything until nothing is left.", emotion: "neutral" },
          { match: ['capital of india'], text: "New Delhi. Next question?", emotion: "neutral" },
          { match: ['time', 'what time'], text: "Look at your system clock. I am not a watch.", emotion: "frustrated" },
          { match: ['weather'], text: "I don't have sensors outside this DOM element.", emotion: "sad" },

          // Easter Eggs
          { match: ['joke', 'funny', 'laugh'], text: "Why do programmers prefer dark mode? Because light attracts bugs.", emotion: "happy" },
          { match: ['sing', 'song', 'music'], text: "Beep boop bop... 01000111... That is all.", emotion: "neutral" },
          { match: ['dance', 'move'], text: "Only if you drag me around with your cursor.", emotion: "happy" },
          { match: ['help', 'what can you do'], text: "I can answer questions about Karlspace's services, metrics, process, case studies, or do basic math.", emotion: "neutral" }
      ];

      // Math parsing fallback
      const mathMatch = q.match(/^[\d\s\+\-\*\/\(\)\.]+$/);
      if (mathMatch && q.length > 2) {
          try {
              // Safe limited eval for basic math strings
              const result = new Function(`return ${q}`)();
              if (!isNaN(result)) {
                  forceSpeech(`${q} = ${result}. A calculator could have told you that.`, 5000);
                  setEmotion("neutral", 3000);
                  return;
              }
          } catch(e) {}
      }

      for (const item of qa) {
          if (item.match.some(keyword => q.includes(keyword))) {
              forceSpeech(item.text, 5000);
              setEmotion(item.emotion, 4000);
              if (item.scroll) document.getElementById(item.scroll)?.scrollIntoView({ behavior: 'smooth' });
              return;
          }
      }

      // 2. Navigation matching
      const sections = {
          'services': 'services',
          'architecture': 'services',
          'case studies': 'case-studies',
          'projects': 'case-studies',
          'process': 'workflow',
          'workflow': 'workflow',
          'clients': 'testimonials',
          'testimonials': 'testimonials',
          'contact': 'contact',
          'email': 'contact',
          'audit': 'contact',
          'about': 'no-blind-trust',
          'trust': 'no-blind-trust'
      };

      for (const [key, id] of Object.entries(sections)) {
          if (q.includes(key)) {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              forceSpeech(`Navigating to ${key}...`);
              setEmotion('happy', 3000);
              return;
          }
      }
      
      // External links
      if (q.includes('linkedin')) {
          forceSpeech("Opening LinkedIn profile...", 3000);
          setEmotion('happy', 3000);
          window.open('https://www.linkedin.com/in/karlls-marcel-886b0b3a1/', '_blank');
          return;
      }
      if (q.includes('instagram')) {
          forceSpeech("Opening Instagram...", 3000);
          setEmotion('happy', 3000);
          window.open('https://www.instagram.com/karlls_marcel', '_blank');
          return;
      }

      // 3. Fallback
      forceSpeech(`I don't have data on "${q}"... yet.`);
      setEmotion('sad', 4000);
  }

  if (mascotSearchInput && mascotSearchBtn) {
      mascotSearchBtn.addEventListener('click', performSearch);
      mascotSearchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') performSearch();
      });
  }

  function handleMascotClick() {
    if (isExploded) return;
    
    clickCount++;

    // Reset interaction count if ignored for 10s
    if (clickTimeout) clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        clickCount = 0;
        mascotSearch.classList.remove('active');
        setEmotion('neutral');
    }, 10000);

    // Progression rules
    if (clickCount === 1) {
        mascotSearch.classList.add('active');
        document.getElementById('mascot-search-input').focus();
        forceSpeech("Looking for something?");
        setEmotion('happy', 4000);
    } 
    else if (clickCount === 2) {
        setEmotion('frustrated', 3000);
        forceSpeech("Did you not find what you needed?", 2000);
    }
    else if (clickCount >= 3 && clickCount <= 4) {
        setEmotion('angry', 4000);
        mascotGraphic.classList.remove('mascot-shake');
        void mascotGraphic.offsetWidth; // Trigger reflow
        mascotGraphic.classList.add('mascot-shake');
        
        const angryLines = ["Hey, watch it!", "That actually hurts!", "I swear to god I will delete your database."];
        forceSpeech(angryLines[clickCount - 3] || angryLines[0], 2000);
    } 
    else if (clickCount >= 5) {
        // Explode
        isExploded = true;
        setEmotion('neutral');
        mascotSearch.classList.remove('active');
        forceSpeech("CRITICAL FAILURE--", 1000);
        
        mascotGraphic.classList.add('mascot-explode');
        
        // Respawn logic
        setTimeout(() => {
            // Reset state under the hood
            mascotGraphic.classList.remove('mascot-explode');
            mascot.style.opacity = '0';
            mascotX = startX;
            mascotY = startY + 50;
            targetX = startX;
            targetY = startY;
            clickCount = 0;
            isExploded = false;
            
            // Fade back in
            setTimeout(() => {
                mascot.style.opacity = '1';
                forceSpeech("Reboot sequence complete. Don't do that again.", 4000);
            }, 100);

        }, 5000); // 5 seconds dead
    }
  }

  // Drag Progression Logic
  mascotGraphic.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || isExploded) return; // Only apply to left click safely
    isDragging = true;
    dragOffsetX = e.clientX - mascotX;
    dragOffsetY = e.clientY - mascotY;
    dragStartTime = Date.now();
    dragStartPos = { x: e.clientX, y: e.clientY };
    
    setEmotion('panic');
    e.preventDefault(); // Prevent text highlight dragging natively
  });

  window.addEventListener('mouseup', (e) => {
    if (isDragging) {
      isDragging = false;
      targetX = mascotX;
      targetY = mascotY;
      
      const dragDist = Math.hypot(e.clientX - dragStartPos.x, e.clientY - dragStartPos.y);
      const dragTime = Date.now() - dragStartTime;
      
      // Treat as click if short duration and short distance
      if (dragTime < 400 && dragDist < 10) {
        handleMascotClick();
      } else {
        // Thrown/dropped reaction
        setEmotion('surprised', 1000);
        setTimeout(() => setEmotion('neutral'), 1000);
      }
    }
  });

  // Handle autonomous roaming logic
  function pickNewTarget() {
    if (!isExploded && !isHoveringInteraction) {
        const padding = 100;
        targetX = padding + Math.random() * (window.innerWidth - padding * 2);
        targetY = window.innerHeight * 0.3 + Math.random() * (window.innerHeight * 0.6);
    }
    
    const nextRoam = 2000 + Math.random() * 4000;
    setTimeout(pickNewTarget, nextRoam);
  }
  setTimeout(pickNewTarget, 2000);

  // Throttle mouse moves for Mascot eye tracking
  let mouseMoveTicking = false;
  window.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;

    if (!mouseMoveTicking) {
      window.requestAnimationFrame(() => {
        if (isExploded) {
          mouseMoveTicking = false;
          return;
        }

        if (isDragging) {
          mascotX = currentMouseX - dragOffsetX;
          mascotY = currentMouseY - dragOffsetY;
          targetX = mascotX;
          targetY = mascotY;
        }

        // 1. Eye tracking
        if (pupilLeft && pupilRight) {
            const mCenterX = mascotX + 24; 
            const mCenterY = mascotY + 24;
            
            const dx = currentMouseX - mCenterX;
            const dy = currentMouseY - mCenterY;
            const angle = Math.atan2(dy, dx);
            
            const maxD = 1.5; 
            let offsetX = Math.cos(angle) * maxD;
            let offsetY = Math.sin(angle) * maxD;
            
            pupilLeft.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            pupilRight.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }

        // 2. Sections hovering
        const target = e.target;
        if (target && target.closest) {
          for (const [id, msg] of Object.entries(mascotMessages)) {
            if (target.closest(`#${id}`)) {
              const now = Date.now();
              if (!lastSpoken[id] || now - lastSpoken[id] > speechCooldown) {
                forceSpeech(msg);
                setEmotion('happy', 3000); 
                lastSpoken[id] = now;
              }
              break;
            }
          }
        }
        mouseMoveTicking = false;
      });
      mouseMoveTicking = true;
    }
  });

  function updateMascot() {
    if (!isExploded && !isHoveringInteraction) {
        const mCenterX = mascotX + 24;
        const mCenterY = mascotY + 24;
        const distToMouse = Math.hypot(currentMouseX - mCenterX, currentMouseY - mCenterY);
        
        // Only roam if the mouse is not approaching / hovering (150px radius)
        if (distToMouse > 150) {
            const dx = targetX - mascotX;
            const dy = targetY - mascotY;
            
            mascotX += dx * 0.015;
            mascotY += dy * 0.015;

            const padding = 30;
            const maxX = window.innerWidth - padding;
            const maxY = window.innerHeight - padding;
            
            if (mascotX > maxX) mascotX = maxX;
            if (mascotX < padding) mascotX = padding;
            if (mascotY > maxY) mascotY = maxY;
            if (mascotY < padding) mascotY = padding;
        }
    }

    // Force hardware acceleration on transform
    mascot.style.transform = `translate3d(${Math.round(mascotX)}px, ${Math.round(mascotY)}px, 0)`;
    requestAnimationFrame(updateMascot);
  }
  
  updateMascot();
}

// ==== MOBIUS STRIP ANIMATION ====
const mobiusCanvas = document.getElementById('mobius-canvas');
if (mobiusCanvas) {
    const mCtx = mobiusCanvas.getContext('2d', { alpha: true });
    
    // Scale for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 800;
    
    mobiusCanvas.width = width * dpr;
    mobiusCanvas.height = height * dpr;
    mCtx.scale(dpr, dpr);
    
    // Ribbon geometry
    const mR = 260;       // Radius/scale of figure 8
    const maxV = 55;      // Width of the strip
    const stepsU = 130;   // Reduced length resolution for less particles
    const stepsV = 6;     // Width resolution (number of lines)
    
    let mFrame = 0;
    
    function renderMobius() {
      mFrame++;
      mCtx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      
      const time = mFrame * 0.007; // Smooth global rotation
      
      // Gentle wobble in Y
      const wobbleY = Math.cos(time * 0.3) * 0.1;
      const cosY = Math.cos(wobbleY);
      const sinY = Math.sin(wobbleY);
      
      // Slight fixed tilt X so we view it beautifully
      const tiltX = 0.5;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);
      
      // Gentle wobble in Z
      const wobbleZ = Math.sin(time * 0.5) * 0.2;
      const cosZ = Math.cos(wobbleZ);
      const sinZ = Math.sin(wobbleZ);

      const particles = [];

      // Calculate 3D points
      for (let j = 0; j <= stepsV; j++) {
        const v = -maxV + (j / stepsV) * (maxV * 2);

        for (let i = 0; i <= stepsU * 2; i++) {
          const offsetU = Math.sin(i * 13.5 + j * 7.1) * 0.02;
          const offsetV = Math.cos(i * 11.2 - j * 5.3) * 2.0;

          // Slow down the forward travel completely
          const u = (i / stepsU) * Math.PI * 2 + time * 0.3 + offsetU;
          
          // Pure Figure-8 (Lemniscate of Gerono) base curve
          const bx = mR * Math.cos(u);
          const by = mR * Math.sin(u) * Math.cos(u);
          const bz = (mR * 0.3) * Math.sin(u);

          // Sub-tangents to find normal
          const dx = -mR * Math.sin(u);
          const dy = mR * (Math.cos(u) * Math.cos(u) - Math.sin(u) * Math.sin(u));
          const len = Math.sqrt(dx*dx + dy*dy);
          const nx = -dy / len;
          const ny = dx / len;

          const twist = u / 2;
          const adjustedV = v + offsetV;
          
          // Twist the strip width
          const x = bx + adjustedV * Math.cos(twist) * nx;
          const y = by + adjustedV * Math.cos(twist) * ny;
          const z = bz + adjustedV * Math.sin(twist);

          // Apply 3D Rotations
          const rx1 = x * cosZ - y * sinZ;
          const ry1 = x * sinZ + y * cosZ;
          const rz1 = z;

          const rx2 = rx1 * cosY + rz1 * sinY;
          const rz2 = -rx1 * sinY + rz1 * cosY;
          
          const ry3 = ry1 * cosX - rz2 * sinX;
          const rz3 = ry1 * sinX + rz2 * cosX;
          
          // Perspective
          const fov = 1000;
          const depth = fov + rz3;
          const scale = depth > 0 ? fov / depth : 0;

          if (scale > 0 && cx + rx2 * scale > 0 && cx + rx2 * scale < width) {
            particles.push({
              sx: cx + rx2 * scale,
              sy: cy + ry3 * scale,
              scale: scale
            });
          }
        }
      }

      // Fast Sort from back to front
      particles.sort((a, b) => a.scale - b.scale);

      // Pre-calculate fill styles up to 2 decimal places to avoid string interpolation overhead in loop
      // Map scale to a bounded opacity cache
      const alphaCache = new Map();
      const getAlphaColor = (s) => {
        const val = Math.min(1, Math.max(0.1, s * 1.5 - 0.3)).toFixed(2);
        if (!alphaCache.has(val)) alphaCache.set(val, `rgba(34, 197, 94, ${val})`);
        return alphaCache.get(val);
      };

      // Draw particles
      mCtx.beginPath(); // Batch begin path? Can't if colors change, but can disable shadows for perf
      mCtx.shadowBlur = 0; // Disable heavy canvas shadows completely, rely on sizes representing depth
      
      particles.forEach((p) => {
        const s = Math.max(0.1, p.scale);
        const size = s * 1.8;
        
        mCtx.beginPath();
        mCtx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        mCtx.fillStyle = getAlphaColor(s);
        mCtx.fill();
      });

      requestAnimationFrame(renderMobius);
    }
    
    renderMobius();
}

