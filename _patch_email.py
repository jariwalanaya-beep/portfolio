#!/usr/bin/env python3
import re, sys

FILE = 'case-study-email-appointment.html'
with open(FILE, 'r', encoding='utf-8') as f:
    src = f.read()

original_len = len(src)

# ─────────────────────────────────────────────────────────────
# 1. Replace hero-right widget with new animated chat widget
# ─────────────────────────────────────────────────────────────
OLD_WIDGET_RE = re.compile(
    r'    <!-- Email AI Widget -->\n    <div class="hero-right">.*?    </div>\n  </section>',
    re.DOTALL
)

NEW_WIDGET = r'''    <!-- Animated Email Conversation Widget -->
    <style>
      .ew2 { background: rgba(6,10,16,.95); border: 1px solid rgba(255,255,255,.08); border-radius: 20px; overflow: hidden; width: 100%; max-width: 440px; box-shadow: 0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(31,125,83,.1); }
      .ew2-chrome { display: flex; align-items: center; background: rgba(0,0,0,.4); padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,.06); gap: 10px; }
      .ew2-dots { display: flex; gap: 6px; }
      .ew2-dots span { width: 10px; height: 10px; border-radius: 50%; }
      .ew2-dots span:nth-child(1) { background: #ff5f56; }
      .ew2-dots span:nth-child(2) { background: #febc2e; }
      .ew2-dots span:nth-child(3) { background: #27c840; }
      .ew2-title { font-size: .72rem; font-weight: 600; color: rgba(255,255,255,.55); margin: 0 auto; letter-spacing: .3px; }
      .ew2-status { display: flex; align-items: center; gap: 5px; font-size: .68rem; font-weight: 700; color: #5ae49a; white-space: nowrap; }
      .ew2-active-dot { width: 6px; height: 6px; border-radius: 50%; background: #5ae49a; box-shadow: 0 0 6px #5ae49a; animation: dotPulse 1.4s ease-in-out infinite; flex-shrink: 0; }
      .ew2-stats { display: flex; border-bottom: 1px solid rgba(255,255,255,.05); }
      .ew2-stat { flex: 1; text-align: center; padding: 13px 8px; }
      .ew2-stat:not(:last-child) { border-right: 1px solid rgba(255,255,255,.05); }
      .ew2-n { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 800; color: #5ae49a; line-height: 1; margin-bottom: 4px; }
      .ew2-l { font-size: .58rem; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; }
      .ew2-convo { padding: 16px 14px; min-height: 220px; display: flex; flex-direction: column; gap: 9px; overflow: hidden; }
      .em-msg { display: flex; flex-direction: column; max-width: 86%; animation: emIn .4s ease forwards; opacity: 0; }
      @keyframes emIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .em-msg.patient { align-self: flex-start; }
      .em-msg.agent  { align-self: flex-end; }
      .em-from { font-size: .58rem; color: var(--muted); margin-bottom: 4px; padding: 0 2px; }
      .em-bubble { padding: 9px 13px; border-radius: 14px; font-size: .79rem; line-height: 1.55; }
      .em-msg.patient .em-bubble { background: rgba(255,255,255,.07); color: #c8d8ea; border-radius: 4px 14px 14px 14px; }
      .em-msg.agent  .em-bubble { background: linear-gradient(135deg,#1F7D53,#2a8a5d); color: #fff; border-radius: 14px 4px 14px 14px; }
      .em-typing { align-self: flex-start; animation: emIn .3s ease forwards; opacity: 0; }
      .em-typing-dots { display: flex; align-items: center; gap: 4px; padding: 10px 14px; background: rgba(31,125,83,.1); border: 1px solid rgba(31,125,83,.2); border-radius: 4px 14px 14px 14px; }
      .em-typing-dots span { width: 5px; height: 5px; border-radius: 50%; background: #5ae49a; animation: emDot 1.2s ease-in-out infinite; }
      .em-typing-dots span:nth-child(2) { animation-delay: .2s; }
      .em-typing-dots span:nth-child(3) { animation-delay: .4s; }
      @keyframes emDot { 0%,60%,100% { transform: translateY(0); opacity:.4; } 30% { transform: translateY(-5px); opacity:1; } }
      .em-ai-label { align-self: flex-start; font-size: .62rem; font-weight: 700; color: #5ae49a; text-transform: uppercase; letter-spacing: .5px; background: rgba(31,125,83,.09); border: 1px solid rgba(31,125,83,.18); border-radius: 6px; padding: 3px 9px; animation: emIn .3s ease forwards; opacity: 0; }
      .em-badge { align-self: center; font-size: .68rem; color: #5ae49a; background: rgba(31,125,83,.1); border: 1px solid rgba(31,125,83,.22); border-radius: 999px; padding: 4px 12px; animation: emIn .3s ease forwards; opacity: 0; margin-top: 2px; }
    </style>
    <div class="hero-right">
      <div class="ew2" id="emailWidget">
        <div class="ew2-chrome">
          <div class="ew2-dots"><span></span><span></span><span></span></div>
          <div class="ew2-title">✉️ smith.dental@gmail.com</div>
          <div class="ew2-status"><span class="ew2-active-dot"></span> AI Active</div>
        </div>
        <div class="ew2-stats">
          <div class="ew2-stat"><div class="ew2-n" id="emailProcessed">48</div><div class="ew2-l">Emails Today</div></div>
          <div class="ew2-stat"><div class="ew2-n" id="emailBooked">31</div><div class="ew2-l">Booked</div></div>
          <div class="ew2-stat"><div class="ew2-n">&lt;60s</div><div class="ew2-l">Avg. Reply</div></div>
        </div>
        <div class="ew2-convo" id="emailBodyWrap"></div>
      </div>
    </div>
  </section>'''

