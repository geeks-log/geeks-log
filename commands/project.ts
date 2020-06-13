import path from 'path';
import { paths } from './paths';
import { readFileAsync, writeFileAsync } from './utils';

const PREV_VERSION_FILENAME = 'PREV_VERSION';

export interface Project {
  packageName: string;
  projectFolder: string;
  reviewCategory: string;
  versionPolicyName?: string;
  shouldPublish?: boolean;
}

interface RushConfig {
  projects: Project[];
}

interface PackageJson {
  version?: string;
}

export async function readDeploymentProjects() {
  const data = await readFileAsync(paths.rushConfig, 'utf8');
  const config = JSON.parse(data) as RushConfig;

  return config.projects.filter((p) => p.versionPolicyName === 'production');
}

export async function readProjectVersion(project: Project) {
  const { projectFolder } = project;
  const packagePath = path.resolve(paths.rootDir, projectFolder, 'package.json');

  const data = await readFileAsync(packagePath, 'utf8');
  const { version } = JSON.parse(data) as PackageJson;

  if (version == null) {
    throw new Error('"package.json"에 version이 명시되어 있지 않음');
  }

  return version;
}

export async function readPrevProjectVersion(project: Project) {
  const { projectFolder } = project;
  const filepath = path.resolve(paths.rootDir, projectFolder, PREV_VERSION_FILENAME);

  return await readFileAsync(filepath, 'utf8');
}

export async function writeProjectPrevVersion(project: Project) {
  const { projectFolder } = project;

  const prevVersion = await readProjectVersion(project);
  const filepath = path.resolve(paths.rootDir, projectFolder, PREV_VERSION_FILENAME);

  await writeFileAsync(filepath, prevVersion, 'utf8');

  return prevVersion;
}
