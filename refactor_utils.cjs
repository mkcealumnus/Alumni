const fs = require('fs');
const path = require('path');

const filePaths = [
    path.join(process.cwd(), 'src/utils/api.js'),
    path.join(process.cwd(), 'src/utils/certificateGenerator.js'),
    path.join(process.cwd(), 'src/pages/admin/AdminDashboard.jsx')
];

for (const fullPath of filePaths) {
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        const replacements = [
            { regex: /Mentor/g, replacement: 'Alumni' },
            { regex: /mentor/g, replacement: 'alumni' },
            { regex: /MENTOR/g, replacement: 'ALUMNI' },
            { regex: /manager/g, replacement: 'admin' },
            { regex: /creator/g, replacement: 'alumni' },
            { regex: /observer/g, replacement: 'alumni' }
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
console.log('src utils refactor complete.');
