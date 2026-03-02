"""
Replace ALL external placeholder images across ALL HTML pages
with real downloaded college images from images/drkvsrit/
DO NOT touch the logo (images/logo.png)
"""
import os, re

BASE = r"c:\Users\masta\OneDrive\drive\OneDrive\Desktop\programming\Mubtada\KVSRIT-Htmlver\KVSRITHTML\KvsritHtmlKVersion"

# ──────────────────────────────────────────────
# Master mapping: Unsplash URL -> local image
# Grouped by CONTEXT (what the image represents)
# ──────────────────────────────────────────────

# These are all the unique Unsplash URLs found across the project pages
# mapped to appropriate downloaded college images

REPLACEMENTS = {
    # ---- CAMPUS / COLLEGE VIEWS ----
    # General campus/college/building images
    "https://images.unsplash.com/photo-1562774053-701939374585": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1592280771190-3e2e4d571952": "../images/drkvsrit/FRESHMAN%20(3).png",
    
    # ---- EVENTS / CONVOCATION / CULTURAL ----
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7": "../images/drkvsrit/FRESHMAN (3).png",
    
    # ---- PLACEMENT / CORPORATE ----
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1552664730-d307ca884978": "../images/drkvsrit/EVENT1.png",
    
    # ---- SPORTS ----
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211": "../images/drkvsrit/FRESHMAN (3).png",
    
    # ---- WORKSHOP / CLASSROOM / LEARNING ----
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45": "../images/drkvsrit/FRESHMAN%20(3).png",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4": "../images/drkvsrit/1.png",
    
    # ---- LIBRARY ----
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d": "../images/drkvsrit/FRESHMAN (3).png",
    
    # ---- LAB / RESEARCH ----
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1581093458791-9035bc5c3e7d": "../images/drkvsrit/FRESHMAN%20(3).png",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5": "../images/drkvsrit/1.png",
    
    # ---- INFRASTRUCTURE / HOSTEL ----
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5": "../images/drkvsrit/FRESHMAN (3).png",
    "https://images.unsplash.com/photo-1574958269340-fa927503f3dd": "../images/drkvsrit/1.png",
    
    # ---- FACULTY / PEOPLE ----
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5": "../images/drkvsrit/guideline_based1.png",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a": "../images/drkvsrit/guideline_based1.png",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e": "../images/drkvsrit/guideline_based1.png",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e": "../images/drkvsrit/guideline_based1.png",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e": "../images/drkvsrit/guideline_based1.png",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330": "../images/drkvsrit/guideline_based1.png",
    
    # ---- PLACEHOLDER / GENERIC ----
    "https://via.placeholder.com": "../images/drkvsrit/1.png",
    "https://picsum.photos": "../images/drkvsrit/1.png",
    
    # ---- ADMISSIONS ----
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644": "../images/drkvsrit/EVENT1.png",
    
    # ---- DEPARTMENTS (generic tech) ----
    "https://images.unsplash.com/photo-1518770660439-4636190af475": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd": "../images/drkvsrit/FRESHMAN (3).png",
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb": "../images/drkvsrit/1.png",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e": "../images/drkvsrit/EVENT1.png",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb": "../images/drkvsrit/FRESHMAN%20(3).png",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31": "../images/drkvsrit/1.png",
}

total_files_changed = 0
total_replacements = 0

for root, dirs, files in os.walk(BASE):
    # Skip drkvsrit image folder, .git, node_modules
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'drkvsrit']]
    
    for f in files:
        if not f.endswith('.html') or f == 'original_index.html':
            continue
            
        fp = os.path.join(root, f)
        try:
            content = open(fp, 'r', encoding='utf-8').read()
        except:
            continue
        
        original = content
        file_replacements = 0
        
        # Calculate relative path prefix for this file
        rel_dir = os.path.relpath(root, BASE)
        if rel_dir == '.':
            depth = 0
        else:
            depth = rel_dir.count(os.sep) + 1
        
        prefix = "../" * depth if depth > 0 else ""
        
        # Try each replacement
        for unsplash_url, local_path in REPLACEMENTS.items():
            # Find all full URLs that start with this unsplash key
            pattern = re.escape(unsplash_url) + r'[^"\s>\')\]]*'
            matches = re.findall(pattern, content)
            
            if matches:
                # Adjust the local path based on file depth
                adjusted_path = local_path
                if depth > 0:
                    # local_path starts with "../" - adjust for depth
                    # A file in root (depth=0) needs "images/drkvsrit/..."
                    # A file in subdir (depth=1) needs "../images/drkvsrit/..."
                    # A file in sub/sub (depth=2) needs "../../images/drkvsrit/..."
                    adjusted_path = ("../" * depth) + local_path.lstrip("../")
                else:
                    adjusted_path = local_path.lstrip("../")
                
                for match in matches:
                    content = content.replace(match, adjusted_path)
                    file_replacements += 1
        
        if content != original:
            open(fp, 'w', encoding='utf-8').write(content)
            rel_path = os.path.relpath(fp, BASE)
            print(f"✅ {rel_path}: {file_replacements} replacements")
            total_files_changed += 1
            total_replacements += file_replacements

print(f"\n🎉 Done! Changed {total_files_changed} files with {total_replacements} total image replacements")
