import re

with open('case-study.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add background canvas and script tag
if '<canvas id="bg-canvas"' not in text:
    text = text.replace('<body>', '<body>\n\n  <!-- PARTICLE VOID -->\n  <canvas id="bg-canvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; opacity: 0.8;"></canvas>\n')

if '<script src="index.js"></script>' not in text:
    text = text.replace('</body>', '  <script src="index.js"></script>\n</body>')

# 2. Extract stats-strip
stats_match = re.search(r'<!-- ═══════════ STATS STRIP ═══════════ -->\s*<div class="stats-strip" id="stats">[\s\S]*?</div>\s*<!--', text)
if stats_match:
    stats_html = stats_match.group(0)[:-4].strip() # remove the trailing <!-- 
    text = text.replace(stats_match.group(0), '<!--')

    # Insert it right before <!-- ═══════════ BEFORE & AFTER ═══════════ -->
    insert_point = '<!-- ═══════════ BEFORE & AFTER ═══════════ -->'
    text = text.replace(insert_point, stats_html + '\n\n' + insert_point)

# 3. Improve CSS of stat-cell and stat-num
# The user wants to improve the stats strip layout
# Current CSS:
#     .stat-cell {
#       padding: 16px 16px;
#       border:1px solid var(--border);
#       border-radius:14px;
#       background:rgba(255,255,255,0.015);
# 
# We'll upgrade it to look more premium like the service-card in index.css

css_cell_old = '''    .stat-cell {
      padding: 16px 16px;
      border:1px solid var(--border);
      border-radius:14px;
      background:rgba(255,255,255,0.015);
      transition: background 220ms;
      position:relative;
      overflow:hidden;
      min-height: 170px;
      height: 100%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:4px;
      
      
    }'''

css_cell_new = '''    .stat-cell {
      padding: 24px 24px;
      border:1px solid rgba(34,197,94,0.18);
      border-radius:16px;
      background:linear-gradient(135deg,rgba(34,197,94,0.05) 0%,rgba(16,185,129,0.02) 100%);
      transition: background 220ms, border-color 220ms;
      position:relative;
      overflow:hidden;
      min-height: 170px;
      height: 100%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:4px;
    }
    .stat-cell::before {
      content:''; position:absolute; inset:0;
      background: linear-gradient(135deg,rgba(34,197,94,0.1) 0%,rgba(16,185,129,0.04) 100%);
      opacity:0; transition:opacity 220ms;
    }
    .stat-cell:hover::before { opacity:1; }'''

if css_cell_old in text:
    text = text.replace(css_cell_old, css_cell_new)

# Update hover rule
old_hover = '''    .stat-cell:last-child { border-right:none; }
    .stat-cell:hover {
      background:rgba(34,197,94,0.03);
    }'''
new_hover = '''    .stat-cell:last-child { border-right:none; }
    .stat-cell:hover {
      border-color: rgba(34,197,94,0.35);
    }'''

# Replace old stat-cell css hover block using regex to be safe
text = re.sub(r'\.stat-cell:hover\s*\{\s*background:rgba\(34,197,94,0\.03\);\s*\}', new_hover.split('}\n')[1].strip() + '\n}', text)

# For .stat-num, it's already using var(--grad), we can make the border look better in stats-strip if needed.
# padding:0 40px 40px; -> padding:40px; around the strip
text = text.replace('padding:0 40px 40px;', 'padding:40px;')

with open('case-study.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
