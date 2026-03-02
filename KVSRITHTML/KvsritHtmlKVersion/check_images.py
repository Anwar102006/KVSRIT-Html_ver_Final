import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

img_pattern = re.compile(r'src=["\']([^"\']+)["\']|url\([\'"]?([^\'"\)]+)[\'"]?\)', re.IGNORECASE)

all_images = set()

for f in html_files:
    if f == 'original_index.html':
        continue
    content = open(f, 'r', encoding='utf-8').read()
    for match in img_pattern.findall(content):
        img_url = match[0] or match[1]
        if 'image' in img_url.lower() or 'bg' in img_url.lower() or '.jpg' in img_url or '.png' in img_url or '.svg' in img_url:
            all_images.add(img_url)

print("Images currently referenced in local HTMLs:")
for i in sorted(all_images)[:50]:
    print(" - " + i)
