const puppeteer = require("puppeteer");

async function searchGoogle(query) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  await page.goto(searchUrl);
  await page.waitForSelector('#search');

  // Extract the URL of the first search result.
  const firstResultUrl = await page.evaluate(() => {
      const firstResult = document.querySelector('.tF2Cxc a');
      return firstResult ? firstResult.href : null;
  });

  if (firstResultUrl) {
      console.log(`Navigating to first result: ${firstResultUrl}`);
      await page.goto(firstResultUrl, { waitUntil: 'networkidle0' });

      const content = await page.evaluate(() => {
          const paragraph = document.querySelector('*');
          return paragraph ? paragraph.innerText : 'No content found';
      });

      console.log(`Content from the site: ${content}`);
  } else {
      console.log("Failed to find the first result's URL.");
  }

  await browser.close();
}

module.exports = searchGoogle;
