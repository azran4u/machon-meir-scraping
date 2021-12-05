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

export function configFactory(): Configuration {
  return {
    logger: {
      level: process.env.LOGGER_LEVEL || "debug",
    },
    scrap: {
      filepath: process.env.SCRAP_FILEPATH || "./lessons.json",
      rabbiUrl:
        process.env.SCRAP_RABBI_URL ||
        "https://meirtv.com/beth-hamidrash-search/?_rabbis=3988",
      retries: parseInt(process.env.SCRAP_RETRIES, 10) || 3,
    },
  };
}
