import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BrowserService } from "./browser/browser.service";
import { LessonsPersistencyService } from "./lessons-persistency/lessons-persistency.service";
import { LessonsScraperService } from "./lessons-scraper/lessons-scraper.service";

@Module({
  providers: [BrowserService, LessonsPersistencyService, LessonsScraperService],
  exports: [LessonsScraperService],
})
export class ScrapModule {}
