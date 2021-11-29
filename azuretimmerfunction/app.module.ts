import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { AppService } from "./app.service";
import { loggerOptionsFactory } from "./logger/logger";
import { configFactory } from "./config/config.factory";
import { ScrapModule } from "./scrap/scrap.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
    }),
    ScrapModule,
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
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
