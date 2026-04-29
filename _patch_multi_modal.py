import re
import os

source_file = 'case-study-whatsapp-agent.html'
dest_file = 'case-study-telegram-knowledge.html'

with open(source_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Meta Tags
html = re.sub(r'<title>.*?</title>', '<title>Multi-Modal Telegram AI Assistant – RAG + Vision | Karlspace</title>', html)
html = re.sub(r'<meta name="description"\s+content=".*?"\s*/>', '<meta name="description" content="A powerful RAG system built on Telegram. Upload documents or images — AI extracts content, stores in Pinecone, and answers questions with perfect context." />', html)
html = re.sub(r'<meta property="og:title" content=".*?"\s*/>', '<meta property="og:title" content="Multi-Modal Telegram AI Assistant – RAG + Vision | Karlspace" />', html)
html = re.sub(r'<meta property="og:description"\s+content=".*?"\s*/>', '<meta property="og:description" content="A powerful RAG system built on Telegram. Upload documents or images — AI extracts content, stores in Pinecone, and answers questions with perfect context." />', html)
html = re.sub(r'<meta name="twitter:title" content=".*?"\s*/>', '<meta name="twitter:title" content="Multi-Modal Telegram AI Assistant – RAG + Vision | Karlspace" />', html)
html = re.sub(r'<meta name="twitter:description"\s+content=".*?"\s*/>', '<meta name="twitter:description" content="A powerful RAG system built on Telegram. Upload documents or images — AI extracts content, stores in Pinecone, and answers questions with perfect context." />', html)
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
    '<h1 class="hero-title">\n        Multi-Modal<br>\n        Telegram AI <span class="hl">Assistant</span>\n      </h1>',
    html, flags=re.DOTALL
)

html = re.sub(
    r'<p class="hero-desc">.*?</p>',
    '<p class="hero-desc">\n        Send text, photos, PDFs, Excel sheets, Word docs — anything.<br>AI instantly understands, stores, and answers from your private knowledge base using advanced RAG and Vision.\n      </p>',
    html, flags=re.DOTALL
)

hero_list = """<ul class="hero-list">
        <li><span class="li-icon">👁️</span> Vision + Text understanding (GPT-4o-mini)</li>
        <li><span class="li-icon">📄</span> Supports 8+ file types (PDF, DOCX, XLSX, JSON, XML…)</li>
        <li><span class="li-icon">🧠</span> Private Pinecone vector memory (never forgets)</li>
        <li><span class="li-icon">⚡</span> Real-time RAG responses + smart store-or-ask logic</li>
      </ul>"""
html = re.sub(r'<ul class="hero-list">.*?</ul>', hero_list, html, flags=re.DOTALL)

# CTA Buttons
html = re.sub(
    r'<a href="mailto:shivam.*?" target="_blank" rel="noopener noreferrer"\s*class="btn-primary">Book a Free Audit →</a>',
    '<a href="mailto:shivam@karlspace.in?subject=Get%20Multi-Modal%20Assistant" target="_blank" rel="noopener noreferrer"\n          class="btn-primary">Get This Assistant →</a>',
    html, flags=re.DOTALL
)
html = html.replace('>See how it works ↓</a>', '>See Live Demo on Telegram</a>')

# Change WA widget to telegram-like
html = html.replace('GearHub Support', 'Multi-Modal RAG Bot')
html = html.replace('247 msgs today', 'Pinecone Active')
html = html.replace('Live Activity', 'Vector Sync')

# Widget text replacements
html = html.replace('RTX 4060 available? Need today delivery.', 'Here is the Q3 Financial Report.xlsx')
html = html.replace('Yes, 20 units in stock at ₹29,999. Same-day dispatch possible! ✅', 'Excel file received. Extracted 4 sheets and 250 rows. Embedded and stored in Pinecone database. 🗄️')
html = html.replace('Mumbai delivery?', 'What was our total revenue in Q3?')
html = html.replace('Done! Packed & out for delivery. ETA today by 6 PM. Track #GH2482 📦', 'Based on the Q3 Financial Report you uploaded, the total revenue was $1.24 Million. 📈')
html = html.replace('Series 1 · GPU Stock', 'File Ingestion')
html = html.replace('Same-day dispatch confirmed · Reply: 1.2s', 'Data stored securely')
html = html.replace('Series 2 · Order Tracking', 'RAG Retrieval')
html = html.replace('Intent: tracking · Reply: 1.1s', 'Sourced from Pinecone DB')

