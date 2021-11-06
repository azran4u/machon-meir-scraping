import { genericScrapper } from "./genericScrapper";

export async function extractLessonsUrlsFromRabbiPage(url: string) {
  return genericScrapper(url, async (page) => {
    await page.waitForSelector(".jet-listing-grid__items[data-nav]");
    const res = await page.$$("div[data-post-id]");
    res.map((r) => r);
    let urls = await page.$$eval("div[data-post-id]", (links) =>
      links.map((link) => link.querySelector("a[href]").getAttribute("href"))
    );
    return urls;
  });
}
