import { format, Logger, LoggerOptions, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, service }) => {
  return `${timestamp} [${service}] ${level}: ${message}`;
});

export function loggerOptionsFactory(level: string) {
  const options: LoggerOptions = {
    level: level ?? "info",
    defaultMeta: { service: "app" } as LoggerMetadata,
    transports: [
      new transports.Console({
        format: combine(timestamp(), myFormat),
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
