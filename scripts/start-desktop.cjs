const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const releaseBin = path.resolve(
  __dirname,
  '..',
  'apps',
  'desktop',
  'src-tauri',
  'target',
  'x86_64-pc-windows-gnu',
  'release',
  'alumnux-desktop.exe'
);

if (fs.existsSync(releaseBin)) {
  console.log(`[Alumnux Desktop] Launching native application: ${releaseBin}`);
  const child = spawn(releaseBin, [], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  console.log('[Alumnux Desktop] Application window active.');
  process.exit(0);
} else {
  console.log('[Alumnux Desktop] Release binary not found, compiling desktop app...');
  const runner = path.join(__dirname, 'tauri-runner.cjs');
  const child = spawn('node', [runner, 'build'], {
    cwd: path.resolve(__dirname, '..', 'apps', 'desktop'),
    stdio: 'inherit',
  });
  child.on('exit', (code) => {
    if (code === 0 && fs.existsSync(releaseBin)) {
      console.log(`[Alumnux Desktop] Launching compiled native binary: ${releaseBin}`);
      const app = spawn(releaseBin, [], { detached: true, stdio: 'ignore' });
      app.unref();
      process.exit(0);
    }
    process.exit(code ?? 1);
  });
}
