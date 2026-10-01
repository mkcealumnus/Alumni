const fs = require('fs');
const path = require('path');

const routesDir = path.join(process.cwd(), 'server/routes');
const dbSetupPath = path.join(process.cwd(), 'server/config/dbSetup.js');

function replaceMentorInFiles() {
    const files = fs.readdirSync(routesDir);
    files.push('../config/dbSetup.js');
    
    for (const file of files) {
        const fullPath = path.join(routesDir, file);
        if (fs.existsSync(fullPath) && (fullPath.endsWith('.js') || fullPath.endsWith('.jsx'))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const replacements = [
                { regex: /Mentor/g, replacement: 'Alumni' },
                { regex: /mentor/g, replacement: 'alumni' },
                { regex: /MENTOR/g, replacement: 'ALUMNI' },
                { regex: /creator/g, replacement: 'alumni' },
                { regex: /manager/g, replacement: 'admin' },
                { regex: /observer/g, replacement: 'alumni' },
                { regex: /instructor/g, replacement: 'alumni' }
            ];

            for (const { regex, replacement } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated content: ${fullPath}`);
            }
        }
    }
}

replaceMentorInFiles();
console.log('Routes refactor complete.');
