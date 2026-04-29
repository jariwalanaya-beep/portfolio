import re

with open('case-study-telegram-knowledge.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Meta Tags
html = re.sub(r'<title>.*?</title>', '<title>Telegram AI Knowledge Machine | Karlspace</title>', html)
html = re.sub(r'<meta name="description"\s+content=".*?"\s*/>', '<meta name="description" content="Turn Your Telegram Into a 24/7 AI Knowledge Machine That Saves Hours Daily. Instant answers from everything your business has ever shared." />', html)
html = re.sub(r'<meta property="og:title" content=".*?"\s*/>', '<meta property="og:title" content="Telegram AI Knowledge Machine | Karlspace" />', html)
html = re.sub(r'<meta property="og:description"\s+content=".*?"\s*/>', '<meta property="og:description" content="Turn Your Telegram Into a 24/7 AI Knowledge Machine That Saves Hours Daily. Instant answers from everything your business has ever shared." />', html)
html = re.sub(r'<meta name="twitter:title" content=".*?"\s*/>', '<meta name="twitter:title" content="Telegram AI Knowledge Machine | Karlspace" />', html)
html = re.sub(r'<meta name="twitter:description"\s+content=".*?"\s*/>', '<meta name="twitter:description" content="Turn Your Telegram Into a 24/7 AI Knowledge Machine That Saves Hours Daily. Instant answers from everything your business has ever shared." />', html)
html = re.sub(r'<link rel="canonical" href="https://karlspace.ai/case-study-whatsapp-agent" />', '<link rel="canonical" href="https://karlspace.ai/case-study-telegram-knowledge" />', html)

# Modify color scheme to be Telegram-like (blueish) instead of WhatsApp (green)
html = html.replace('--p1: #1F7D53;', '--p1: #0088cc;')
html = html.replace('--p2: #14a86a;', '--p2: #38bdf8;')
html = html.replace('--p3: #255F38;', '--p3: #0284c7;')
html = html.replace('--grad: linear-gradient(110deg, #1F7D53 0%, #19b370 50%, #255F38 100%);', '--grad: linear-gradient(110deg, #0284c7 0%, #0ea5e9 50%, #0369a1 100%);')
html = html.replace('rgba(31, 125, 83', 'rgba(2, 132, 199')
html = html.replace('rgba(20, 168, 106', 'rgba(56, 189, 248')
html = html.replace('#19b370', '#0ea5e9')
html = html.replace('#1F7D53', '#0284c7')
html = html.replace('#4ade80', '#38bdf8')
html = html.replace('#5ae49a', '#7dd3fc')
html = html.replace('#59e097', '#7dd3fc')
html = html.replace('#a8c3b2', '#bae6fd')

# Hero Section
html = re.sub(
    r'<h1 class="hero-title">.*?</h1>',
    '<h1 class="hero-title">\n        Telegram AI<br>\n        <span class="hl">Knowledge Machine</span>\n      </h1>',
    html, flags=re.DOTALL
)

html = re.sub(
    r'<p class="hero-desc">.*?</p>',
    '<p class="hero-desc">\n        Stop wasting time searching chats, documents, and screenshots.\n        Your AI instantly finds answers from everything your business has ever shared.\n      </p>',
    html, flags=re.DOTALL
)

hero_list = """<ul class="hero-list">
        <li><span class="li-icon">⚡</span> Upload files, images, or messages</li>
        <li><span class="li-icon">⚙️</span> AI organizes everything automatically</li>
        <li><span class="li-icon">🧠</span> Answers instantly with perfect context</li>
        <li><span class="li-icon">💬</span> No training. No dashboards. Just Telegram.</li>
      </ul>"""
html = re.sub(r'<ul class="hero-list">.*?</ul>', hero_list, html, flags=re.DOTALL)

# CTA Buttons
html = re.sub(
    r'<a href="mailto:shivam.*?" target="_blank" rel="noopener noreferrer"\s*class="btn-primary">Book a Free Audit →</a>',
    '<a href="mailto:shivam@karlspace.in?subject=Get%20Your%20AI%20Assistant%20Now" target="_blank" rel="noopener noreferrer"\n          class="btn-primary">👉 Get Your AI Assistant Now</a>',
    html, flags=re.DOTALL
)
html = html.replace('>See how it works ↓</a>', '>👉 Watch Live Demo</a>')

# Change WA widget to telegram-like
html = html.replace('GearHub Support', 'AI Knowledge Brain')

# Stats Section (Why Business Owners Actually Need This / The Real Cost)
stats_grid = """<div class="stats-grid">
      <div class="stat-cell reveal">
        <div class="stat-icon">🕒</div>
        <span class="stat-num">30-60m</span>
        <div class="stat-label">Daily Time Wasted</div>
        <div class="stat-desc"><strong>Search Failure:</strong> Employees waste up to an hour daily searching for information buried in chats and files.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">💸</div>
        <span class="stat-num">High</span>
        <div class="stat-label">Silent Revenue Loss</div>
        <div class="stat-desc"><strong>Missed Opportunities:</strong> Slower decisions means lost deals. Important data gets buried inside the noise.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🔄</div>
        <span class="stat-num">80%</span>
        <div class="stat-label">Repeated Questions</div>
        <div class="stat-desc"><strong>Higher Payroll:</strong> Staff and clients ask the same questions again and again.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🚪</div>
        <span class="stat-num">Lost</span>
        <div class="stat-label">Knowledge Drain</div>
        <div class="stat-desc"><strong>Staff Turnover:</strong> Critical business knowledge disappears instantly when staff leave.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">📉</div>
        <span class="stat-num">Poor</span>
        <div class="stat-label">Client Experience</div>
        <div class="stat-desc"><strong>Slow Answers:</strong> Poor information access leads to an unreliable and bad client experience.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🚫</div>
        <span class="stat-num">Chaos</span>
        <div class="stat-label">No Scalability</div>
        <div class="stat-desc"><strong>Growth Pain:</strong> Without a central knowledge hub, if your team grows, the chaos grows faster.</div>
      </div>
    </div>"""
html = re.sub(r'<div class="stats-grid">.*?</div>\n    </div>', stats_grid + '\n    </div>', html, flags=re.DOTALL)

# How It Works
html = html.replace('How It Works</h2>', 'How It Works</h2>\n      <p class="how-desc">Instead of searching — you just ask. Send any file or message on Telegram, and your AI instantly understands it.</p>')

how_steps = """<div class="flow-steps">
      <div class="flow-step reveal">
        <div class="step-bubble">01</div>
        <div class="step-icon-wrap">📤</div>
        <div class="step-title">Send Anything</div>
        <p class="step-desc"><strong>Upload via Telegram:</strong><br>Send contracts, screenshots, PDFs, Excel sheets, or messages directly to the Telegram bot.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">02</div>
        <div class="step-icon-wrap">🧠</div>
        <div class="step-title">AI Understands</div>
        <p class="step-desc"><strong>Instant Comprehension:</strong><br>The AI reads and comprehends everything—even complex images and spreadsheets—instantly.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">03</div>
        <div class="step-icon-wrap">🗄️</div>
        <div class="step-title">Automatic Storage</div>
        <p class="step-desc"><strong>Private Database:</strong><br>It decides to store the information optimally as knowledge in your organized, private database.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">04</div>
        <div class="step-icon-wrap">💡</div>
        <div class="step-title">Perfect Memory</div>
        <p class="step-desc"><strong>Never Forgets:</strong><br>Your entire business knowledge base is preserved. Nothing is ever lost or buried.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">05</div>
        <div class="step-icon-wrap">💬</div>
        <div class="step-title">Just Ask</div>
        <p class="step-desc"><strong>Next Time:</strong><br>Whenever you or your team need information, just ask the bot via text.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">06</div>
        <div class="step-icon-wrap">⚡</div>
        <div class="step-title">Instant Answers</div>
        <p class="step-desc"><strong>Your Own Data:</strong><br>Receive an immediate, precise answer using the context of your own secured data.</p>
      </div>
    </div>"""
html = re.sub(r'<div class="flow-steps">.*?</section>', how_steps + '\n  </section>', html, flags=re.DOTALL)

# Before & After -> What You Gain
ba_grid = """<div class="ba-grid">
      <div class="ba-col reveal">
        <div class="ba-col-label"><span></span> Before: Chaos</div>
        <ul class="ba-list">
          <li>Hours wasted searching for documents</li>
          <li>Repeated questions slow everyone down</li>
          <li>Slow decisions due to buried info</li>
          <li>Information lost when employees leave</li>
        </ul>
      </div>
      <div class="ba-col after reveal">
        <div class="ba-col-label"><span></span> After: AI Brain</div>
        <ul class="ba-list">
          <li>Save hours every week per employee</li>
          <li>Reduce repeated questions by up to 80%</li>
          <li>Make faster decisions with instant access</li>
          <li>Scale your operations without chaos</li>
        </ul>
      </div>
    </div>"""
html = re.sub(r'<div class="ba-grid">.*?</div>\n    </div>', ba_grid + '\n    </div>', html, flags=re.DOTALL)

# FAQ -> Built for Real Businesses
faq_section = """<section class="faq-section" id="faq">
    <div class="faq-layout">
      <div class="faq-sticky reveal-left">
        <div class="sec-tag">INDUSTRIES</div>
        <h2 class="faq-sticky-title">Built for Real Businesses</h2>
        <p class="faq-sticky-desc">If you deal with documents + clients + decisions → you need this. This is not a tool. It’s an operational upgrade.</p>
        <a href="mailto:shivam@karlspace.in" class="faq-cta-mini">
          Does it work for my industry? Ask us →
        </a>
      </div>
      <div class="faq-list">
        <div class="faq-item reveal">
          <div class="faq-q-row" onclick="toggleFaq(this)">
            <div class="faq-q">Real Estate Agencies</div>
            <div class="faq-chevron">▼</div>
          </div>
          <div class="faq-a">Instantly retrieve property specs, contracts, and client preferences shared in screenshots or text.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q-row" onclick="toggleFaq(this)">
            <div class="faq-q">Clinics & Healthcare</div>
            <div class="faq-chevron">▼</div>
          </div>
          <div class="faq-a">Quickly access standard procedures, schedules, and policy PDFs without switching apps.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q-row" onclick="toggleFaq(this)">
            <div class="faq-q">Consulting Firms</div>
            <div class="faq-chevron">▼</div>
          </div>
          <div class="faq-a">Digest deep Excel sheets and research reports to get fast, contextual answers on the go.</div>
        </div>
        <div class="faq-item reveal">
          <div class="faq-q-row" onclick="toggleFaq(this)">
            <div class="faq-q">Agencies & Teams</div>
            <div class="faq-chevron">▼</div>
          </div>
          <div class="faq-a">Consolidate client briefs and daily updates so new staff can onboard in minutes.</div>
        </div>
      </div>
    </div>
  </section>"""
html = re.sub(r'<section class="faq-section" id="faq">.*?</section>', faq_section, html, flags=re.DOTALL)

# Pricing
pricing_section = """<section class="pricing-section" id="pricing">
    <div class="pricing-head reveal">
      <div class="sec-tag">Pricing</div>
      <h2 class="sec-h2">Investment, Not Cost</h2>
      <p class="pricing-sub">Costs less than one employee mistake per month. One-Time Setup (Done-for-you) + Monthly Subscription that runs your AI system.</p>
    </div>
    <div class="pricing-grid">

      <!-- STARTER -->
      <div class="price-card reveal">
        <div class="plan-name">Starter</div>
        <div class="price-setup price-setup-fee">Setup fee: <strong>$149</strong> one-time</div>
        <div class="price-amount">
          <span class="price-dollar">$39</span>
          <span class="price-period">/ month</span>
        </div>
        <div class="price-msgs">🧠 Essential Knowledge Base</div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Telegram AI Bot Integration</li>
          <li>Document & Image Understanding</li>
          <li>Basic Private Database</li>
          <li>Instant QA on your data</li>
        </ul>
        <a href="mailto:shivam@karlspace.in" class="price-btn">Get Started</a>
      </div>

      <!-- STANDARD (POPULAR) -->
      <div class="price-card popular reveal">
        <div class="popular-badge">✦ Most Popular</div>
        <div class="plan-name">Standard</div>
        <div class="price-setup price-setup-fee">Setup fee: <strong>$179</strong> one-time</div>
        <div class="price-amount">
          <span class="price-dollar">$59</span>
          <span class="price-period">/ month</span>
        </div>
        <div class="price-msgs">⚡ Advanced Automation</div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Everything in Starter</li>
          <li class="feat-highlight">Extended Database Storage</li>
          <li>Excel Sheet Intelligence</li>
          <li>Priority Search Speed</li>
          <li>Team Access Controls</li>
        </ul>
        <a href="mailto:shivam@karlspace.in" class="price-btn">Get Started</a>
      </div>

      <!-- PREMIUM -->
      <div class="price-card reveal">
        <div class="plan-name">Premium</div>
        <div class="price-setup price-setup-fee">Setup fee: <strong>$249</strong> one-time</div>
        <div class="price-amount">
          <span class="price-dollar">$99</span>
          <span class="price-period">/ month</span>
        </div>
        <div class="price-msgs">🚀 Complete Operations</div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Everything in Standard</li>
          <li class="feat-highlight">Multi-System Integration</li>
          <li>Voice Notes Expansion (coming soon)</li>
          <li>Dedicated Support Manager</li>
          <li>Custom AI Persona</li>
        </ul>
        <a href="mailto:shivam@karlspace.in" class="price-btn">Get Started</a>
      </div>

    </div>
  </section>"""
html = re.sub(r'<section class="pricing-section" id="pricing">.*?</section>', pricing_section, html, flags=re.DOTALL)

# Final CTA
html = html.replace('Want this for<br><span>your business?</span>', 'Turn Telegram into your<br><span>smartest employee</span> today')
html = html.replace('We\'ll walk through your current workflow and show exactly how an AI WhatsApp agent would fit in, completely free.', '👉 Start Now – Only 5 Setup Slots This Month')
html = html.replace('Book a Free Audit →', 'Secure Your Slot Now →')


# JS Widget text change
html = html.replace('RTX 4060 available? Need today delivery.', 'Where is the signed NDA from Acme Corp?')
html = html.replace('Yes, 20 units in stock at ₹29,999. Same-day dispatch possible! ✅', 'I found it! The NDA was signed and uploaded yesterday at 4 PM. Here is the summary: ... ✅')
html = html.replace('Mumbai delivery?', 'Thanks, what about the terms?')
html = html.replace('Done! Packed & out for delivery. ETA today by 6 PM. Track #GH2482 📦', 'Standard confidentiality for 2 years. 📄')
html = html.replace('Series 1 · GPU Stock', 'Document Retrieval')
html = html.replace('Same-day dispatch confirmed · Reply: 1.2s', 'Found instantly')

with open('case-study-telegram-knowledge.html', 'w', encoding='utf-8') as f:
    f.write(html)
