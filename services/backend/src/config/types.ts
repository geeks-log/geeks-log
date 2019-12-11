import Joi from '@hapi/joi';

export type ConfigEnv = Readonly<{
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
}>;

export const configEnvSchema = Joi.object<ConfigEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number()
    .required()
    .default(5000),
});
