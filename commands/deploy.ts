#!/usr/bin/env ts-node-script
import path from 'path';
import { paths } from './paths';
import {
  Project,
  readDeploymentProjects,
  readPrevProjectVersion,
  readProjectVersion,
} from './project';
import { spawnAsync } from './utils';

async function createDeployTask(project: Project) {
  const { packageName, projectFolder } = project;

  await spawnAsync('npm', ['run', 'deploy'], {
    cwd: path.join(paths.rootDir, projectFolder),
    env: {
      ROOT_PATH: paths.rootDir,
      MESSAGE_FILENAME: paths.messageFilename,
      RUSH_CONFIG: paths.rushConfig,
    },
    onStdout(data) {
      console.log(`[deploy][${packageName}] ${data.toString('utf8')}`);
    },
    onStderr(data) {
      console.warn(`[deploy][${packageName}] ${data.toString('utf8')}`);
    },
  });
}

async function readAllPrevProjectsVersion(projects: Project[]) {
  const versions: Record<string, string> = {};

  for (const project of projects) {
    versions[project.packageName] = await readPrevProjectVersion(project);
  }

  return versions;
}

async function readNextProjectsVersion(projects: Project[]) {
  const versions: Record<string, string> = {};

  for (const project of projects) {
    versions[project.packageName] = await readProjectVersion(project);
  }

  return versions;
}

async function deploy() {
  const projects = await readDeploymentProjects();

  const prevVersions = await readAllPrevProjectsVersion(projects);
  const nextVersions = await readNextProjectsVersion(projects);

  const projectsToDeploy = projects.filter(({ packageName }) => {
    const prevVersion = prevVersions[packageName];
    const nextVersion = nextVersions[packageName];

    return prevVersion !== nextVersion;
  });

  if (projectsToDeploy.length === 0) {
    console.log('[deploy] Nothing to deploy');
    return;
  }

  let hasError = false;

  for (const project of projectsToDeploy) {
    const { packageName } = project;
    const prevVersion = prevVersions[packageName];
    const nextVersion = nextVersions[packageName];

    console.log(`[deploy][${packageName}] Deploy start (${prevVersion} -> ${nextVersion})`);
    try {
      await createDeployTask(project);
      console.log(`[deploy][${packageName}] Deploy complete (${prevVersion} -> ${nextVersion})`);
    } catch (error) {
      hasError = true;
      console.log(`[deploy][${packageName}] Deploy fail (${prevVersion} -> ${nextVersion})`);
    }
  }

  return hasError;
}

deploy().then((errorCaught) => {
  if (errorCaught) {
    process.exit(1);
  }
});
