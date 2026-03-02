"""
Update ALL local HTML pages with real data and images from drkvsrit.ac.in
This script processes each page, adds real content text and replaces images.
DO NOT touch logos.
"""
import os, re

BASE = os.path.dirname(os.path.abspath(__file__))

def read_html(rel_path):
    fp = os.path.join(BASE, rel_path)
    if os.path.exists(fp):
        return open(fp, 'r', encoding='utf-8').read()
    return None

def write_html(rel_path, content):
    fp = os.path.join(BASE, rel_path)
    open(fp, 'w', encoding='utf-8').write(content)
    print(f"  ✅ Updated: {rel_path}")

def replace_between(content, start_marker, end_marker, new_content):
    """Replace content between two markers (inclusive of markers)"""
    pattern = re.escape(start_marker) + r'.*?' + re.escape(end_marker)
    return re.sub(pattern, start_marker + new_content + end_marker, content, flags=re.DOTALL)

# ============================================================
# PAGE 1: about-training-placement/index.html  
# ============================================================
print("\n📄 Processing: about-training-placement/index.html")
c = read_html("about-training-placement/index.html")
if c:
    # Add real T&P cell content - replace placeholder text
    if "unsplash" in c or "placeholder" in c.lower() or "Lorem" in c:
        c = re.sub(
            r'https://images\.unsplash\.com/[^\s"\'>\)]+',
            '../images/placements/training-placement.png',
            c
        )
    
    # Replace any generic placement text with real data
    tp_real_text = """The Training and Placement Cell plays a crucial role in locating job opportunities for Under Graduates and Post Graduates passing out from the college by keeping in touch with reputed firms and industrial establishments. The Placement Cell operates round the year to facilitate contacts between companies and graduates."""
    
    if "training" in c.lower() and "placement" in c.lower():
        # Try to update generic text
        c = c.replace(
            "The Training &amp; Placement Cell at KVSRIT bridges the gap between academic excellence and industry requirements.",
            tp_real_text
        )
        c = c.replace(
            "The Training & Placement Cell at KVSRIT bridges the gap between academic excellence and industry requirements.",
            tp_real_text
        )
    write_html("about-training-placement/index.html", c)

# ============================================================
# PAGE 2: placement-record/index.html
# ============================================================
print("\n📄 Processing: placement-record/index.html")
c = read_html("placement-record/index.html")
if c:
    c = re.sub(
        r'https://images\.unsplash\.com/[^\s"\'>\)]+',
        '../images/placements/placements1.jpg',
        c
    )
    write_html("placement-record/index.html", c)

# ============================================================
# PAGE 3: placements/index.html
# ============================================================
print("\n📄 Processing: placements/index.html")
c = read_html("placements/index.html")
if c:
    c = re.sub(
        r'https://images\.unsplash\.com/[^\s"\'>\)]+',
        '../images/placements/placements1.jpg',
        c
    )
    write_html("placements/index.html", c)

# ============================================================
# PAGE 4: infrastructure/index.html
# ============================================================
print("\n📄 Processing: infrastructure/index.html")
c = read_html("infrastructure/index.html")
if c:
    # Replace unsplash with real infrastructure images
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    infra_imgs = [
        '../images/infrastructure/campus-header.jpg',
        '../images/infrastructure/hostel.jpg',
        '../images/infrastructure/sports.jpg',
        '../images/facilities/campus-building.png',
    ]
    for i, match in enumerate(unsplash_matches):
        img = infra_imgs[i % len(infra_imgs)]
        c = c.replace(match, img, 1)
    write_html("infrastructure/index.html", c)

# ============================================================
# PAGE 5: facilities/index.html
# ============================================================
print("\n📄 Processing: facilities/index.html")
c = read_html("facilities/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    facility_imgs = [
        '../images/facilities/library.jpg',
        '../images/facilities/computer-center.jpg',
        '../images/facilities/health-center.jpg',
        '../images/facilities/transportation.jpg',
        '../images/facilities/cafeteria.jpg',
        '../images/facilities/gym.jpg',
        '../images/facilities/grievance.jpg',
        '../images/facilities/campus-building.png',
    ]
    for i, match in enumerate(unsplash_matches):
        img = facility_imgs[i % len(facility_imgs)]
        c = c.replace(match, img, 1)
    write_html("facilities/index.html", c)

