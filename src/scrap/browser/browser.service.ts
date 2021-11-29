import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import * as puppeteer from "puppeteer";
@Injectable()
export class BrowserService {
  private browser: puppeteer.Browser = undefined;

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
    this.logger.info(`start BrowserService`);
  }

  public async getBrowser() {
    if (this.browser) return this.browser;
    try {
      this.logger.info("Opening the browser......");
      this.browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
      });
    } catch (err) {
      this.logger.error("Could not create a browser instance => : ", err);
      process.exit();
    }
    return this.browser;
  }
}
