const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const env = { ...process.env };
let currentPath = env.PATH || env.Path || '';

// 1. Ensure Cargo (~/.cargo/bin) is in PATH
const cargoBin = path.join(os.homedir(), '.cargo', 'bin');
if (fs.existsSync(cargoBin) && !currentPath.includes('.cargo')) {
  currentPath = `${cargoBin}${path.delimiter}${currentPath}`;
}

// 2. Ensure local and root node_modules/.bin are in PATH
const localBin = path.resolve(process.cwd(), 'node_modules', '.bin');
const rootBin = path.resolve(__dirname, '..', 'node_modules', '.bin');
const desktopBin = path.resolve(__dirname, '..', 'apps', 'desktop', 'node_modules', '.bin');

for (const b of [desktopBin, localBin, rootBin]) {
  if (fs.existsSync(b) && !currentPath.includes(b)) {
    currentPath = `${b}${path.delimiter}${currentPath}`;
  }
}

env.PATH = currentPath;
env.Path = currentPath;

let finalArgs = [...process.argv.slice(2)];
const isWin = process.platform === 'win32';

// Automatically provide the installed MinGW GNU target on Windows if not explicitly passed
if (isWin) {
  const isDev = finalArgs.includes('dev');
  const isBuild = finalArgs.includes('build');
  const hasTarget = finalArgs.includes('-t') || finalArgs.includes('--target');

  if ((isDev || isBuild) && !hasTarget) {
    finalArgs.push('-t', 'x86_64-pc-windows-gnu');
  }

  const hasBundleFlag = finalArgs.includes('--no-bundle') || finalArgs.includes('-b') || finalArgs.includes('--bundles');
  if (isBuild && !hasBundleFlag) {
    finalArgs.push('--no-bundle');
  }
}

let tauriExec = isWin ? 'tauri.cmd' : 'tauri';
for (const b of [desktopBin, localBin, rootBin]) {
  const candidate = path.join(b, tauriExec);
  if (fs.existsSync(candidate)) {
    tauriExec = candidate;
    break;
  }
}

const child = spawn(tauriExec, finalArgs, {
  stdio: 'inherit',
  shell: isWin,
  env,
  cwd: process.cwd(),
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
