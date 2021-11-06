import { Page } from "puppeteer";
import { getBrowser } from "./browser";

export async function genericScrapper<T>(
  url: string,
  f: (x: Page) => Promise<T>
): Promise<T> {
  let error = true;
  while (error) {
    try {
      const browser = await getBrowser();
      let page = await browser.newPage();
      await page.goto(url);
      const res = await f(page);
      await page.close();
      error = false;
      return res;
    } catch (error) {
      console.error(`url: ${url} error: ${error}`);
      error = true;
    }
  }
}
