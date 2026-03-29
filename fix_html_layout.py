import re

with open("case-study-dashboard.html", "r") as f:
    lines = f.readlines()

# let's just replace lines 428 to 472 (0-indexed 427 to 472)
# Since the length changes, let's find the exact indices
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<section class="ba-section" id="before-after">' in line:
        start_idx = i
    if '<section class="how-section" id="how">' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_html = """  <section class="ba-section" id="before-after">
    <div class="ba-header" style="padding-bottom: 0;">
      <div class="sec-tag">Result</div>
    </div>
    
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

    <div class="ba-grid" style="margin-top: 20px;">
      <div class="ba-col">
        <div class="ba-col-label">Before</div>
        <img src="dashboard-assets/1.png" alt="Spreadsheet data view" />
      </div>
      <div class="ba-col">
        <div class="ba-col-label after">After</div>
        <img src="dashboard-assets/2.png" alt="Live dashboard view" />
      </div>
    </div>
  </section>

  <section class="benefits" id="benefits">
    <div class="sec-tag">Case Study</div>
    <h2 class="sec-h2">Why your Sheet isn't enough</h2>
    <p class="hero-sub">You built the Sheet. You maintain it. But when someone asks "how are we doing?" you end up filtering, scrolling, and explaining. This turns your Sheet into a living dashboard that tells the story for you.</p>
  </section>

"""
    lines = lines[:start_idx] + [new_html] + lines[end_idx:]

with open("case-study-dashboard.html", "w") as f:
    f.writelines(lines)

print("done")
