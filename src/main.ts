import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from "nest-winston";
import { Logger } from "winston";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

export async function bootstrap() {
  console.log(`about to start nest factory`);
  let app: INestApplication;
  try {
    app = await NestFactory.create(AppModule);
  } catch (error) {
    console.error(`nest factory error ${error}`);
    process.exit(-1);
  }
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const level = app.get(ConfigService).get("logger.level");
  console.log(level);
  const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
  logger.info(`Start app`);
  const appService = app.get(AppService);
  await appService.start();
}
bootstrap();
