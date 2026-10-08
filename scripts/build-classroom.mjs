import { spawnSync } from 'node:child_process';

// Keep the verified Pages build in dist; make an independent root-path backup.
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(command, ['run','build'], {
  stdio: 'inherit', env: {...process.env, VITE_BASE_PATH:'/',VITE_OUTPUT_DIR:'classroom'},
  shell: process.platform === 'win32',
});
if (result.status !== 0) process.exit(result.status || 1);
console.log('Classroom backup: serve classroom with any local HTTP server. Open / at that server.');
