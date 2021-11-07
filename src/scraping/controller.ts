import { Logger } from "winston";
import { Lesson } from "../model/lesson";
import { getBrowser } from "./browser";
import { lessonScarpper } from "./lessonScarpper";
import { rabbiPagination } from "./rabbiPagination";
import { extractLessonsUrlsFromRabbiPage } from "./rabbiScrapper";
import { readLessonsFromFile } from "./readLessonsFromFile";
import { saveLessonsToFile } from "./saveLessonsToFile";
import { updateLessons } from "./updateLessons";

export async function startScrapping(url: string, logger: Logger) {
  try {
    const lessons: Lesson[] = await readLessonsFromFile();
    // await updateLessons(lessons);
    const pageUrls = await rabbiPagination(url);
    for (let page of pageUrls) {
      const lessonsUrls = await extractLessonsUrlsFromRabbiPage(page);
      for (let lessonUrl of lessonsUrls) {
        if (lessons.find((x) => x.url === lessonUrl)) {
          logger.info(`${lessonUrl} already exists`);
          continue;
        }
        const lesson = await lessonScarpper(lessonUrl);
        if (!lesson.valid) {
          logger.info(`${lessonUrl} is invalid`);
        }
        lessons.push(lesson);
        await saveLessonsToFile(lessons);
        logger.info(`${page} ${lesson.id} saved to file`);
      }
    }
    const browser = await getBrowser();
    await browser.close();
  } catch (err) {
    console.error("Could not resolve the browser instance => ", err);
  }
}
