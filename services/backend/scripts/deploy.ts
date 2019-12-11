import * as path from 'path';
import * as fs from 'fs';
import { DockerPublisher } from '@geeks-log/docker-publisher';

const publisher = new DockerPublisher({
  packageScope: 'geeks-log',
  repository: {
    owner: 'geeks-log',
    name: 'geeks-log',
  },
  credentials: {
    username: 'seokju-na',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    token: process.env.GITHUB_TOKEN!,
  },
});

const rootPath = process.env.ROOT_PATH ?? path.resolve(process.cwd(), '../../');
const dockerfile = path.resolve(process.cwd(), 'Dockerfile');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')) as {
  name: string;
  version: string;
};

async function deploy() {
  const { name: packageName, version: packageVersion } = pkg;

  if (await publisher.isDockerImageExists(packageName, packageVersion)) {
    console.log(`Docker image(${pkg.name}@${pkg.version}) is already exists.`);
    return;
  }

  await publisher.buildDockerImage(packageName, packageVersion, {
    pathOrUrl: rootPath,
    dockerfile,
    buildArgs: {
      SERVICE_PATH: path.relative(process.cwd(), rootPath),
    },
    spawnOptions: {
      cwd: rootPath,
    },
  });

  await publisher.pushDockerImage(packageName, packageVersion, {
    spawnOptions: {
      cwd: rootPath,
    },
  });
}

deploy().catch(error => {
  console.error(error?.message ?? 'Unknown error');
  process.exit(1);
});
