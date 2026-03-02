"""
Download images from ALL subpages of drkvsrit.ac.in
and save them organized by page name
"""
import os, re, requests
from urllib.parse import urljoin, urlparse, unquote

BASE_URL = "https://drkvsrit.ac.in/"
DEST_BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images", "drkvsrit_pages")
os.makedirs(DEST_BASE, exist_ok=True)

requests.packages.urllib3.disable_warnings()
session = requests.Session()
session.verify = False
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
})

# All important subpages to scrape
PAGES = {
    "about-us": "about-us/",
    "admissions": "admissions-procedure/",
    "placement-record": "placement-record/",
    "infrastructure": "infrastructure/",
    "facilities": "facilities/",
    "campus-life": "events/",
    "gallery": "gallery-grid/",
    "about-training-placement": "about-training-placement/",
    "departments-cse": "computer-science-and-engineering/",
    "departments-ece": "ece/",
    "departments-eee": "eee/",
    "departments-me": "me/",
    "departments-ce": "ce/",
    "departments-mba": "mba/",
    "library": "library/",
    "administration": "administration/",
    "principal": "principal-2/",
}

def ensure_absolute(img_url, page_url):
    if img_url.startswith("//"):
        return "https:" + img_url
    if img_url.startswith("http"):
        return img_url
    return urljoin(page_url, img_url)

def download_images_from_page(page_name, page_path):
    page_url = BASE_URL + page_path
    dest_dir = os.path.join(DEST_BASE, page_name)
    os.makedirs(dest_dir, exist_ok=True)
    
    print(f"\n📄 Fetching: {page_url}")
    try:
        response = session.get(page_url, timeout=30)
        html = response.text
    except Exception as e:
        print(f"  ❌ Error fetching: {e}")
        return []
    
    # Find all image URLs
    img_matches = set(re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE))
    bg_matches = set(re.findall(r'url\([\'"]?([^\'")\s]+)[\'"]?\)', html, re.IGNORECASE))
    
    all_images = []
    for m in img_matches.union(bg_matches):
        if m.startswith('data:') or m.endswith('.css') or m.endswith('.js'):
            continue
        img_url = ensure_absolute(m, page_url)
        # Only download actual image files
        parsed = urlparse(img_url)
        path_lower = parsed.path.lower()
        if any(ext in path_lower for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']):
            if img_url not in all_images:
                all_images.append(img_url)
    
    print(f"  Found {len(all_images)} images")
    
    downloaded = []
    for i, img_url in enumerate(all_images):
        parsed = urlparse(img_url)
        filename = os.path.basename(unquote(parsed.path)) or f"image_{i}.jpg"
        # Clean filename
        filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
        
        final_dest = os.path.join(dest_dir, filename)
        if os.path.exists(final_dest):
            downloaded.append((img_url, filename))
            continue
            
        try:
            img_res = session.get(img_url, timeout=30)
            img_res.raise_for_status()
            with open(final_dest, 'wb') as f:
                f.write(img_res.content)
            downloaded.append((img_url, filename))
            print(f"  ✅ {filename}")
        except Exception as e:
            print(f"  ❌ Failed: {filename} - {e}")
    
    return downloaded

# Download from all pages
all_downloaded = {}
for page_name, page_path in PAGES.items():
    result = download_images_from_page(page_name, page_path)
    all_downloaded[page_name] = result

# Print summary
print("\n" + "="*60)
print("DOWNLOAD SUMMARY")
print("="*60)
for page, imgs in all_downloaded.items():
    print(f"  {page}: {len(imgs)} images")
print(f"\nTotal: {sum(len(v) for v in all_downloaded.values())} images downloaded")
