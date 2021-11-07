import { ConfigFactory } from "@nestjs/config";

export interface ScrapConfig {
  filepath: string;
  rabbiUrl: string;
  retries: number;
}
export interface LoggerConfig {
  level: string;
}
export interface Configuration {
  logger: LoggerConfig;
  scrap: ScrapConfig;
}

const commonConfig: Configuration = {
  logger: {
    level: process.env.LOGGER_LEVEL || "info",
  },
  scrap: {
    filepath: process.env.SCRAP_FILEPATH || "./lessons.json",
    rabbiUrl:
      process.env.SCRAP_RABBI_URL ||
      "https://meirtv.com/beth-hamidrash-search/?_rabbis=3988",
    retries: +process.env.SCRAP_RETRIES || 3,
  },
};

export const configFactory: ConfigFactory<{ config: Configuration }> = () => {
  return { config: commonConfig };
};
