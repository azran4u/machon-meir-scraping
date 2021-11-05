import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";
import { AppConfigService } from "../config";

export function loggerOptionsFactory(configService: AppConfigService) {
  const options: winston.LoggerOptions = {
    level: configService.getConfig().logger.level ?? "info",
    format: winston.format.json(),
    defaultMeta: { service: "app" } as LoggerMetadata,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),          
          nestWinstonModuleUtilities.format.nestLike("MyApp")
        ),
      }),
    ],
  };
  return options;
}

export interface LoggerMetadata {
  service: string;
}

export function childLogger(logger: winston.Logger, metadata: LoggerMetadata) {
  const child = logger.child({});
  child.defaultMeta = { ...logger.defaultMeta, ...metadata };
  return child;
}
