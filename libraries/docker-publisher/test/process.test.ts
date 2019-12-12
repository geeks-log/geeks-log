import path from 'path';
import { spawnAsync } from '../src/process';

const getFixtureScriptPath = (scriptName: string) =>
  path.resolve(__dirname, 'fixtures/', scriptName);

describe('process', () => {
  describe('spawnAsync', () => {
    let mockStdout: NodeJS.WriteStream;
    let mockStderr: NodeJS.WriteStream;

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Mock = jest.fn<NodeJS.WriteStream, any>();

      mockStdout = new Mock();
      mockStdout.write = jest.fn();

      mockStderr = new Mock();
      mockStderr.write = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should not throw error if sub process closed with code 0.', async () => {
      let error = null;

      try {
        await spawnAsync('node', [getFixtureScriptPath('success.js')]);
      } catch (err) {
        error = err;
      }

      expect(error).toBeNull();
    });

    it('should throw error if sub process closed with non code 0.', async () => {
      let error = null;

      try {
        await spawnAsync('node', [getFixtureScriptPath('fail.js')]);
      } catch (err) {
        error = err;
      }

      expect(error).not.toBeNull();
      expect(error instanceof Error).toBe(true);
      expect(error?.message).toMatch(/Error code: 1/);
    });

    it('should emit stdout with given environment variables.', async () => {
      await spawnAsync('node', [getFixtureScriptPath('env.js')], {
        stdout: mockStdout,
        env: {
          ...process.env,
          ENV_1: 'a',
          ENV_2: 'b',
          ENV_3: 'c',
        },
      });

      expect(mockStdout.write).toHaveBeenCalledTimes(3);
      expect(mockStdout.write).toHaveBeenNthCalledWith(1, Buffer.from('ENV_1 a'));
      expect(mockStdout.write).toHaveBeenNthCalledWith(2, Buffer.from('ENV_2 b'));
      expect(mockStdout.write).toHaveBeenNthCalledWith(3, Buffer.from('ENV_3 c'));
    });

    it('should emit stderr.', async () => {
      await spawnAsync('node', [getFixtureScriptPath('success-with-stderr.js')], {
        stderr: mockStderr,
      });

      expect(mockStderr.write).toHaveBeenCalledWith(Buffer.from('stderr'));
    });

    it('should throw error if "failIfStderr" options is enabled.', async () => {
      let error = null;

      try {
        await spawnAsync('node', [getFixtureScriptPath('success-with-stderr.js')], {
          stderr: mockStderr,
          failIfStderr: true,
        });
      } catch (err) {
        error = err;
      }

      expect(error).not.toBeNull();
      expect(error instanceof Error).toBe(true);
      expect(error?.message).toMatch(/Stderr exists\./);
    });
  });
});
