const fs = require('fs');
const path = require('path');

const directory = path.join(process.cwd(), 'src/pages/alumni');

function renameAndReplace() {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        let newFile = file.replace(/Mentor/g, 'Alumni');
        
        const oldPath = path.join(directory, file);
        const newPath = path.join(directory, newFile);
        
        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} to ${newFile}`);
        }
        
        if (newPath.endsWith('.jsx') || newPath.endsWith('.js')) {
            let content = fs.readFileSync(newPath, 'utf8');
            let modified = false;

            // Replace text
            const replacements = [
                { regex: /Mentor/g, replacement: 'Alumni' },
                { regex: /mentor/g, replacement: 'alumni' },
                { regex: /MENTOR/g, replacement: 'ALUMNI' },
                { regex: /Instructor/g, replacement: 'Alumni' },
                { regex: /instructor/g, replacement: 'alumni' }
            ];

            for (const { regex, replacement } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(newPath, content, 'utf8');
                console.log(`Updated content: ${newPath}`);
            }
        }
    }
}

renameAndReplace();
console.log('Alumni refactor complete.');
