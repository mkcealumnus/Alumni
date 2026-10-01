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

    // 1. replace dark: with dark-theme: (we must be careful not to double replace if some already are dark-theme: )
    content = content.replace(/dark:(?!theme:)/g, 'dark-theme:');

    // 2. update card backgrounds
    content = content.replace(/bg-white dark-theme:bg-gray-800/g, 'bg-white dark-theme:bg-gray-900');
    content = content.replace(/bg-gray-50 dark-theme:bg-gray-900/g, 'bg-cream dark-theme:bg-gray-950');

    // 3. update borders
    content = content.replace(/border-gray-100 dark-theme:border-gray-700/g, 'border-sand dark-theme:border-gray-800');
    content = content.replace(/border-gray-200 dark-theme:border-gray-700/g, 'border-sand dark-theme:border-gray-800');
    content = content.replace(/border-gray-200 dark-theme:border-gray-600/g, 'border-sand dark-theme:border-gray-700');
    content = content.replace(/border-gray-100/g, 'border-sand');
    content = content.replace(/border-gray-200/g, 'border-sand');
    content = content.replace(/border-gray-300/g, 'border-sand');

    // 4. text colors
    content = content.replace(/dark-theme:text-white/g, 'dark-theme:text-gray-100');
    content = content.replace(/dark-theme:text-black/g, 'dark-theme:text-gray-900');

    // 5. brand colors (c-black, c-blue) -> tailwind standard/claude
    content = content.replace(/bg-c-black/g, 'bg-gray-900');
    content = content.replace(/text-c-black/g, 'text-gray-900');
    content = content.replace(/bg-c-blue/g, 'bg-primary');
    content = content.replace(/text-c-blue/g, 'text-primary');
    content = content.replace(/border-c-blue/g, 'border-primary');
    content = content.replace(/ring-c-blue/g, 'ring-primary');

    // 6. Fix some background colors inside dark-theme
    content = content.replace(/dark-theme:bg-black/g, 'dark-theme:bg-gray-950');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
