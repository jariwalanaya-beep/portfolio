import re

with open("case-study-dashboard.html", "r") as f:
    content = f.read()

# 1. Update CSS
css_old = """    .benefit-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 18px;
    }

    .benefit-card {
      border: 1px solid var(--border); border-radius: 16px;
      padding: 18px 18px 20px;
      background: rgba(255, 255, 255, 0.03);
      transition: border-color 220ms, background 220ms;
    }
    .benefit-card:hover {
      border-color: rgba(34, 197, 94, 0.3);
      background: rgba(34, 197, 94, 0.04);
    }

    .benefit-card h3 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem; font-weight: 700;
      margin-bottom: 8px;
    }

    .benefit-card p {
      font-size: 0.9rem; color: #c7d5e6; line-height: 1.55;
    }"""

css_new = """    /* ═══════════════════════ STATS STRIP ═══════════════════════ */
    .stats-strip {
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:20px;
      padding:24px 0 0;
      background:transparent;
      align-items:stretch;
    }

    .stat-cell {
      padding: 40px 36px;
      border:1px solid var(--border);
      border-radius:20px;
      background:rgba(255,255,255,0.03);
      transition: border-color 220ms, background 220ms;
      position:relative;
      overflow:hidden;
      min-height: 180px;
      height: 100%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:8px;
    }
    .stat-cell:hover {
      border-color:rgba(34,197,94,0.3);
      background:rgba(34,197,94,0.03);
    }
    .stat-cell::before {
      content:""; position:absolute; top:0; left:0; right:0; height:2px;
      background:var(--grad);
    }

    .stat-num {
      font-family:"Space Grotesk",sans-serif;
      font-size:clamp(1.75rem,2.35vw,2.45rem);
      font-weight:800; line-height:1;
      letter-spacing:-0.8px; margin-bottom:2px;
      background:var(--grad);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text;
      display:block;
    }
    .stat-label {
      font-size:0.9rem;
      font-weight:700;
      color:#d9e5f2;
      line-height:1.35;
      margin-bottom:1px;
      max-width:22ch;
    }

    .stat-desc {
      font-size:0.75rem;
      color:var(--muted);
      line-height:1.32;
      max-width:32ch;
    }"""
content = content.replace(css_old, css_new)

# Media Queries
content = content.replace(".benefit-grid { grid-template-columns: repeat(2, 1fr); }", ".stats-strip { grid-template-columns: 1fr 1fr; gap:12px; }")
content = content.replace(".benefit-grid { grid-template-columns: 1fr; }", ".stats-strip { grid-template-columns: 1fr; gap:10px; }")

# 2. Extract HTML sections
benefits_pattern = re.compile(r'  <section class="benefits" id="benefits">.*?</section>\n', re.DOTALL)
ba_pattern = re.compile(r'  <section class="ba-section" id="before-after">.*?</section>\n', re.DOTALL)

benefits_match = benefits_pattern.search(content)
ba_match = ba_pattern.search(content)

if benefits_match and ba_match:
    benefits_html = benefits_match.group(0)
    ba_html = ba_match.group(0)
    
    # Remove old sections
    content = content.replace(benefits_html, "")
    content = content.replace(ba_html, "")
    
    # Modify ba_html text to Result
    ba_html = ba_html.replace('<div class="sec-tag">Before &amp; After</div>', '<div class="sec-tag">Result</div>')
    
    # Modify benefits_html
    new_benefits_html = """  <section class="benefits" id="benefits">
    <div class="sec-tag">Case Study</div>
    <h2 class="sec-h2">Why your Sheet isn't enough</h2>
    <p class="hero-sub">You built the Sheet. You maintain it. But when someone asks "how are we doing?" you end up filtering, scrolling, and explaining. This turns your Sheet into a living dashboard that tells the story for you.</p>
    <div class="stats-strip" id="stats">
      <div class="stat-cell">
        <div class="stat-num">24hrs</div>
        <div class="stat-label">Fast Setup</div>
        <div class="stat-desc">From sharing your Sheet to a live, usable dashboard.</div>
      </div>
      <div class="stat-cell">
        <div class="stat-num">100%</div>
        <div class="stat-label">Built around your data</div>
        <div class="stat-desc">Layout, tabs, and charts mirror your actual dataset — not a fixed template.</div>
      </div>
      <div class="stat-cell">
        <div class="stat-num">Zero</div>
        <div class="stat-label">Zero data team</div>
        <div class="stat-desc">No analyst, no developer, no IT department needed.</div>
      </div>
      <div class="stat-cell">
        <div class="stat-num">Live</div>
        <div class="stat-label">Always live</div>
        <div class="stat-desc">Dashboard updates the moment your Sheet updates.</div>
      </div>
    </div>
  </section>
"""
    
    hero_pattern = re.compile(r'  </section>\n')
    
    # We want to insert ba_html THEN new_benefits_html sequentially after the <section class="hero" id="overview" ...> ... </section>
    
    # find the hero section
    hero_full_pattern = re.compile(r'  <section class="hero" id="overview" style="position: relative; z-index: 1;">.*?</section>\n', re.DOTALL)
    hero_match = hero_full_pattern.search(content)
    
    if hero_match:
        old_hero_html = hero_match.group(0)
        new_combined_html = old_hero_html + "\n" + ba_html + "\n" + new_benefits_html
        content = content.replace(old_hero_html, new_combined_html)

    with open("case-study-dashboard.html", "w") as f:
        f.write(content)
    print("Success")
else:
    print("Failed to find sections")
