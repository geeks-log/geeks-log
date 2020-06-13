#!/usr/bin/env ts-node-script
import { readDeploymentProjects, writeProjectPrevVersion } from './project';

async function stageDeploy() {
  const projects = await readDeploymentProjects();

  for (const project of projects) {
    const version = await writeProjectPrevVersion(project);
    console.log(`[stage-deploy][${project.packageName}] 버전 기록 (${version})`);
  }
}

stageDeploy().catch((error) => {
  console.error(error);
  process.exit(1);
});
