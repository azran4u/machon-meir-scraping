import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { AppService } from "./app.service";
import { AppConfigModule, AppConfigService } from "./config";
import { loggerOptionsFactory } from "./logger/logger";
import { ScrapModule } from './scrap/scrap.module';

@Module({
  imports: [
    AppConfigModule,
    WinstonModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        return loggerOptionsFactory(configService);
      },
      inject: [AppConfigService],
    }),
    ScrapModule,
  ],
  providers: [AppService]
})
export class AppModule {}
