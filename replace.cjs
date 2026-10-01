const fs = require('fs');
const path = require('path');

const excludeDirs = ['node_modules', '.git', 'dist', 'build'];

const replacements = [
    { regex: /Sowberry Academy/g, replacement: 'NextStep' },
    { regex: /Sowberry/g, replacement: 'NextStep' },
    { regex: /sowberry/g, replacement: 'nextstep' },
    { regex: /SOWBERRY/g, replacement: 'NEXTSTEP' }
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                processDirectory(fullPath);
            }
        } else {
            if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.html') || fullPath.endsWith('.json') || fullPath.endsWith('.md') || fullPath.endsWith('.css')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let modified = false;

                for (const { regex, replacement } of replacements) {
                    if (regex.test(content)) {
                        content = content.replace(regex, replacement);
                        modified = true;
                    }
                }

                if (modified) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Updated: ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(process.cwd());
console.log('Replacement complete.');
