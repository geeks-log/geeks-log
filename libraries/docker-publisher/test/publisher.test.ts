import { DockerPublisher } from '../src';

describe('DockerPublisher', () => {
  const publisher = new DockerPublisher({
    packageScope: 'geeks-log',
    repository: {
      owner: 'geeks-log',
      name: 'test-packages-fixture',
    },
    credentials: {
      username: 'seokju-na',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      token: process.env.GITHUB_TOKEN!,
    },
  });

  describe('parsePackageName', () => {
    it('should throw if package name if not scoped.', () => {
      expect(() => publisher.parsePackageName('geeks-log-test')).toThrowError(
        /Package name is not scoped with/,
      );

      expect(() => publisher.parsePackageName('@other/test')).toThrowError(
        /Package name is not scoped with/,
      );
    });

    it('should parse package name.', () => {
      expect(publisher.parsePackageName('@geeks-log/test')).toEqual({
        scope: 'geeks-log',
        name: 'test',
      });
    });
  });

  describe('createDockerImageTag', () => {
    it('should create docker image tag.', () => {
      expect(publisher.createDockerImageTag('@geeks-log/test', '1.0.0')).toEqual(
        'docker.pkg.github.com/geeks-log/test-packages-fixture/test:1.0.0',
      );
    });
  });

  describe('isDockerImageExists', () => {
    it('should return true if version exists.', async () => {
      expect(await publisher.isDockerImageExists('@geeks-log/test', '0.0.0')).toBe(true);
    });

    it('should return false if version not exists.', async () => {
      expect(await publisher.isDockerImageExists('@geeks-log/test', 'this_is_not_version')).toBe(
        false,
      );
    });

    it('should paginate it.', async () => {
      expect(await publisher.isDockerImageExists('@geeks-log/test', '0.0.0', { size: 1 })).toBe(
        true,
      );
    });

    it('should return false if package not exists.', async () => {
      expect(await publisher.isDockerImageExists('@geeks-log/not-exists-package', '0.0.0')).toBe(
        false,
      );
    });
  });
});
