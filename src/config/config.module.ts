import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configFactory } from "./config.factory";
import { AppConfigService } from "./config.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configFactory],
      cache: true,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
