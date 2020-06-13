import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../');

export const paths = {
  rootDir: ROOT_DIR,
  rushConfig: path.join(ROOT_DIR, 'rush.json'),
  messageFilename: path.join(ROOT_DIR, 'MESSAGE'),
} as const;
