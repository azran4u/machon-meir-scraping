import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { LessonsScraperService } from "./scrap/lessons-scraper/lessons-scraper.service";

@Injectable()
export class AppService {
  constructor(
    private lessonsScraperService: LessonsScraperService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
    this.logger.info(`AppService constructor`);
  }

  async start() {
    try {
      this.logger.info(`start scrapController`);
      await this.lessonsScraperService.scrapController();
    } catch (error) {
      this.logger.error(`cannot start scrap controller ${error}`);
      process.exit();
    }
  }
}
