const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'icons');

const filenames = fs.readdirSync(dirPath, 'utf8');

filenames.forEach((filename) => {
    const filePath = path.join(dirPath, filename);

    if (filename.endsWith('.svg') || filename.includes('index.tsx')) {
        fs.unlinkSync(filePath);

        return;
    }

    if (filename.includes('.tsx')) {
        fs.renameSync(filePath, filePath.replace('Black', '').replace('24Dp', 'Icon'));
    }
});
