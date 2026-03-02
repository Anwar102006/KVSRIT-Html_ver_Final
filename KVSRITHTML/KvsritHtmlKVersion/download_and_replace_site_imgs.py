"""
Download specific images referenced from drkvsrit.ac.in across local HTML pages,
then replace the URLs with local paths.
DO NOT touch logos.
"""
import os, re, requests
from urllib.parse import urlparse, unquote

BASE = os.path.dirname(os.path.abspath(__file__))
MGMT_DIR = os.path.join(BASE, "images", "management")
os.makedirs(MGMT_DIR, exist_ok=True)

requests.packages.urllib3.disable_warnings()
session = requests.Session()
session.verify = False
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
})

# Step 1: Find ALL external drkvsrit.ac.in image URLs across local HTMLs
print("🔍 Scanning all HTML files for drkvsrit.ac.in image URLs...")
ext_urls = set()

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules']]
    for f in files:
        if not f.endswith('.html') or f == 'original_index.html':
            continue
        fp = os.path.join(root, f)
        try:
            content = open(fp, 'r', encoding='utf-8').read()
        except:
            continue
        # Find image src with drkvsrit.ac.in
        urls = re.findall(r'src=["\']?(https://drkvsrit\.ac\.in/[^"\'>\s]+)["\']?', content)
        for u in urls:
            if any(ext in u.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']):
                ext_urls.add(u)

print(f"  Found {len(ext_urls)} unique external image URLs:")
for u in sorted(ext_urls):
    print(f"  - {u}")

# Step 2: Download each image to appropriate local folder
url_to_local = {}
for url in ext_urls:
    parsed = urlparse(url)
    path_parts = parsed.path.strip('/').split('/')
    filename = unquote(os.path.basename(parsed.path))
    filename = re.sub(r'[<>:"|?*]', '_', filename)
    
    # Determine destination folder based on path
    if 'management' in parsed.path:
        dest_dir = MGMT_DIR
        local_rel = f"images/management/{filename}"
    elif 'principal' in parsed.path:
        dest_dir = MGMT_DIR
        local_rel = f"images/management/{filename}"
    elif 'faculty' in parsed.path or 'staff' in parsed.path:
        dest_dir = os.path.join(BASE, "images", "faculty")
        os.makedirs(dest_dir, exist_ok=True)
        local_rel = f"images/faculty/{filename}"
    elif 'department' in parsed.path:
        dest_dir = os.path.join(BASE, "images", "departments")
        os.makedirs(dest_dir, exist_ok=True)
        local_rel = f"images/departments/{filename}"
    elif 'placement' in parsed.path or 'training' in parsed.path:
        dest_dir = os.path.join(BASE, "images", "placements")
        os.makedirs(dest_dir, exist_ok=True)
        local_rel = f"images/placements/{filename}"
    elif 'infrastructure' in parsed.path or 'facilities' in parsed.path:
        dest_dir = os.path.join(BASE, "images", "infrastructure")
        os.makedirs(dest_dir, exist_ok=True)
        local_rel = f"images/infrastructure/{filename}"
    elif 'gallery' in parsed.path or 'event' in parsed.path:
        dest_dir = os.path.join(BASE, "images", "gallery")
        os.makedirs(dest_dir, exist_ok=True)
        local_rel = f"images/gallery/{filename}"
    else:
        dest_dir = os.path.join(BASE, "images", "site")
        os.makedirs(dest_dir, exist_ok=True)
        local_rel = f"images/site/{filename}"
    
    final_dest = os.path.join(dest_dir, filename)
    
    if not os.path.exists(final_dest):
        try:
            print(f"  ⬇️ Downloading: {filename}")
            img_res = session.get(url, timeout=30)
            img_res.raise_for_status()
            with open(final_dest, 'wb') as f:
                f.write(img_res.content)
            print(f"  ✅ Saved: {local_rel}")
        except Exception as e:
            print(f"  ❌ Failed: {url} - {e}")
            continue
    else:
        print(f"  ⏭️ Already exists: {local_rel}")
    
    url_to_local[url] = local_rel

# Step 3: Replace URLs in all HTML files
print(f"\n📝 Replacing {len(url_to_local)} URLs in HTML files...")
total_files = 0
total_replacements = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules']]
    for f in files:
        if not f.endswith('.html') or f == 'original_index.html':
            continue
        fp = os.path.join(root, f)
        try:
            content = open(fp, 'r', encoding='utf-8').read()
        except:
            continue
        
        original = content
        file_count = 0
        
        # Calculate depth for relative paths
        rel_dir = os.path.relpath(root, BASE)
        depth = 0 if rel_dir == '.' else rel_dir.count(os.sep) + 1
        prefix = "../" * depth
        
        for url, local_path in url_to_local.items():
            if url in content:
                adjusted = prefix + local_path
                content = content.replace(url, adjusted)
                file_count += content.count(adjusted)  # rough count
        
        if content != original:
            open(fp, 'w', encoding='utf-8').write(content)
            rel_path = os.path.relpath(fp, BASE)
            print(f"  ✅ {rel_path}: updated")
            total_files += 1

print(f"\n🎉 Done! Updated {total_files} files")
print(f"   Management images saved to: images/management/")
