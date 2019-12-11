import { DynamicModule, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Config, ConfigModule } from './config';
import { ApiModule } from './ports/api';

declare const module: {
  hot?: {
    accept(): void;
    dispose(callback: () => void): void;
  };
};

module?.hot?.accept();

@Module({
  imports: [ApiModule],
})
class ApiServerModule {
  static initialize(options?: { configFilePath?: string }): DynamicModule {
    return {
      module: ApiServerModule,
      imports: [ConfigModule.initialize(options?.configFilePath)],
    };
  }
}

async function bootstrap() {
  const app = await NestFactory.create(
    ApiServerModule.initialize({
      configFilePath: process.env.NODE_ENV !== 'production' ? '.env' : undefined,
    }),
  );

  module?.hot?.dispose?.(() => app.close());

  const config: Config = app.get(Config);
  await app.listen(config.env.PORT);
}

bootstrap().catch(error => {
  console.error(error);
  process.exit(1);
});