# Problem/Solution mapped into the Stats Grid
stats_grid = """<div class="stats-grid">
      <div class="stat-cell reveal">
        <div class="stat-icon">🗂️</div>
        <span class="stat-num">Scattered</span>
        <div class="stat-label">Data Chaos</div>
        <div class="stat-desc"><strong>The Problem:</strong> Important documents, screenshots, and decisions are scattered randomly across dozens of chats.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🕰️</div>
        <span class="stat-num">Hours</span>
        <div class="stat-label">Time Wasted</div>
        <div class="stat-desc"><strong>The Problem:</strong> Teams waste hours looking for old files or asking "What did we decide about X?" later.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🧠</div>
        <span class="stat-num">Memory</span>
        <div class="stat-label">Knowledge Engine</div>
        <div class="stat-desc"><strong>The Solution:</strong> AI extracts clean text from any upload and embeds it into your private Pinecone vector database.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🤖</div>
        <span class="stat-num">Smart</span>
        <div class="stat-label">Auto-Routing</div>
        <div class="stat-desc"><strong>The Solution:</strong> It decides instantly whether to Store it (new knowledge) or Message it (treat it as a question).</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">👁️</div>
        <span class="stat-num">Vision</span>
        <div class="stat-label">Multi-Modal Setup</div>
        <div class="stat-desc"><strong>The Capabilities:</strong> Uses GPT-4o-mini to read images, ConvertAPI for DOCX, and handles PDFs, Excel, JSON, and XML.</div>
      </div>
      <div class="stat-cell reveal">
        <div class="stat-icon">🏢</div>
        <span class="stat-num">2 Env</span>
        <div class="stat-label">Bonus Versions</div>
        <div class="stat-desc"><strong>The Expansion:</strong> Includes a general knowledge assistant and a separate webhook version for property / real-estate apps.</div>
      </div>
    </div>"""
html = re.sub(r'<div class="stats-grid">.*?</div>\n    </div>', stats_grid + '\n    </div>', html, flags=re.DOTALL)

# How It Works
html = html.replace('Six automated steps. No human required from message received to reply sent. It is specifically designed for PC hardware and can be customized to meet your requirements.', 'Six automated steps for the Multi-Modal Telegram RAG workflow. Send anything, and watch the system orchestrate retrieval and embedding on the fly.')

how_steps = """<div class="flow-steps">
      <div class="flow-step reveal">
        <div class="step-bubble">01</div>
        <div class="step-icon-wrap">📤</div>
        <div class="step-title">Send Anything</div>
        <p class="step-desc"><strong>Telegram Input:</strong><br>You send text, a photo, PDF, Excel, Word, JSON, or XML file on Telegram.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">02</div>
        <div class="step-icon-wrap">🔍</div>
        <div class="step-title">File Detection</div>
        <p class="step-desc"><strong>Smart Router:</strong><br>System identifies the file mime-type and routes it for automatic content extraction.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">03</div>
        <div class="step-icon-wrap">🚦</div>
        <div class="step-title">Decision Engine</div>
        <p class="step-desc"><strong>Store vs Ask:</strong><br>AI evaluates the intent to decide whether to run RAG to answer, or process the attachment as new data.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">04</div>
        <div class="step-icon-wrap">🗜️</div>
        <div class="step-title">Multi-Modal Processing</div>
        <p class="step-desc"><strong>Data Transformation:</strong><br>Images go to GPT-4o-mini vision, DOCX via ConvertAPI, Sheets mapped to structured data.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">05</div>
        <div class="step-icon-wrap">💡</div>
        <div class="step-title">RAG Answer</div>
        <p class="step-desc"><strong>Zero Hallucination:</strong><br>Pinecone retrieves the nearest semantic vectors to reply directly using only your data.</p>
      </div>
      <div class="flow-step reveal">
        <div class="step-bubble">06</div>
        <div class="step-icon-wrap">🌐</div>
        <div class="step-title">Bonus Webhook</div>
        <p class="step-desc"><strong>Extension:</strong><br>Separate webhook integration for custom apps, capable of syncing with Google Sheets for live listings.</p>
      </div>
    </div>"""
html = re.sub(r'<div class="flow-steps">.*?</section>', how_steps + '\n  </section>', html, flags=re.DOTALL)

# Before & After -> Replaced with Features Grid
ba_header_original = r'<div class="sec-tag">Transformation</div>\s*<h2 class="sec-h2">Before & After</h2>\s*<p class="ba-sub">The same shop, completely different operation. Manual delays on the left, instant AI replies on the right.</p>'
ba_header_new = '<div class="sec-tag">CAPABILITIES</div>\n      <h2 class="sec-h2">System Features & Results</h2>\n      <p class="ba-sub">Tech Stack: n8n, OpenAI/Cohere/Gemini APIs, Pinecone Vector DB, Telegram Bot API, ConvertAPI, Google Sheets.</p>'
html = re.sub(ba_header_original, ba_header_new, html)

