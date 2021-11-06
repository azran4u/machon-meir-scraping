import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { startScrapping } from "./scraping/controller";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello world!";
  }

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  async scrap() {
    const url = "https://meirtv.com/beth-hamidrash-search/?_rabbis=3988";
    const res = await startScrapping(url, this.logger);
    console.log(res);
  }
}
