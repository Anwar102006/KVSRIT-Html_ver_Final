
const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'C:\\Users\\masta\\OneDrive\\drive\\OneDrive\\Desktop\\programming\\Mubtada\\CollegeWebsite\\KVSRIT-Htmlver\\KVSRITHTML\\KvsritHtmlKVersion';
const COMING_SOON_FILE = 'coming-soon.html';

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(ROOT_DIR);

files.forEach(file => {
    if (file.endsWith('.html') && !file.endsWith(COMING_SOON_FILE)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Calculate relative path to coming-soon.html
        // For file at ROOT/subdir/file.html
        // Dir is ROOT/subdir
        // Rel path to ROOT is ..
        // target is ../coming-soon.html

        const fileDir = path.dirname(file);
        let relPathToRoot = path.relative(fileDir, ROOT_DIR);
        // If file is in root, relPathToRoot is ""
        // If file is in subdir, relPathToRoot is ".."

        let targetLink = path.join(relPathToRoot, COMING_SOON_FILE).replace(/\\/g, '/');

        // Exact string replacement for href="#" and href=""
        // Note: global replace

        content = content.replace(/href="#"/g, `href="${targetLink}"`);
        content = content.replace(/href='#'/g, `href='${targetLink}'`);
        content = content.replace(/href=""/g, `href="${targetLink}"`);
        content = content.replace(/href=''/g, `href='${targetLink}'`);

        if (content !== originalContent) {
            console.log(`Updating ${file}`);
            fs.writeFileSync(file, content, 'utf8');
        }
    }
});
