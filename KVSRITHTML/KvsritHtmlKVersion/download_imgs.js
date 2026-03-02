const fs = require('fs');
const path = require('path');

const websiteUrl = 'https://drkvsrit.ac.in/';
const destDir = path.join(__dirname, 'images', 'drkvsrit');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function ensureUrlAbsolute(urlStr) {
    if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
        return urlStr;
    }
    if (urlStr.startsWith('//')) {
        return 'https:' + urlStr;
    }
    if (urlStr.startsWith('/')) {
        return 'https://drkvsrit.ac.in' + urlStr;
    }
    return 'https://drkvsrit.ac.in/' + urlStr;
}

async function scrapeImages() {
    console.log("Fetching website...");
    const res = await fetch(websiteUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    });
    const data = await res.text();

    const imageUrls = [];

    // Match <img src="...">
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    while ((match = imgRegex.exec(data)) !== null) {
        let imgUrl = ensureUrlAbsolute(match[1]);
        if (!imageUrls.includes(imgUrl)) {
            imageUrls.push(imgUrl);
        }
    }

    // Match background-image: url(...)
    const bgRegex = /url\(["']?([^"'\)]+)["']?\)/g;
    while ((match = bgRegex.exec(data)) !== null) {
        let bgUrl = match[1];
        if (bgUrl.startsWith('data:')) continue;
        let imgUrl = ensureUrlAbsolute(bgUrl);
        if (!imageUrls.includes(imgUrl)) {
            imageUrls.push(imgUrl);
        }
    }

    console.log(`Found ${imageUrls.length} image URLs...`);
    for (const [i, rawUrl] of imageUrls.entries()) {
        const imgUrl = encodeURI(rawUrl);
        try {
            let p = new URL(imgUrl).pathname;
            let fileName = path.basename(decodeURIComponent(p)) || `image_${i}.jpg`;
            if (!/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName)) {
                fileName += '.jpg';
            }
            let finalDest = path.join(destDir, fileName);
            let counter = 1;
            while (fs.existsSync(finalDest)) {
                const ext = path.extname(fileName);
                const base = path.basename(fileName, ext);
                finalDest = path.join(destDir, `${base}_${counter}${ext}`);
                counter++;
            }

            console.log(`Downloading ${i + 1}/${imageUrls.length}: ${imgUrl}`);
            const imgRes = await fetch(imgUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            if (!imgRes.ok) {
                console.error(`Status ${imgRes.status} for ${imgUrl}`);
                continue;
            }
            const buffer = await imgRes.arrayBuffer();
            fs.writeFileSync(finalDest, Buffer.from(buffer));
        } catch (e) {
            console.error(`Error downloading ${imgUrl}:`, e.message);
        }
    }
    console.log("Done downloading images.");
}

scrapeImages().catch(console.error);
