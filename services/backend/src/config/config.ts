import dotenv from 'dotenv';
import { ConfigInvalidException } from './exceptions';
import { ConfigEnv, configEnvSchema } from './types';

export class Config {
  public readonly env: ConfigEnv;

  static create(env: { [key: string]: string | undefined }) {
    const { error, value } = configEnvSchema.validate(env);

    if (error) {
      throw new ConfigInvalidException(`Config validation error: ${error.message}`);
    }

    return new Config(value as ConfigEnv);
  }

  static createFromEnv() {
    const { NODE_ENV, PORT } = process.env;

    return Config.create({ NODE_ENV, PORT });
  }

  static createFromEnvFile(envFilePath?: string) {
    dotenv.config(envFilePath ? { path: envFilePath } : undefined);

    return Config.createFromEnv();
  }

  constructor(env: ConfigEnv) {
    this.env = env;
  }

  get isProduction() {
    return this.env.NODE_ENV === 'development';
  }

  get isTest() {
    return this.env.NODE_ENV === 'test';
  }
}
