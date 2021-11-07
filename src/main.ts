import { NestFactory } from "@nestjs/core";
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from "nest-winston";
import { Logger } from "winston";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";
import { AppConfigService } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const config = app.get(AppConfigService).getConfig();
  const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
  logger.info(`Start app`);
  const appService = app.get(AppService);
  await appService.start();
}
bootstrap();
