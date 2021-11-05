import { Browser } from "puppeteer";
import fetch from "node-fetch";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

export async function lessonScarpper(url: string, browser: Browser) {
  try {
    let page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".jet-listing-grid__items[data-nav]");
    const mp3Url = await page.$eval('a[href$="mp3"]', (elm) => elm["href"]);
    const title = await page.$eval(
      "h1.elementor-heading-title.elementor-size-default",
      (elm) => elm["textContent"]
    );
    const tags = await page.$eval(
      `a[href*="shiurim-tags"`,
      (elm) => elm["textContent"]
    );
    debugger;
    // return link.getProperty("href");
  } catch (error) {
    console.log(error);
  }
}
