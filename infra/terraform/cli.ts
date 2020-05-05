#!/usr/bin/env node

import { spawnSync } from 'child_process';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config({
  path: path.resolve(__dirname, '../.env'),
});

const { TF_TOKEN } = process.env;
const cmd = process.argv[2];
const tfConfigFilePath = path.resolve(__dirname, '.terraformrc');

let terraformCmd: string;
const args: string[] = [];

switch (cmd) {
  case 'init':
    terraformCmd = 'init';
    break;
  case 'test':
    terraformCmd = 'plan';
    break;
  case 'deploy':
    terraformCmd = 'apply';
    args.push('-auto-approve');
    break;
  default:
    throw new Error(`Unexpected command: ${cmd}`);
}

const tfConfig = `credentials "app.terraform.io" {
  token = "${TF_TOKEN}"
}`;

fs.writeFileSync(tfConfigFilePath, tfConfig, { encoding: 'utf8' });

const { status } = spawnSync('terraform', [terraformCmd, ...args], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    TF_INPUT: 'false',
    TF_CLI_CONFIG_FILE: tfConfigFilePath,
  },
});

process.exit(status ?? 0);
