import os
import re
import requests
from urllib.parse import urljoin, urlparse, unquote

url = "https://drkvsrit.ac.in/"
dest_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images", "drkvsrit")
os.makedirs(dest_dir, exist_ok=True)

requests.packages.urllib3.disable_warnings()
session = requests.Session()
session.verify = False
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
})

def ensure_absolute(img_url):
    if img_url.startswith("//"):
        return "https:" + img_url
    if img_url.startswith("/"):
        return urljoin(url, img_url)
    if img_url.startswith("http"):
        return img_url
    return urljoin(url, img_url)

print("Fetching website...")
try:
    response = session.get(url, timeout=30)
    html = response.text
except Exception as e:
    print(f"Error fetching website: {e}")
    exit(1)

# Regex to find <img src="...">
img_matches = set(re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE))
# Regex to find background-image: url(...)
bg_matches = set(re.findall(r'url\([\'"]?([^\'"\)]+)[\'"]?\)', html, re.IGNORECASE))

all_images = []
for m in img_matches.union(bg_matches):
    if m.startswith('data:'):
        continue
    img_url = ensure_absolute(m)
    if img_url not in all_images:
        all_images.append(img_url)

print(f"Found {len(all_images)} image URLs...")

for i, img_url in enumerate(all_images):
    print(f"Downloading {i+1}/{len(all_images)}: {img_url}")
    parsed = urlparse(img_url)
    filename = os.path.basename(unquote(parsed.path)) or f"image_{i}.jpg"
    if not re.search(r'\.(jpg|jpeg|png|gif|webp|svg|ico)$', filename, re.IGNORECASE):
        filename += '.jpg'
    
    base, ext = os.path.splitext(filename)
    final_dest = os.path.join(dest_dir, filename)
    counter = 1
    while os.path.exists(final_dest):
        final_dest = os.path.join(dest_dir, f"{base}_{counter}{ext}")
        counter += 1

    try:
        img_res = session.get(img_url, timeout=30)
        img_res.raise_for_status()
        with open(final_dest, 'wb') as f:
            f.write(img_res.content)
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")

print("Done downloading images.")
