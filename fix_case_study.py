import re

with open('case-study.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Duplicated index.css
text = text.replace('<link rel="stylesheet" href="index.css" />\n  <link rel="stylesheet" href="index.css" />', '<link rel="stylesheet" href="index.css" />')

# 2. Inline body
old_body = re.search(r'body\s*\{[^}]+\}', text)
if old_body:
    text = text.replace(old_body.group(0), 'body {\n      font-family: Inter, system-ui, sans-serif;\n      color: var(--text);\n      overflow-x: hidden;\n    }')

# 3. Blurs
text = re.sub(r'<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; pointer-events: none;">\s*<div[^>]+></div>\s*<div[^>]+></div>\s*</div>', '', text)

# 4. paddings
text = text.replace('padding: 80px 72px 80px 80px;', 'padding: 40px;')
text = text.replace('padding: 64px 56px;', 'padding: 40px;')
text = text.replace('padding: 0 0 72px;', 'padding: 0 0 40px;')
text = text.replace('padding: 64px 80px 44px;', 'padding: 40px 40px 24px;')
text = text.replace('padding: 0 80px;', 'padding: 0 40px;')
text = text.replace('padding: 80px;', 'padding: 50px 40px;').replace('padding: 80px;', 'padding: 50px 40px;')
text = text.replace('padding:0 80px 16px;', 'padding:0 40px 40px;')

# 5. hover transforms
text = text.replace('transition: border-color 220ms, transform 220ms;', 'transition: border-color 220ms;')
text = text.replace('.ba-col:hover { border-color:rgba(34,197,94,0.3); transform:translateY(-2px); }', '.ba-col:hover { border-color:rgba(34,197,94,0.3); }')
text = text.replace('transition: border-color 220ms, transform 220ms, background 220ms;', 'transition: border-color 220ms, background 220ms;')
text = text.replace('border-color:rgba(34,197,94,0.3);\n      transform:translateY(-3px);\n      background:rgba(34,197,94,0.03);', 'border-color:rgba(34,197,94,0.3);\n      background:rgba(34,197,94,0.03);')
text = text.replace('transition: background 220ms, transform 220ms;', 'transition: background 220ms;')
text = text.replace('animation: boxReveal .45s ease both;', '')
text = text.replace('will-change: transform;', '')
for i in [2, 3, 4]:
    text = text.replace(f'.stat-cell:nth-child({i}) {{ animation-delay:.0{i*6 if i < 3 else 12 if i == 3 else 18}s; }}', '')
text = text.replace('      background:rgba(34,197,94,0.03);\n      transform: translateY(-2px);', '      background:rgba(34,197,94,0.03);')

# 6. boxreveal keyframes
text = re.sub(r'@keyframes boxReveal\s*\{[^}]+\}\s*\}\s*', '', text) # Handle the nested curly braces via regex if needed, or simple replace
text = re.sub(r'@keyframes boxReveal[\s\S]*?\}\s*\}', '', text) 

# 7. animation
text = text.replace('animation: marqueeMove 14s linear infinite;', '')
text = text.replace('animation: pulseDot 1.6s ease-in-out infinite;', '')

# 8. cta
text = text.replace('transition: transform 200ms, box-shadow 200ms;', 'transition: box-shadow 200ms;')
text = text.replace('.cta-btn:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(34,197,94,0.42); }', '.cta-btn:hover { box-shadow:0 16px 40px rgba(34,197,94,0.42); }')

# 9. other keyframes
text = re.sub(r'@keyframes ctaBob[\s\S]*?\}\s*\}', '', text)
text = re.sub(r'@keyframes marqueeMove[\s\S]*?\}\s*\}', '', text)
text = re.sub(r'@keyframes pulseDot[\s\S]*?\}\s*\}', '', text)

# 10. PREMIUM REDESIGN
idx = text.find('/* ════ PREMIUM REDESIGN OVERRIDES ════ */')
end_idx = text.rfind('</style>')
if idx != -1 and end_idx != -1 and idx < end_idx:
    text = text[:idx].strip() + '\n</style>' + text[end_idx+8:]

with open('case-study.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
