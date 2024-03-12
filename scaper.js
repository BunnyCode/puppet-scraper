const puppeteer = require("puppeteer");

async function scrape(url) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // wait for '.quotes' only == first data init finsihed
  await page.waitForSelector(".quotes");

  // scroll to the bottom of the page
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });

  // wait for '#loading' has display: none
  await page.waitForSelector("#loading", { hidden: true });

  // wait for '.quotes'
  // and collect new quotes (.text, .author, .tags)
  const quotes = await page.evaluate(() => {
    const quotes = [];
    document.querySelectorAll(".quote").forEach((quote) => {
      quotes.push({
        text: quote.querySelector(".text").textContent,
        author: quote.querySelector(".author").textContent,
        tags: quote.querySelector(".tags").textContent,
      });
    });
    return quotes;
  });

  // Print out the quotes
  console.log(quotes);
  await browser.close();
}

module.exports = scrape;
