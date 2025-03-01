import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  PASARELA_API_KEY: string;
  PASARELA_URL: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    PASARELA_API_KEY: joi.string().required(),
    PASARELA_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error)
  throw new Error(
    `Error en configuración de variables de entorno: ${error.message}`,
  );

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  pasarelaApiKey: envVars.PASARELA_API_KEY,
  pasarelaUrl: envVars.PASARELA_URL
};
