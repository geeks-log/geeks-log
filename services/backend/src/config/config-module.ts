import { Module, DynamicModule } from '@nestjs/common';
import { Config } from './config';

@Module({})
export class ConfigModule {
  static initialize(
    envOrFilePath: string | { [key: string]: string | undefined } = process.env,
  ): DynamicModule {
    const config =
      typeof envOrFilePath === 'string'
        ? Config.createFromEnvFile(envOrFilePath)
        : Config.create(envOrFilePath);

    return {
      module: ConfigModule,
      providers: [
        {
          provide: Config,
          useValue: config,
        },
      ],
      exports: [Config],
    };
  }
}
