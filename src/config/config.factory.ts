import { ConfigFactory } from "@nestjs/config";

export interface DatabaseConfig {
  url: string;
}
export interface LoggerConfig {
  level: string;
}
export interface Configuration {
  port: number;
  database: DatabaseConfig;
  logger: LoggerConfig;
}

export interface EnvConfig {
  dev: Configuration;
  int: Configuration;
  prod: Configuration;
}

const commonConfig: Configuration = {
  port: 3000,
  database: {
    url: "mongodb://localhost:27017/test",
  },
  logger: {
    level: "info",
  },
};

const environment: EnvConfig = {
  dev: commonConfig,
  int: commonConfig,
  prod: commonConfig,
};

export const configFactory: ConfigFactory<{ config: Configuration }> = () => {
  const logger = console;
  const env = process.env.NODE_ENV ?? "dev";
  const config = environment[env];
  if (config) {
    logger.log(`found config for ${env} env`);
  } else {
    logger.error(
      `cannot find configuration for ${env}, probably NODE_ENV is set incorrectly NODE_ENV = ${process.env.NODE_ENV}. Aborting..`
    );
    process.exit(-1);
  }
  return { config };
};
