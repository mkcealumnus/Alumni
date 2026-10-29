/**
 * Safe Cross-Platform Monorepo Cleaning Script for Alumnux
 * Cleans disposable build artifacts, caches, and tsbuildinfo without touching node_modules or .git
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const targetDirNames = new Set(['dist', 'build', '.turbo', 'coverage']);

let cleanedCount = 0;

function cleanDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      const rel = path.relative(repoRoot, dirPath);
      console.log(`[Cleaned] ${rel}`);
      cleanedCount++;
    } catch (err) {
      console.warn(`[Warning] Could not remove ${dirPath}: ${err.message}`);
    }
  }
}

function cleanTsBuildInfo(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        cleanTsBuildInfo(full);
      } else if (entry.name.endsWith('.tsbuildinfo')) {
        fs.unlinkSync(full);
        const rel = path.relative(repoRoot, full);
        console.log(`[Cleaned] ${rel}`);
        cleanedCount++;
      }
    }
  } catch {
    // Ignore inaccessible directories
  }
}

console.log('--- Cleaning Alumnux Monorepo Build Artifacts & Caches ---');

// 1. Clean root target dirs
targetDirNames.forEach((name) => cleanDir(path.join(repoRoot, name)));

// 2. Clean workspace target dirs
const workspaceGroups = ['apps', 'packages', 'workers'];
for (const group of workspaceGroups) {
  const groupPath = path.join(repoRoot, group);
  if (!fs.existsSync(groupPath)) continue;
  const workspaces = fs.readdirSync(groupPath, { withFileTypes: true });
  for (const ws of workspaces) {
    if (!ws.isDirectory()) continue;
    const wsPath = path.join(groupPath, ws.name);
    targetDirNames.forEach((name) => cleanDir(path.join(wsPath, name)));
  }
}

// 3. Clean any leftover .tsbuildinfo files
cleanTsBuildInfo(repoRoot);

console.log(`--- Clean Complete (${cleanedCount} items removed) ---`);
