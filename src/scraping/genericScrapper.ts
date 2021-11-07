import { Page } from "puppeteer";
import { getBrowser } from "./browser";

export async function genericScrapper<T>(
  url: string,
  f: (x: Page) => Promise<T>,
  retries: number = 3
): Promise<T> {
  for (let i = 1; 1 <= retries; i++) {
    try {
      console.log(`open url ${url}`);
      const browser = await getBrowser();
      let page = await browser.newPage();
      await page.goto(url);
      const res = await f(page);
      await page.close();
      return res;
    } catch (error) {
      console.error(`url: ${url} error: ${error}`);
    }
  }
}