# ============================================================
# PAGE 6: campus-life/index.html
# ============================================================
print("\n📄 Processing: campus-life/index.html")
c = read_html("campus-life/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    campus_imgs = [
        '../images/about/aboutus-slider1.jpg',
        '../images/about/aboutus-slider2.jpg',
        '../images/about/aboutus-slider3.jpg',
        '../images/infrastructure/sports.jpg',
        '../images/facilities/cafeteria.jpg',
        '../images/facilities/gym.jpg',
        '../images/infrastructure/hostel.jpg',
        '../images/drkvsrit/EVENT1.png',
    ]
    for i, match in enumerate(unsplash_matches):
        img = campus_imgs[i % len(campus_imgs)]
        c = c.replace(match, img, 1)
    write_html("campus-life/index.html", c)

# ============================================================
# PAGE 7: gallery/index.html
# ============================================================
print("\n📄 Processing: gallery/index.html")
c = read_html("gallery/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    gallery_imgs = [
        '../images/about/aboutus-slider1.jpg',
        '../images/about/aboutus-slider2.jpg',
        '../images/about/aboutus-slider3.jpg',
        '../images/drkvsrit/EVENT1.png',
        '../images/drkvsrit/FRESHMAN (3).png',
        '../images/drkvsrit/1.png',
        '../images/infrastructure/campus-header.jpg',
        '../images/infrastructure/sports.jpg',
        '../images/facilities/library.jpg',
        '../images/facilities/cafeteria.jpg',
        '../images/facilities/gym.jpg',
        '../images/facilities/computer-center.jpg',
    ]
    for i, match in enumerate(unsplash_matches):
        img = gallery_imgs[i % len(gallery_imgs)]
        c = c.replace(match, img, 1)
    write_html("gallery/index.html", c)

# ============================================================
# PAGE 8: library/index.html
# ============================================================
print("\n📄 Processing: library/index.html")
c = read_html("library/index.html")
if c:
    c = re.sub(
        r'https://images\.unsplash\.com/[^\s"\'>\)]+',
        '../images/facilities/library.jpg',
        c
    )
    write_html("library/index.html", c)

# ============================================================
# PAGE 9: leadership/index.html
# ============================================================
print("\n📄 Processing: leadership/index.html")
c = read_html("leadership/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    mgmt_imgs = [
        '../images/management/chairman.jpg',
        '../images/management/principal.jpg',
        '../images/management/chairman.jpg',
    ]
    for i, match in enumerate(unsplash_matches):
        img = mgmt_imgs[i % len(mgmt_imgs)]
        c = c.replace(match, img, 1)
    write_html("leadership/index.html", c)

# ============================================================
# PAGE 10: faculty/index.html & faculty.html
# ============================================================
print("\n📄 Processing: faculty pages")
for fpath in ["faculty/index.html", "faculty.html"]:
    c = read_html(fpath)
    if c:
        c = re.sub(
            r'https://images\.unsplash\.com/[^\s"\'>\)]+',
            '../images/management/principal.jpg' if '/' in fpath else 'images/management/principal.jpg',
            c
        )
        write_html(fpath, c)

# ============================================================
# PAGE 11: events/index.html
# ============================================================
print("\n📄 Processing: events/index.html")
c = read_html("events/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    event_imgs = [
        '../images/drkvsrit/EVENT1.png',
        '../images/drkvsrit/FRESHMAN (3).png',
        '../images/drkvsrit/1.png',
        '../images/about/aboutus-slider1.jpg',
    ]
    for i, match in enumerate(unsplash_matches):
        img = event_imgs[i % len(event_imgs)]
        c = c.replace(match, img, 1)
    write_html("events/index.html", c)

# ============================================================
# PAGE 12: news-and-events/index.html
# ============================================================
print("\n📄 Processing: news-and-events/index.html")
c = read_html("news-and-events/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    event_imgs = [
        '../images/drkvsrit/EVENT1.png',
        '../images/drkvsrit/FRESHMAN (3).png',
        '../images/drkvsrit/1.png',
    ]
    for i, match in enumerate(unsplash_matches):
        img = event_imgs[i % len(event_imgs)]
        c = c.replace(match, img, 1)
    write_html("news-and-events/index.html", c)

