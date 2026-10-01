const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src/pages', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/hover:bg-gray-50(?!0)/g, 'hover:bg-cream');
    content = content.replace(/(?<!:)bg-gray-50(?!0)/g, 'bg-cream');
    content = content.replace(/hover:bg-gray-100/g, 'hover:bg-sand');
    content = content.replace(/(?<!:)bg-gray-100/g, 'bg-sand');
    content = content.replace(/(?<!:)bg-gray-200/g, 'bg-sand');
    
    // Convert remaining bg-white that aren't already mapped to cards
    // wait, actually bg-white is good for cards. bg-cream is good for backgrounds.
    // Let's just fix text-gray-900 to ensure contrast
    content = content.replace(/text-gray-900 dark-theme:text-white/g, 'text-gray-900 dark-theme:text-gray-100');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
