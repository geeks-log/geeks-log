import { spawnAsync } from './process';
import { GithubRegistryHttpClient, PackageNotFoundError } from './remotes';

interface ConstructOptions {
  packageScope: string;
  repository: {
    owner: string;
    name: string;
  };
  credentials: {
    username: string;
    token: string;
  };
}

interface BuildDockerImageOptions {
  /** @default . (Current directory) */
  pathOrUrl?: string;
  /** @default Dockerfile */
  dockerfile?: string;
  buildArgs?: {
    [key: string]: string | undefined;
  };
  spawnOptions?: {
    cwd?: string;
    silent?: boolean;
    failIfStderr?: boolean;
  };
}

interface PushDockerImageOptions {
  spawnOptions?: {
    cwd?: string;
    silent?: boolean;
    failIfStderr?: boolean;
  };
}

export class DockerPublisher {
  private readonly packageScope: string;
  private readonly repository: { owner: string; name: string };
  private readonly client: GithubRegistryHttpClient;

  constructor(options: ConstructOptions) {
    this.packageScope = options.packageScope;
    this.repository = options.repository;
    this.client = new GithubRegistryHttpClient({
      authToken: options.credentials.token,
    });
  }

  async buildDockerImage(packageName: string, version: string, options?: BuildDockerImageOptions) {
    const tag = this.createDockerImageTag(packageName, version);

    await spawnAsync(
      'docker',
      [
        'build',
        options?.pathOrUrl ?? '.',
        '-f',
        options?.dockerfile ?? 'Dockerfile',
        '-t',
        tag,
        ...this.buildArgsToArray(options?.buildArgs),
      ],
      options?.spawnOptions,
    );
  }

  async pushDockerImage(packageName: string, version: string, options?: PushDockerImageOptions) {
    const tag = this.createDockerImageTag(packageName, version);

    await spawnAsync('docker', ['push', tag], options?.spawnOptions);
  }

  parsePackageName(packageName: string) {
    const regExp = new RegExp(`@${this.packageScope}/(.+)`);
    const parsed = packageName.match(regExp);

    if (parsed === null) {
      throw new Error(`Package name is not scoped with ${this.packageScope}`);
    }

    const [, name] = parsed;

    return {
      scope: this.packageScope,
      name,
    };
  }

  createDockerImageTag(packageName: string, version: string) {
    const { name } = this.parsePackageName(packageName);

    return `docker.pkg.github.com/${this.repository.owner}/${this.repository.name}/${name}:${version}`;
  }

  async isDockerImageExists(packageName: string, version: string, options?: { size: number }) {
    const { name } = this.parsePackageName(packageName);
    const fetchOptions = {
      repository: this.repository,
      name,
      versionPage: options,
    };

    try {
      for await (const versions of this.client.fetchAllPackageVersionsForward(fetchOptions)) {
        if (versions.some(x => x.version === version)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      if (error instanceof PackageNotFoundError) {
        return false;
      }
      throw error;
    }
  }

  private buildArgsToArray(buildArgs: BuildDockerImageOptions['buildArgs'] = {}) {
    const args = [];

    for (const key of Object.keys(buildArgs)) {
      const value = buildArgs[key];

      if (value !== undefined) {
        args.push('--build-arg', `${key}=${value}`);
      }
    }

    return args;
  }
}
