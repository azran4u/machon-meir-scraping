import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { AppService } from "./app.service";
import { loggerOptionsFactory } from "./logger/logger";
import { configFactory } from "./config/config.factory";
import { ScrapModule } from "./scrap/scrap.module";
import { TestModule } from "./test/test.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configFactory],
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return loggerOptionsFactory(
          configService.get("logger.level", { infer: true })
        );
      },
      inject: [ConfigService],
    }),
    TestModule,
    // ScrapModule,
  ],
  providers: [AppService],
})
export class AppModule {}