# ============================================================
# PAGE 13: All department pages
# ============================================================
print("\n📄 Processing: department pages")
dept_dirs = ['ai', 'ai-only', 'ce', 'cse', 'ds', 'ece', 'eee', 'hs', 'mba', 'mca', 'me']
for dept in dept_dirs:
    fpath = f"departments/{dept}/index.html"
    c = read_html(fpath)
    if c:
        unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
        dept_imgs = [
            '../../images/about/aboutus-slider1.jpg',
            '../../images/about/aboutus-slider2.jpg',
            '../../images/drkvsrit/EVENT1.png',
            '../../images/facilities/computer-center.jpg',
        ]
        for i, match in enumerate(unsplash_matches):
            img = dept_imgs[i % len(dept_imgs)]
            c = c.replace(match, img, 1)
        if unsplash_matches:
            write_html(fpath, c)

# departments/index.html
c = read_html("departments/index.html")
if c:
    c = re.sub(
        r'https://images\.unsplash\.com/[^\s"\'>\)]+',
        '../images/about/aboutus-slider1.jpg',
        c
    )
    write_html("departments/index.html", c)

# ============================================================
# PAGE 14: about/index.html
# ============================================================
print("\n📄 Processing: about/index.html")
c = read_html("about/index.html")
if c:
    unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
    about_imgs = [
        '../images/about/aboutus-slider1.jpg',
        '../images/management/chairman.jpg',
        '../images/management/principal.jpg',
    ]
    for i, match in enumerate(unsplash_matches):
        img = about_imgs[i % len(about_imgs)]
        c = c.replace(match, img, 1)
    write_html("about/index.html", c)

# ============================================================
# PAGE 15: admissions/index.html & admissions.html
# ============================================================
print("\n📄 Processing: admissions pages")
for fpath in ["admissions/index.html", "admissions.html"]:
    c = read_html(fpath)
    if c:
        unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
        prefix = '../' if '/' in fpath else ''
        adm_imgs = [
            f'{prefix}images/about/aboutus-slider1.jpg',
            f'{prefix}images/about/aboutus-slider2.jpg',
            f'{prefix}images/drkvsrit/EVENT1.png',
        ]
        for i, match in enumerate(unsplash_matches):
            img = adm_imgs[i % len(adm_imgs)]
            c = c.replace(match, img, 1)
        if unsplash_matches:
            write_html(fpath, c)

# ============================================================
# PAGE 16: remaining pages
# ============================================================
print("\n📄 Processing: remaining pages")
remaining = [
    "academic-council/index.html",
    "academics/index.html",
    "admin/index.html",
    "administration/index.html",
    "affiliation-and-accreditation/index.html",
    "alumni/index.html",
    "contact/index.html",
    "contact.html",
    "courses/index.html",
    "internships/index.html",
    "iqac/index.html",
    "mandatory-disclosures/index.html",
    "research/index.html",
    "service-rules/index.html",
    "student-portal/index.html",
    "vision-mission-quality-policy/index.html",
]

for fpath in remaining:
    c = read_html(fpath)
    if c:
        unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\s"\'>\)]+', c)
        if unsplash_matches:
            prefix = '../' if '/' in fpath else ''
            default_imgs = [
                f'{prefix}images/about/aboutus-slider1.jpg',
                f'{prefix}images/about/aboutus-slider2.jpg',
                f'{prefix}images/drkvsrit/EVENT1.png',
                f'{prefix}images/about/aboutus-slider3.jpg',
            ]
            for i, match in enumerate(unsplash_matches):
                img = default_imgs[i % len(default_imgs)]
                c = c.replace(match, img, 1)
            write_html(fpath, c)

# ============================================================
# FINAL CHECK
# ============================================================
print("\n" + "="*60)
print("FINAL VERIFICATION")
print("="*60)
remaining_ext = 0
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
        ext = re.findall(r'src=["\']?(https://images\.unsplash\.com/[^\s"\'>\)]+)', content)
        if ext:
            rel = os.path.relpath(fp, BASE)
            print(f"  ⚠️ {rel}: still has {len(ext)} unsplash images")
            remaining_ext += len(ext)

if remaining_ext == 0:
    print("  ✅ ALL PAGES CLEAN - Zero external image URLs remaining!")
else:
    print(f"\n  ⚠️ {remaining_ext} external images still remaining")

print("\n🎉 All pages processed!")
