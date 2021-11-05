import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Configuration } from "./config.factory";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  getConfig(): Configuration {
    return this.configService.get("config", { infer: true });
  }
}