src, n = OLD_WIDGET_RE.subn(NEW_WIDGET, src)
print(f'[1] Widget replaced: {n} match(es)')

# ─────────────────────────────────────────────────────────────
# 2. Remove 4 unwanted sections (stats, how, features, tech)
# ─────────────────────────────────────────────────────────────
SECTIONS_RE = re.compile(
    r'\n  <!-- ── KEY BENEFITS STATS ─+.*?  </section>\n(?=\n  <!-- ── RESULTS)',
    re.DOTALL
)
src, n = SECTIONS_RE.subn('\n', src)
print(f'[2] Sections removed: {n} match(es)')

# ─────────────────────────────────────────────────────────────
# 3. Fix "#how" anchor → "#results"
# ─────────────────────────────────────────────────────────────
src = src.replace('href="#how"', 'href="#results"')
print('[3] href=#how updated')

# ─────────────────────────────────────────────────────────────
# 4. Replace email widget animation JS
# ─────────────────────────────────────────────────────────────
OLD_JS_RE = re.compile(
    r'    /\* ── EMAIL WIDGET ANIMATION ──.*?\}\)\(\);\n',
    re.DOTALL
)

NEW_JS = """    /* \u2500\u2500 EMAIL WIDGET ANIMATION v2 \u2500\u2500 */
    (function () {
      const convo = document.getElementById('emailBodyWrap');
      const processedEl = document.getElementById('emailProcessed');
      const bookedEl   = document.getElementById('emailBooked');
      if (!convo) return;

      let processed = 48, booked = 31, idx = 0;

      const S = [
        {
          pFrom: 'john.smith@gmail.com',
          pText: 'Hi, I\\'d like to book with Dr. Patel next Monday. My number is 9876543210.',
          aiLabel: '\\ud83e\\udde0 Classified: APPOINTMENT \\u00b7 Booking slot...',
          aText: 'Dr. Patel available Mon 3 Feb \\u00b7 10:00 AM. \\u2705 Code: APT-20260203-041. See you then!',
          badge: '\\u2705 Booked \u2014 APT-20260203-041',
          book: true
        },
        {
          pFrom: 'priya.k@hotmail.com',
          pText: 'Please cancel my appointment. Code: APT-20260201-017.',
          aiLabel: '\\ud83d\\udd10 Code verified \\u00b7 Releasing slot...',
          aText: 'Done! Appointment APT-20260201-017 cancelled. Slot has been released.',
          badge: '\\u274c Cancelled \u2014 slot freed',
          book: false
        },
        {
          pFrom: 'ananya.s@gmail.com',
          pText: 'Need Dr. Kim on Friday 7 Feb at 11 AM. Name: Ananya, Ph: 9988776655.',
          aiLabel: '\\ud83d\\uddc3\\ufe0f PostgreSQL query \\u00b7 Slot available! Generating code...',
          aText: 'Confirmed! Dr. Kim \\u00b7 Fri 7 Feb \\u00b7 11:00 AM. \\ud83c\\udf9f Code: APT-20260207-058',
          badge: '\\u2705 Booked \u2014 APT-20260207-058',
          book: true
        },
        {
          pFrom: 'rahul.m@yahoo.com',
          pText: 'I want to book an appointment for tooth cleaning.',
          aiLabel: '\\u26a0\\ufe0f Missing: Doctor, Date, Time \\u00b7 Sending follow-up...',
          aText: 'Sure! Please share: (1) Preferred doctor (2) Date (3) Time \\u2014 we\\'ll confirm instantly.',
          badge: '\\ud83d\\udcec Awaiting patient reply',
          book: false
        }
      ];

      function el(cls, html) {
        const d = document.createElement('div');
        d.className = cls; d.innerHTML = html; return d;
      }
      function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

      async function run() {
        const s = S[idx++ % S.length];
        convo.innerHTML = '';

        await sleep(350);
        convo.appendChild(el('em-msg patient',
          `<div class="em-from">${s.pFrom}</div><div class="em-bubble">${s.pText}</div>`));

        await sleep(1100);
        convo.appendChild(el('em-ai-label', s.aiLabel));

        await sleep(600);
        const t = el('em-typing', '<div class="em-typing-dots"><span></span><span></span><span></span></div>');
        convo.appendChild(t);

        await sleep(1900);
        t.remove();
        convo.appendChild(el('em-msg agent',
          `<div class="em-from">Smith Dental AI</div><div class="em-bubble">${s.aText}</div>`));
        processed++;
        if (s.book) booked++;
        if (processedEl) processedEl.textContent = processed;
        if (bookedEl)    bookedEl.textContent    = booked;

        await sleep(700);
        convo.appendChild(el('em-badge', s.badge));

        await sleep(5500);
        run();
      }

      run();
    })();

"""

src, n = OLD_JS_RE.subn(NEW_JS, src)
print(f'[4] Email widget JS replaced: {n} match(es)')

# ─────────────────────────────────────────────────────────────
# 5. Remove flow-steps responsive JS (csFlowSteps gone)
# ─────────────────────────────────────────────────────────────
FLOW_RE = re.compile(
    r'    /\* ── FLOW STEPS.*?\}\)\(\);\n',
    re.DOTALL
)
src, n = FLOW_RE.subn('', src)
print(f'[5] Flow steps JS removed: {n} match(es)')

# ─────────────────────────────────────────────────────────────
# Write result
# ─────────────────────────────────────────────────────────────
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(src)

new_len = len(src)
print(f'\nDone. File size: {original_len} → {new_len} bytes ({original_len - new_len:+d})')
