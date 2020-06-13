import { spawn, SpawnOptions } from 'child_process';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

export const readFileAsync = promisify(readFile);
export const writeFileAsync = promisify(writeFile);

interface SpawnAsyncOptions {
  cwd?: string;
  env?: SpawnOptions['env'];
  onStdout?(data: Buffer): void;
  onStderr?(data: Buffer): void;
}

export function spawnAsync(
  command: string,
  args: ReadonlyArray<string>,
  options: SpawnAsyncOptions = {},
) {
  const { cwd, env, onStdout, onStderr } = options;

  return new Promise((resolve, reject) => {
    const task = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        ...env,
      },
    });

    task.stdout.on('data', (data) => {
      onStdout?.(data);
    });

    task.stderr.on('data', (data) => {
      onStderr?.(data);
    });

    task.on('close', (code) => {
      code !== 0 ? reject() : resolve();
    });
  });
}
