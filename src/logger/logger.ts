import { format, Logger, LoggerOptions, transports } from "winston";
import { AppConfigService } from "../config";
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp, service }) => {
  return `${timestamp} [${service}] ${level}: ${message}`;
});

export function loggerOptionsFactory(configService: AppConfigService) {
  const options: LoggerOptions = {
    level: configService.getConfig().logger.level ?? "info",
    format: format.json(),
    defaultMeta: { service: "app" } as LoggerMetadata,
    transports: [
      new transports.Console({
        format: combine(timestamp(), colorize(), myFormat),
      }),
    ],
  };
  return options;
}

export interface LoggerMetadata {
  service: string;
}

export function childLogger(logger: Logger, metadata: LoggerMetadata) {
  const child = logger.child({});
  child.defaultMeta = { ...logger.defaultMeta, ...metadata };
  return child;
}
