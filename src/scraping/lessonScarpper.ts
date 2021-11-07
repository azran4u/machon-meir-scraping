import { Lesson } from "../model/lesson";
import { convertDate } from "./convertMonth";
import { genericScrapper } from "./genericScrapper";
import * as _ from "lodash";

export async function lessonScarpper(url: string): Promise<Lesson | undefined> {
  return genericScrapper(url, async (page) => {
    await page.waitForSelector(".jet-listing-grid__items[data-nav]");

    let mp3Url: string;
    let title: string;
    let tags: string[] = [];
    let keywords: string[];
    let series: string[];
    let lessonUrl: string;
    let date: Date;
    let id: string;

    try {
      mp3Url = await page.$eval('a[href$="mp3"]', (elm) => elm["href"]);
    } catch (error) {
      console.error(`url ${url} has no mp3 file`);
      mp3Url = undefined;
    }

    try {
      title = await page.$eval(
        "h1.elementor-heading-title.elementor-size-default",
        (elm) => elm["textContent"]
      );
    } catch (error) {
      console.error(`url ${url} has no title`);
      title = undefined;
    }

    try {
      keywords = await page.$eval(`a[href*="shiurim-tags"`, (elm) =>
        elm["textContent"].split(",").map((x) => x.trim())
      );
      tags = tags.concat(keywords);
    } catch (error) {}

    try {
      series = await page.$eval(`a[href*="shiurim-series"`, (elm) =>
        elm["textContent"].split(",").map((x) => x.trim())
      );
      tags = tags.concat(series);
    } catch (error) {}

    try {
      const stringDate = await page.$eval(
        `span.elementor-icon-list-text.elementor-post-info__item`,
        (elm) => elm["textContent"]
      );
      date = convertDate(stringDate) ?? new Date();
    } catch (error) {}

    try {
      lessonUrl = await page.$eval(`link[rel=canonical][href*=meirtv]`, (elm) =>
        elm["href"].split("/")
      );
      id = lessonUrl[lessonUrl.length - 2];
    } catch (error) {
      lessonUrl = url;
    }

    const valid = !_.isNil(mp3Url) && !_.isNil(title);
    return {
      date,
      url,
      mediaUrl: mp3Url,
      tags,
      title,
      id,
      updatedAt: new Date(),
      valid,
    };
  });
}
