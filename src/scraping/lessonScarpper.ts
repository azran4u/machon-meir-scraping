import { Lesson } from "../model/lesson";
import { convertDate } from "./convertMonth";
import { genericScrapper } from "./genericScrapper";

export async function lessonScarpper(url: string): Promise<Lesson> {
  return genericScrapper(url, async (page) => {
    await page.waitForSelector(".jet-listing-grid__items[data-nav]");
    const mp3Url = await page.$eval('a[href$="mp3"]', (elm) => elm["href"]);
    const title = await page.$eval(
      "h1.elementor-heading-title.elementor-size-default",
      (elm) => elm["textContent"]
    );
    let tags: string[] = [];

    try {
      const keywords = await page.$eval(`a[href*="shiurim-tags"`, (elm) =>
        elm["textContent"].split(",").map((x) => x.trim())
      );
      tags = tags.concat(keywords);
    } catch (error) {}

    try {
      const series = await page.$eval(`a[href*="shiurim-series"`, (elm) =>
        elm["textContent"].split(",").map((x) => x.trim())
      );
      tags = tags.concat(series);
    } catch (error) {}

    const stringDate = await page.$eval(
      `span.elementor-icon-list-text.elementor-post-info__item`,
      (elm) => elm["textContent"]
    );
    const lessonUrl = await page.$eval(
      `link[rel=canonical][href*=meirtv]`,
      (elm) => elm["href"].split("/")
    );
    const id = lessonUrl[lessonUrl.length - 2];
    const date = convertDate(stringDate);

    return {
      date,
      url,
      mediaUrl: mp3Url,
      tags,
      title,
      id,
    };
  });
}
