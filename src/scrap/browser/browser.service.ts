import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Browser } from "puppeteer";
const puppeteer = require("puppeteer");
@Injectable()
export class BrowserService {
  private browser: Browser = undefined;

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  public async getBrowser() {
    if (this.browser) return this.browser;
    try {
      this.logger.info("Opening the browser......");
      this.browser = await puppeteer.launch({
        headless: true,
        timeout: 60000,
        devtools: true,
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
      });
    } catch (err) {
      this.logger.error("Could not create a browser instance ", err);
      process.exit();
    }
    return this.browser;
  }
}
