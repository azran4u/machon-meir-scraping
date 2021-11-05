import { Browser } from "puppeteer";
import { lessonScarpper } from "./lesson";
import { extractLessonsUrlsFromPage, downloadfile } from "./rabbiScrapper";

export async function scrapeAll(url: string, browserInstance: Browser) {
  let browser;
  try {
    browser = await browserInstance;
    // await downloadfile("");
    const u = await lessonScarpper(
      "https://meirtv.com/shiurim/197699/",
      browser
    );
    debugger;
    // const urls = await extractLessonsUrlsFromPage(url, browser);
    // return urls;
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}
