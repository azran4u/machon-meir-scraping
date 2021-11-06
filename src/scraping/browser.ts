import * as puppeteer from "puppeteer";
import { Browser } from "puppeteer";

let browser: Browser = undefined;
export async function getBrowser() {
  if (browser) return browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.error("Could not create a browser instance => : ", err);
    browser = undefined;
  }
  return browser;
}