ba_grid = """<div class="ba-grid">
      <div class="ba-col reveal">
        <div class="ba-col-label"><span></span> Core Features</div>
        <ul class="ba-list" style="padding: 20px;">
          <li>Full multi-modal (text + vision + 8 docs)</li>
          <li>Automatic “store vs ask” intelligence</li>
          <li>Private Pinecone vector database setup</li>
          <li>Cohere embeddings + Multiple LLM backends</li>
          <li>Google Sheets integration (live listings)</li>
          <li>Error-proof file handling + mime-type fixing</li>
          <li>Zero-knowledge hallucinations (strict RAG)</li>
        </ul>
      </div>
      <div class="ba-col after reveal">
        <div class="ba-col-label"><span></span> Results & Outcomes</div>
        <ul class="ba-list" style="padding: 20px;">
          <li>100% of uploads become searchable knowledge</li>
          <li>&lt; 10 seconds average response time</li>
          <li>Zero manual data entry or copy-paste</li>
          <li>Dramatically reduced repeated inquiries</li>
          <li>Perfect for clinics, real estate, and education</li>
          <li>Scalable for active internal team uses</li>
          <li>Works 24/7 autonomously on Telegram</li>
        </ul>
      </div>
    </div>"""
html = re.sub(r'<div class="ba-grid">.*?</div>\n    </div>', ba_grid + '\n    </div>', html, flags=re.DOTALL)

# FAQ Section - Optional: Adjust or keep brief
# I'll modify the first FAQ to talk about RAG
html = html.replace('Can it answer product availability questions?', 'Can it read Excel files and PDFs?')
html = html.replace('Yes. The bot checks live records and responds with current stock status and pricing, with no manual lookup needed.', 'Yes. The system uses specific nodes to extract structured data from Excel and XML, and converts PDFs and Word Docs into clean text before embedding them into the vector database.')

# Pricing
pricing_section = """<section class="pricing-section" id="pricing">
    <div class="pricing-head reveal">
      <div class="sec-tag">Pricing</div>
      <h2 class="sec-h2">Affordable • Transparent • Powerful</h2>
      <p class="pricing-sub">One-time deployment fee + affordable monthly subscription to cover infrastructure and messages.</p>
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
        <div class="price-msgs">💬 800 messages/uploads</div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Text + Basic Documents</li>
          <li>Pinecone Vector Database</li>
          <li>Smart Store vs Ask AI</li>
          <li>Email Support</li>
          <li>$0.06 per extra message</li>
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
        <div class="price-msgs">💬 2,000 messages/uploads</div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Everything in Starter</li>
          <li class="feat-highlight">Full Multi-Modal (Images + Vision)</li>
          <li class="feat-highlight">PDF/DOCX/Excel/JSON/XML included</li>
          <li>WhatsApp + Email Support</li>
          <li>$0.04 per extra message</li>
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
        <div class="price-msgs">💬 5,000+ messages/uploads</div>
        <div class="price-divider"></div>
        <ul class="price-features">
          <li>Everything in Standard</li>
          <li class="feat-highlight">Google Sheets Live Integration</li>
          <li>Custom AI prompts & models</li>
          <li>Priority WhatsApp + Qtrly Review</li>
          <li>$0.03 per extra message</li>
        </ul>
        <a href="mailto:shivam@karlspace.in" class="price-btn">Get Started</a>
      </div>

    </div>
    <div style="text-align:center; margin-top: 30px; font-size: 0.85rem; color: #a8bdd4;">
        All plans include: Full workflow deployment, Custom AI prompts for your use case, 30 days free support after launch, and all future updates.
    </div>
  </section>"""
html = re.sub(r'<section class="pricing-section" id="pricing">.*?</section>', pricing_section, html, flags=re.DOTALL)

# Final CTA
html = html.replace('Want this for<br><span>your business?</span>', 'Ready to turn Telegram into<br><span>your smart knowledge base?</span>')
html = html.replace('We\'ll walk through your current workflow and show exactly how an AI WhatsApp agent would fit in, completely free.', 'Want to see it live? Just message me on Telegram and I’ll add you to the demo bot.')
html = html.replace('Book a Free Audit →', 'Start with $149 Setup – Only 5 spots')


with open(dest_file, 'w', encoding='utf-8') as f:
    f.write(html)
