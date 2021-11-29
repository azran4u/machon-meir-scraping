import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TestService {
  constructor(private configService: ConfigService) {
    console.log(this.configService.get("scrap.baseUrl"));
  }
}
