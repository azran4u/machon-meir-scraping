import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { LessonsScraperService } from "./scrap/lessons-scraper/lessons-scraper.service";
import { TestService } from "./test/test.service";

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private lessonsScraperService: LessonsScraperService,
    private testService: TestService
  ) {}

  async start() {
    try {
      this.logger.info(`start lessonsScraperService`);
      // await this.lessonsScraperService.scrapController();
    } catch (error) {
      this.logger.error(`cannot start scrap controller ${error}`);
    }
  }
}
