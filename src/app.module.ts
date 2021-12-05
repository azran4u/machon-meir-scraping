import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { AppService } from "./app.service";
import { loggerOptionsFactory } from "./logger/logger";
import { configFactory } from "./config/config.factory";
import { ScrapModule } from "./scrap/scrap.module";
import path = require("path");
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configFactory],
    }),
    ScrapModule,
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const logfilepath = path.join(__dirname, "logs", "app.log");
        console.log(`log file path ${logfilepath}`);
        return loggerOptionsFactory(
          configService.get("logger.level", { infer: true })
        );
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
