import { Logger } from "winston";
import { Lesson } from "../model/lesson";
import { getBrowser } from "./browser";
import { lessonScarpper } from "./lessonScarpper";
import { rabbiPagination } from "./rabbiPagination";
import { extractLessonsUrlsFromRabbiPage } from "./rabbiScrapper";
import { saveLessonsToFile } from "./saveLessonsToFile";

export async function startScrapping(url: string, logger: Logger) {
  try {
    const lessons: Lesson[] = [];
    const pageUrls = await rabbiPagination(url);
    for (let page of pageUrls) {
      const lessonsUrls = await extractLessonsUrlsFromRabbiPage(page);
      for (let lessonUrl of lessonsUrls) {
        const lesson = await lessonScarpper(lessonUrl);
        lessons.push(lesson);
        await saveLessonsToFile(lessons);
        logger.info(`${page} ${lesson.id}`);
      }
    }
    const browser = await getBrowser();
    await browser.close();
  } catch (err) {
    console.error("Could not resolve the browser instance => ", err);
  }
}
