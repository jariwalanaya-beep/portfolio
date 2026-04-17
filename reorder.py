import re

with open("case-study-whatsapp-clinic.html", "r") as f:
    text = f.read()

# Define section boundaries
# Before & After: <!-- BEFORE & AFTER --> to <!-- COMPARISON TABLE -->
# Compare: <!-- COMPARISON TABLE --> to <!-- PRICING -->
# Pricing: <!-- PRICING --> to <!-- ═══ HOW IT WORKS ═══ -->
# How it works: <!-- ═══ HOW IT WORKS ═══ --> to <!-- FAQ -->
# FAQ: <!-- FAQ --> to <!-- CTA -->
# CTA: <!-- CTA --> to script tags (or just keep it as the rest of the file since it's the last section)

def extract_section(start_marker, end_marker):
    start_idx = text.find(start_marker)
    end_idx = text.find(end_marker)
    if start_idx == -1 or end_idx == -1:
        print(f"Failed to find {start_marker} or {end_marker}")
        return ""
    return text[start_idx:end_idx]

ba_start = "  <!-- BEFORE & AFTER -->"
comp_start = "  <!-- COMPARISON TABLE -->"
pricing_start = "  <!-- PRICING -->"
how_start = "  <!-- ═══ HOW IT WORKS ═══ -->"
faq_start = "  <!-- FAQ -->"
cta_start = "  <!-- CTA -->"

# Extract sections
header_stats = text[:text.find(ba_start)]
compare_sec = extract_section(comp_start, pricing_start)
pricing_sec = extract_section(pricing_start, how_start)
how_sec = extract_section(how_start, faq_start)
faq_cta_rest = text[text.find(faq_start):]

# But we also want to separate FAQ and CTA just to be sure, though they are in the correct relative order already.
# Actually, wait. The user asked for FAQ then CTA. That is the current order, so faq_cta_rest is fine.
# But wait, what if I just assemble:
# Header + Stats -> Pricing -> How It Works -> Compare -> FAQ + CTA + Footer

new_text = header_stats + pricing_sec + how_sec + compare_sec + faq_cta_rest

# Remove "Before & After" link from navbar
new_text = re.sub(r' +<li><a href="#ba">Before &amp; After</a></li>\n', '', new_text)
new_text = re.sub(r' +<li><a href="#ba">Before & After</a></li>\n', '', new_text)
new_text = re.sub(r' +<a href="#ba" onclick="closeDrawer\(\)">Before &amp; After</a>\n', '', new_text)

with open("case-study-whatsapp-clinic.html", "w") as f:
    f.write(new_text)

print("Done")
