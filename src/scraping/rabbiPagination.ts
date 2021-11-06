import { genericScrapper } from "./genericScrapper";

export async function rabbiPagination(url: string) {
  return genericScrapper(url, async (page) => {
    await page.waitForSelector(".jet-listing-grid__items[data-nav]");
    const lastPageNumber = await page.$eval(
      "a.facetwp-page.last",
      (elm) => +elm["textContent"]
    );
    const pagesUrls: string[] = [];
    for (let i = 1; i <= lastPageNumber; i++) {
      pagesUrls.push(`${url}&_paged=${i}`);
    }
    return pagesUrls;
  });
}
