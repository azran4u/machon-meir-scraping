import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from "nest-winston";
import { Logger } from "winston";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

export async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
    logger.info(`Start app`);
    const appService = app.get(AppService);
    await appService.start();
  } catch (error) {
    console.error(`nest factory error ${error}`);
    process.exit();
  }
}
bootstrap();
