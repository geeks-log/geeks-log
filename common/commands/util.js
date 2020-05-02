const { promisify } = require('util');
const fs = require('fs');
const { spawn } = require('child_process');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const noop = () => {
};

function spawnAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const { cwd, env, onStdout = noop, onStderr = noop } = options;
    const task = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        ...env
      }
    });

    task.stdout.on('data', data => {
      onStdout(data);
    });

    task.stderr.on('data', data => {
      onStderr(data);
    });

    task.on('close', code => {
      if (code !== 0) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  readFileAsync,
  writeFileAsync,
  spawnAsync,
};
