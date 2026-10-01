const fs = require('fs');
const path = require('path');

const generateComponent = (name, title) => `
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';

const ${name} = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  return (
    <Layout pageTitle="${title}" role={role}>
      <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 lg:p-8 border border-sand dark-theme:border-gray-800 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 dark-theme:text-white mb-4">${title}</h2>
        <p className="text-gray-500 dark-theme:text-gray-400">
          This feature is currently under active development. Check back soon for updates!
        </p>
      </div>
    </Layout>
  );
};

export default ${name};
`;

const pages = [
  'CareerGuidance',
  'OneOnOneMentorship',
  'GroupMentorship',
  'Roadmaps',
  'Workshops',
  'JobPortal'
];

const titles = [
  'Career Guidance',
  '1-on-1 Mentorship',
  'Alumni Student Group Mentorship',
  'Roadmaps & Noticeboards',
  'Workshops',
  'Job Portal'
];

const dirs = [
  path.join(__dirname, 'src', 'pages', 'student'),
  path.join(__dirname, 'src', 'pages', 'alumni'),
  path.join(__dirname, 'src', 'pages', 'admin')
];

for (const dir of dirs) {
  let indexExports = [];
  
  if (fs.existsSync(path.join(dir, 'index.js'))) {
    indexExports = fs.readFileSync(path.join(dir, 'index.js'), 'utf-8').split('\n').filter(l => l.trim() !== '');
  }

  for (let i = 0; i < pages.length; i++) {
    const pageName = pages[i];
    const pageTitle = titles[i];
    
    // For admin, prefix with Admin maybe? No, just pass role="admin" from App.jsx
    // Actually we can create them inside a shared folder, or duplicate for each for separation of concerns. Let's create duplicates for separation.
    
    // We'll prefix based on dir
    const folderName = path.basename(dir);
    const componentName = folderName.charAt(0).toUpperCase() + folderName.slice(1) + pageName;
    
    const filePath = path.join(dir, \`\${componentName}.jsx\`);
    fs.writeFileSync(filePath, generateComponent(componentName, pageTitle));
    
    const exportStatement = \`export { default as \${componentName} } from './\${componentName}';\`;
    if (!indexExports.includes(exportStatement)) {
      indexExports.push(exportStatement);
    }
  }

  fs.writeFileSync(path.join(dir, 'index.js'), indexExports.join('\n') + '\n');
}

console.log('Successfully created boilerplate pages.');
