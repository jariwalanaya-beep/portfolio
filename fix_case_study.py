import re

with open("case-study-dashboard.html", "r") as f:
    content = f.read()

# 1. Remove the h2 from ba-section
content = content.replace('<h2 class="sec-h2">From rows of data to instant clarity</h2>', '')

# 2. Find the stats-strip div inside the benefits section
stats_pattern = re.compile(r'    <div class="stats-strip" id="stats">.*?    </div>\n', re.DOTALL)
stats_match = stats_pattern.search(content)

if stats_match:
    stats_html = stats_match.group(0)
    
    # Remove it from benefits section
    content = content.replace(stats_html, '')
    
    # Insert it right after the ba-header in ba-section
    ba_header_end = '<div class="sec-tag">Result</div>\n      \n    </div>\n'
    
    # Let's cleanly find the exact ba-header insertion point
    if ba_header_end in content:
        content = content.replace(ba_header_end, ba_header_end + stats_html)
    else:
        # try another insertion
        ba_header_alt = '<div class="sec-tag">Result</div>\n      \n    </div>'
        content = content.replace(ba_header_alt, ba_header_alt + "\n" + stats_html)

with open("case-study-dashboard.html", "w") as f:
    f.write(content)

print("done")
