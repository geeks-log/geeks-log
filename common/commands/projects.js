const path = require('path');
const { readFileAsync, writeFileAsync } = require('./util');

const PREV_VERSION_FILENAME = 'PREV_VERSION';

async function readApplicationProjects() {
  const data = await readFileAsync(path.resolve(process.cwd(), 'rush.json'), 'utf8');
  const config = JSON.parse(data);

  return config.projects.filter(p => p.reviewCategory === 'application');
}

async function readProjectVersion(project) {
  const { projectFolder } = project;
  const packagePath = path.resolve(process.cwd(), projectFolder, 'package.json');

  const data = await readFileAsync(packagePath, 'utf8');
  return JSON.parse(data).version;
}

async function readPrevProjectVersion(project) {
  const { projectFolder } = project;
  const filepath = path.resolve(process.cwd(), projectFolder, PREV_VERSION_FILENAME);

  return await readFileAsync(filepath, 'utf8');
}

async function writeProjectPrevVersion(project) {
  const { projectFolder } = project;

  const prevVersion = await readProjectVersion(project);
  const filepath = path.resolve(process.cwd(), projectFolder, PREV_VERSION_FILENAME);

  await writeFileAsync(filepath, prevVersion, 'utf8');

  return prevVersion;
}

module.exports = {
  PREV_VERSION_FILENAME,
  readApplicationProjects,
  readProjectVersion,
  readPrevProjectVersion,
  writeProjectPrevVersion
};
