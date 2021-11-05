import { Browser } from "puppeteer";
import fetch from "node-fetch";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

export async function extractLessonsUrlsFromPage(
  url: string,
  browser: Browser
) {
  let page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  await page.goto(url);

  try {
    await page.waitForSelector(".jet-listing-grid__items[data-nav]");
    const res = await page.$$("div[data-post-id]");
    res.map((r) => r);
    let urls = await page.$$eval("div[data-post-id]", (links) =>
      links.map((link) => link.querySelector("a[href]").getAttribute("href"))
    );
    return urls;
  } catch (error) {
    console.log(error);
  }
}

export async function downloadfile(url: string, filename: string) {
  try {
    const streamPipeline = promisify(pipeline);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`unexpected response ${response.statusText}`);
    await streamPipeline(response.body, createWriteStream(`./${filename}`));
  } catch (error) {
    console.error(
      `cannot download or save file file ${url} filename ${filename}`
    );
  }
}
