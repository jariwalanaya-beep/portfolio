import re

with open('case-study.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update .stat-cell CSS to match .outcome-card container style
css_stat_cell = '''    .stat-cell {
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
    }'''

# Replace the current .stat-cell and its hover/before rules
# Using the same method as before to find and replace the stat-cell block
text = re.sub(r'\.stat-cell\s*\{[\s\S]*?\}\s*\.stat-cell::before\s*\{[\s\S]*?\}\s*\.stat-cell:hover::before\s*\{[\s\S]*?\}', css_stat_cell, text)
# Also catch the hover rule that might be separate
text = re.sub(r'\.stat-cell:hover\s*\{[\s\S]*?\}', '', text) 
# Wait, I just deleted it, but I included it in css_stat_cell. Let's be cleaner.

# Let's just explicitly replace the target styles
current_style_block = re.search(r'\.stat-cell\s*\{[\s\S]*?\}\s*\.stat-cell::before\s*\{[\s\S]*?\}\s*\.stat-cell:hover::before\s*\{[\s\S]*?\}', text)
if current_style_block:
    text = text.replace(current_style_block.group(0), css_stat_cell)

# 2. Sync the hover rule correctly
text = re.sub(r'\.stat-cell:hover\s*\{\s*border-color:\s*rgba\(34,197,94,0\.35\);\s*\}', '', text)
if css_stat_cell not in text:
    # If the above re.sub failed, use a simpler find/replace for the block we know is there
    text = re.sub(r'    \.stat-cell \{[\s\S]*?\}\s*\}', css_stat_cell + '\n', text)

with open('case-study.html', 'w', encoding='utf-8') as f:
    f.write(text)
