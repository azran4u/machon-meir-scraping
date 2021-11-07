import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { LessonsScraperService } from "./scrap/lessons-scraper/lessons-scraper.service";

@Injectable()
export class AppService {  

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private lessonsScraperService: LessonsScraperService
  ) {}

  async start() {
    try {
      await this.lessonsScraperService.scrapController();
    } catch (error) {
      this.logger.error(`cannot start scrap controller ${error}`);
    }

    // const url = "https://meirtv.com/beth-hamidrash-search/?_rabbis=3988";
    // const res = await startScrapping(url, this.logger);
    // console.log(res);
  }
}
