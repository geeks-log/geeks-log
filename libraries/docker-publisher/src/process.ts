import { spawn } from 'child_process';

interface SpawnOptions {
  cwd?: string;
  /** @default false */
  silent?: boolean;
  env?: {
    [key: string]: string;
  };
  /** @default false */
  failIfStderr?: boolean;
  stdin?: Buffer;
  /** @default 'utf8' */
  stdinEncoding?: string;
}

export function spawnAsync(command: string, args: ReadonlyArray<string>, options?: SpawnOptions) {
  return new Promise<void>((resolve, reject) => {
    let hasStderr = false;
    const task = spawn(command, args, {
      cwd: options?.cwd,
      env: options?.env,
    });

    if (options?.stdin != null) {
      task.stdin.write(options.stdin, options.stdinEncoding ?? 'utf8');
      task.stdin.end();
    }

    task.stdout.on('data', data => {
      if (!options?.silent) {
        process.stdout.write(data);
      }
    });

    task.stderr.on('data', data => {
      if (!options?.silent) {
        process.stderr.write(data);
      }
      hasStderr = true;
    });

    task.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Error code: ${code}`));
      } else if (hasStderr && options?.failIfStderr) {
        reject(new Error('Stderr exists.'));
      } else {
        resolve();
      }
    });
  });
}
