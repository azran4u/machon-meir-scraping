import { NestFactory } from "@nestjs/core";
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from "nest-winston";
import path = require("path");
import { Logger } from "winston";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

export async function createApp() {
  try {
    const app = await NestFactory.create(AppModule);
    const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
    app.useLogger(logger);
    logger.info(`Start app`);
    const appService = app.get(AppService);
    return appService.start();
  } catch (error) {
    console.error(`nest factory error ${error}`);
  }
}
