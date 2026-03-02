"""
Copy downloaded page-specific images to proper folders
and replace ALL external/placeholder image references in ALL HTML pages.
DO NOT touch logo files.
"""
import os, re, shutil

BASE = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(BASE, "images", "drkvsrit_pages")

# ──────────────────────────────────────────────
# Step 1: Copy page-specific images to organized folders
# ──────────────────────────────────────────────

copies = {
    # About page - management photos
    "about-us/aboutus-slider1.jpg": "images/about/aboutus-slider1.jpg",
    "about-us/aboutus-slider2.jpg": "images/about/aboutus-slider2.jpg",
    "about-us/aboutus-slider3.jpg": "images/about/aboutus-slider3.jpg",
    "about-us/WT.png": "images/about/WT.png",
    
    # Principal
    "principal/PRINCIPAL.jpeg": "images/management/principal.jpg",
    "principal/12.png": "images/management/chairman.jpg",
    
    # Placement record
    "placement-record/placements1.jpg": "images/placements/placements1.jpg",
    "placement-record/placements2.jpg": "images/placements/placements2.jpg",
    "placement-record/placements3.jpg": "images/placements/placements3.jpg",
    "placement-record/placements4.jpg": "images/placements/placements4.jpg",
    "placement-record/tp1.jpg": "images/placements/tp1.jpg",
    "placement-record/tp2.jpg": "images/placements/tp2.jpg",
    "placement-record/tp3.jpg": "images/placements/tp3.jpg",
    "placement-record/PLR (1).png": "images/placements/placement-record.png",
    "placement-record/logo-new7.jpg": "images/placements/logo-new7.jpg",
    
    # Infrastructure
    "infrastructure/innerheader-copy1-scaled.jpg": "images/infrastructure/campus-header.jpg",
    "infrastructure/hostel.jpg": "images/infrastructure/hostel.jpg",
    "infrastructure/sports.jpg": "images/infrastructure/sports.jpg",
    
    # Facilities
    "facilities/Cafeteria.jpg": "images/facilities/cafeteria.jpg",
    "facilities/computer-center.jpg": "images/facilities/computer-center.jpg",
    "facilities/gym.jpg": "images/facilities/gym.jpg",
    "facilities/health-center.jpg": "images/facilities/health-center.jpg",
    "facilities/library.jpg": "images/facilities/library.jpg",
    "facilities/transportation.jpg": "images/facilities/transportation.jpg",
    "facilities/grievance.jpg": "images/facilities/grievance.jpg",
    "facilities/KGF2.png": "images/facilities/campus-building.png",
    
    # T&P
    "about-training-placement/T&P.png": "images/placements/training-placement.png",
    "about-training-placement/cycle.jpg": "images/placements/cycle.jpg",
}

print("📁 Copying page images to organized folders...")
for src_rel, dst_rel in copies.items():
    src = os.path.join(PAGES_DIR, src_rel)
    dst = os.path.join(BASE, dst_rel)
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            print(f"  ✅ {src_rel} -> {dst_rel}")
        else:
            print(f"  ⏭️ Already exists: {dst_rel}")
    else:
        print(f"  ❌ Missing source: {src_rel}")

# ──────────────────────────────────────────────
# Step 2: Replace external image URLs in HTML files
# ──────────────────────────────────────────────

# Map of external URL patterns -> local paths (relative to project root)
URL_MAP = {
    # Management images (about.html)
    "https://drkvsrit.ac.in/assets/img/management/chairman.jpg": "images/management/chairman.jpg",
    "https://drkvsrit.ac.in/assets/img/management/principal.jpg": "images/management/principal.jpg",
    "https://drkvsrit.ac.in/assets/img/management/correspondent.jpg": "images/management/chairman.jpg",
    
    # Common Unsplash replacements (page-specific context)
    # About page campus view placeholder
    "images/campus/campus-view.jpg": "images/about/aboutus-slider1.jpg",
}

print(f"\n📝 Replacing external URLs in all HTML files...")
total_files = 0
total_replacements = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'drkvsrit_pages', 'drkvsrit']]
    for f in files:
        if not f.endswith('.html') or f == 'original_index.html':
            continue
        fp = os.path.join(root, f)
        try:
            content = open(fp, 'r', encoding='utf-8').read()
        except:
            continue
        
        original = content
        
        # Calculate depth for relative path prefix
        rel_dir = os.path.relpath(root, BASE)
        depth = 0 if rel_dir == '.' else rel_dir.count(os.sep) + 1
        prefix = "../" * depth
        
        for ext_url, local_path in URL_MAP.items():
            if ext_url in content:
                adjusted = prefix + local_path
                content = content.replace(ext_url, adjusted)
        
        if content != original:
            open(fp, 'w', encoding='utf-8').write(content)
            rel_path = os.path.relpath(fp, BASE)
            print(f"  ✅ {rel_path}: updated")
            total_files += 1

# ──────────────────────────────────────────────
# Step 3: Summary
# ──────────────────────────────────────────────

print(f"\n🎉 Done!")
print(f"   Files updated: {total_files}")
print(f"   Images organized in:")

for d in ['images/management', 'images/about', 'images/placements', 'images/infrastructure', 'images/facilities']:
    dp = os.path.join(BASE, d)
    if os.path.isdir(dp):
        count = len([f for f in os.listdir(dp) if not f.startswith('.')])
        print(f"     {d}/: {count} files")
