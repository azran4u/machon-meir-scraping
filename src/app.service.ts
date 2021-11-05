import { Injectable } from "@nestjs/common";
import { startBrowser } from "./scraping/browser";
import { scrapeAll } from "./scraping/controller";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello world!";
  }

  async scrap() {
    const url = "https://meirtv.com/beth-hamidrash-search/?_rabbis=3988";

    //Start the browser and create a browser instance
    let browserInstance = await startBrowser();

    // Pass the browser instance to the scraper controller
    const res = await scrapeAll(url, browserInstance);
    console.log(res);
  }
}
