const fs = require('fs');
let content = fs.readFileSync('case-study.html', 'utf8');

// 1. Remove one of the duplicated index.css links
content = content.replace('<link rel="stylesheet" href="index.css" />\n  <link rel="stylesheet" href="index.css" />', '<link rel="stylesheet" href="index.css" />');

// 2. Remove inline body background to inherit from index.css
content = content.replace(/body \{\s*font-family:[^;]+;\s*background:\s*var\(--bg\);\s*color:\s*var\(--text\);\s*overflow-x:\s*hidden;\s*\}/, `body {
      font-family: Inter, system-ui, sans-serif;
      color: var(--text);
      overflow-x: hidden;
    }`);

// 3. Remove the blurred manual background circles
content = content.replace(/<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; pointer-events: none;">\s*<div[^>]+><\/div>\s*<div[^>]+><\/div>\s*<\/div>/g, '');

// 4. Update paddings
content = content.replace('padding: 80px 72px 80px 80px;', 'padding: 40px;');
content = content.replace('padding: 64px 56px;', 'padding: 40px;');
content = content.replace('padding: 0 0 72px;', 'padding: 0 0 40px;');
content = content.replace('padding: 64px 80px 44px;', 'padding: 40px 40px 24px;');
content = content.replace('padding: 0 80px;', 'padding: 0 40px;');
content = content.replace('padding: 80px;', 'padding: 50px 40px;').replace('padding: 80px;', 'padding: 50px 40px;');
content = content.replace('padding:0 80px 16px;', 'padding:0 40px 40px;');

// 5. Remove extra hover transforms
// ba-col
content = content.replace('transition: border-color 220ms, transform 220ms;', 'transition: border-color 220ms;');
content = content.replace('.ba-col:hover { border-color:rgba(34,197,94,0.3); transform:translateY(-2px); }', '.ba-col:hover { border-color:rgba(34,197,94,0.3); }');

// outcome-card
content = content.replace('transition: border-color 220ms, transform 220ms, background 220ms;', 'transition: border-color 220ms, background 220ms;');
content = content.replace(/border-color:rgba\(34,197,94,0\.3\);\s*transform:translateY\(-3px\);\s*background:rgba\(34,197,94,0\.03\);/, `border-color:rgba(34,197,94,0.3);\n      background:rgba(34,197,94,0.03);`);

// stat-cell
content = content.replace('transition: background 220ms, transform 220ms;', 'transition: background 220ms;');
content = content.replace('animation: boxReveal .45s ease both;', '');
content = content.replace('will-change: transform;', '');
content = content.replace('.stat-cell:nth-child(2) { animation-delay:.06s; }', '');
content = content.replace('.stat-cell:nth-child(3) { animation-delay:.12s; }', '');
content = content.replace('.stat-cell:nth-child(4) { animation-delay:.18s; }', '');
content = content.replace(/background:rgba\(34,197,94,0\.03\);\s*transform: translateY\(-2px\);/, `background:rgba(34,197,94,0.03);`);

// 6. Remove boxReveal keyframes
content = content.replace(/@keyframes boxReveal\s*\{\s*from\s*\{\s*opacity:\s*0;\s*transform:\s*translateY\(8px\);\s*\}\s*to\s*\{\s*opacity:\s*1;\s*transform:\s*translateY\(0\);\s*\}\s*\}/g, '');

// 7. marquee & pulse
content = content.replace('animation: marqueeMove 14s linear infinite;', '');
content = content.replace('animation: pulseDot 1.6s ease-in-out infinite;', '');

// 8. cta btn 
content = content.replace('transition: transform 200ms, box-shadow 200ms;', 'transition: box-shadow 200ms;');
content = content.replace('.cta-btn:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(34,197,94,0.42); }', '.cta-btn:hover { box-shadow:0 16px 40px rgba(34,197,94,0.42); }');

// 9. cta keyframes, marquee keyframes, pulse keyframes
content = content.replace(/@keyframes ctaBob \{[\s\S]*?\}/g, '');
content = content.replace(/@keyframes marqueeMove \{[\s\S]*?\}/g, '');
content = content.replace(/@keyframes pulseDot \{[\s\S]*?\}/g, '');

// 10. Remove the massive /* ════ PREMIUM REDESIGN OVERRIDES ════ */ blocks (lines 472 to end of style tag)
let styleEndIndex = content.indexOf('</style>');
let redesignIndex = content.indexOf('/* ════ PREMIUM REDESIGN OVERRIDES ════ */');
if (redesignIndex !== -1 && styleEndIndex !== -1 && redesignIndex < styleEndIndex) {
  content = content.substring(0, redesignIndex).trim() + '\n</style>' + content.substring(styleEndIndex + 8);
}

fs.writeFileSync('case-study.html', content);
console.log("Updated case-study.html ok.");
