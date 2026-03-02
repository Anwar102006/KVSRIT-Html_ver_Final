import re
import os

html_orig = open('original_index.html', encoding='utf-8').read()

local_imgs = os.listdir('images/drkvsrit')

matches = set()
for m in re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html_orig, re.IGNORECASE):
    matches.add(m)
for m in re.findall(r'url\([\'"]?([^\'"\)]+)[\'"]?\)', html_orig, re.IGNORECASE):
    matches.add(m)

with open('mapping_output.txt', 'w', encoding='utf-8') as f:
    for img in matches:
        basename = os.path.basename(img.split('?')[0])
        for local in local_imgs:
            if local.startswith(basename):
                f.write(f"Original: {img} -> Local: images/drkvsrit/{local}\n")
                break
