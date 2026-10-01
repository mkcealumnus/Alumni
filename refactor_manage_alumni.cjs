const fs = require('fs');
const path = require('path');

const newPath = path.join(process.cwd(), 'src/pages/admin/ManageAlumni.jsx');

let content = fs.readFileSync(newPath, 'utf8');
let modified = false;

const replacements = [
    { regex: /Mentor/g, replacement: 'Alumni' },
    { regex: /mentor/g, replacement: 'alumni' },
    { regex: /MENTOR/g, replacement: 'ALUMNI' }
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
