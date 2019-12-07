import { GraphQLClient } from 'graphql-request';

interface ConstructOptions {
  authToken: string;
  headers?: {
    [key: string]: string;
  };
}

interface FetchRepositoryInfo {
  owner: string;
  name: string;
}

interface FetchPageInfo {
  after?: string;
  before?: string;
  /** @default 100 */
  size?: number;
}

interface FetchPackagesOptions {
  repository: FetchRepositoryInfo;
  page?: FetchPageInfo;
  name?: string;
  versionPage?: FetchPageInfo;
}

export class PackageNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class GithubRegistryHttpClient {
  private readonly client: GraphQLClient;

  constructor({ authToken, headers }: ConstructOptions) {
    this.client = new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        Authorization: `bearer ${authToken}`,
        Accept: 'application/vnd.github.packages-preview+json',
        ...headers,
      },
    });
  }

  async *fetchAllPackageVersionsForward(options: FetchPackagesOptions & { name: string }) {
    let nexCursor: string | undefined | null = options.versionPage?.after ?? undefined;

    while (nexCursor !== null) {
      const opts: FetchPackagesOptions = {
        ...options,
        versionPage: {
          ...options.versionPage,
          after: nexCursor,
        },
      };

      const response = await this.fetchPackages(opts);
      const {
        repository: { registryPackages },
      } = response;

      if (registryPackages.nodes.length === 0) {
        throw new PackageNotFoundError(`Cannot find package: ${options.name}`);
      }

      const pkg = registryPackages.nodes[0];
      nexCursor = pkg.versions.pageInfo.endCursor;

      yield pkg.versions.nodes;
    }

    return null;
  }

  async fetchPackages(options: FetchPackagesOptions) {
    const { repository, page = {}, name, versionPage = {} } = options;

    const scheme = `
    query fetchPackages(
      $owner: String!,
      $repo: String!,
      $after: String,
      $before: String,
      $size: Int!,
      $name: String,
      $versionAfter: String,
      $versionBefore: String,
      $versionSize: Int!
    ) {
      repository(owner: $owner, name: $repo) {
        registryPackages(
          after: $after,
          before: $before,
          first: $size,
          packageType: DOCKER,
          name: $name
        ) {
          totalCount,
          pageInfo {
            endCursor,
            hasNextPage,
            hasPreviousPage,
            startCursor
          },
          nodes {
            id,
            name,
            versions(
              after: $versionAfter,
              before: $versionBefore,
              first: $versionSize
            ) {
              totalCount,
              pageInfo {
                endCursor,
                hasNextPage,
                hasPreviousPage,
                startCursor
              },
              nodes {
                id,
                sha256,
                version
              }
            }
          }
        }
      }
    }
    `;

    return this.client.request<{
      repository: {
        registryPackages: {
          totalCount: number;
          pageInfo: {
            endCursor: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string | null;
          };
          nodes: Array<{
            id: string;
            name: string;
            versions: {
              totalCount: number;
              pageInfo: {
                endCursor: string | null;
                hasNextPage: boolean;
                hasPreviousPage: boolean;
                startCursor: string | null;
              };
              nodes: Array<{
                id: string;
                sha256: string;
                version: string;
              }>;
            };
          }>;
        };
      };
    }>(scheme, {
      owner: repository.owner,
      repo: repository.name,
      after: page.after,
      before: page.before,
      size: page.size ?? 100,
      name,
      versionAfter: versionPage.after,
      versionBefore: versionPage.before,
      versionSize: versionPage.size ?? 100,
    });
  }
}
