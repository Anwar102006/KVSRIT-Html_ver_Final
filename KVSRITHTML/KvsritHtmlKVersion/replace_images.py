"""
Replace placeholder/unsplash/external images in local HTML files
with the actual downloaded images from images/drkvsrit/
Based on the original website: https://drkvsrit.ac.in/index.html
"""
import os
import re
import shutil

BASE = os.path.dirname(os.path.abspath(__file__))
DRKVSRIT = os.path.join(BASE, "images", "drkvsrit")

# ──────────────────────────────────────────────
# Step 1: Copy key downloaded images into proper local folders
# ──────────────────────────────────────────────

# Hero slides - the original site uses FRESHMAN(3).png, EVENT1.png, DR.KVSRIT GIRL'S HOSTEL, 1.png as slider images
# We'll copy the main downloaded images to images/hero/ for the slider
hero_map = {
    # slide-4 = first shown (Logo/campus) -> 1.png (campus banner)
    "slide-4.jpg": "1.png",
    # slide-1 = FRESHMAN event image
    "slide-1.jpg": "FRESHMAN (3).png",
    # slide-2 = EVENT1
    "slide-2.jpg": "EVENT1.png",
    # slide-3 = campus (keep existing or use FRESHMAN%20 version)
}

hero_dir = os.path.join(BASE, "images", "hero")
os.makedirs(hero_dir, exist_ok=True)

for dest_name, src_name in hero_map.items():
    src = os.path.join(DRKVSRIT, src_name)
    dst = os.path.join(hero_dir, dest_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied hero: {src_name} -> images/hero/{dest_name}")

# Logo - DO NOT overwrite the custom logo in images/logo.png
# The user's own logo should remain untouched
print("Skipping logo copy (keeping existing custom logo)")

# ──────────────────────────────────────────────
# Step 2: Define all image replacements for index.html
# ──────────────────────────────────────────────

# These are replacements in index.html where external/placeholder images need to be replaced
# with local downloaded images from images/drkvsrit/

index_replacements = {
    # News section event carousel images - replace Unsplash placeholders with real college images
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop":
        "images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=800&fit=crop":
        "images/drkvsrit/FRESHMAN (3).png",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop":
        "images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop":
        "images/drkvsrit/FRESHMAN%20(3).png",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop":
        "images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop":
        "images/drkvsrit/1.png",
}

# ──────────────────────────────────────────────
# Step 3: Apply replacements to index.html
# ──────────────────────────────────────────────

index_path = os.path.join(BASE, "index.html")
content = open(index_path, "r", encoding="utf-8").read()
original = content

for old, new in index_replacements.items():
    if old in content:
        content = content.replace(old, new)
        print(f"Replaced in index.html: {old[:60]}... -> {new}")

if content != original:
    open(index_path, "w", encoding="utf-8").write(content)
    print(f"\n✅ index.html updated with {len(index_replacements)} image replacements")
else:
    print("\n⚠️ No changes needed in index.html")

# ──────────────────────────────────────────────
# Step 4: Check navbar component for logo references
# ──────────────────────────────────────────────

navbar_path = os.path.join(BASE, "assets", "components", "navbar")
if os.path.isdir(navbar_path):
    for f in os.listdir(navbar_path):
        if f.endswith(".html"):
            fp = os.path.join(navbar_path, f)
            c = open(fp, "r", encoding="utf-8").read()
            orig = c
            # Replace any external logo references
            if "drkvsrit" in c and ("assets/" in c or "wp-content" in c):
                c = c.replace("assets/dr-k.v.subba-reddy-institute-of-technology.png",
                              "images/drkvsrit/dr-k.v.subba-reddy-institute-of-technology.png")
                if c != orig:
                    open(fp, "w", encoding="utf-8").write(c)
                    print(f"Updated navbar: {f}")

# ──────────────────────────────────────────────
# Step 5: Check footer component for social media icons
# ──────────────────────────────────────────────

footer_path = os.path.join(BASE, "assets", "components", "footer")
if os.path.isdir(footer_path):
    for f in os.listdir(footer_path):
        if f.endswith(".html"):
            fp = os.path.join(footer_path, f)
            c = open(fp, "r", encoding="utf-8").read()
            orig = c
            # Social media icon replacements are already SVG inline in the footer typically
            if c != orig:
                open(fp, "w", encoding="utf-8").write(c)
                print(f"Updated footer: {f}")

print("\n🎉 All image replacements complete!")
print(f"Downloaded images available in: images/drkvsrit/ ({len(os.listdir(DRKVSRIT))} files)")
