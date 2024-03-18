require('dotenv').config();
const puppeteer = require("puppeteer");
const sdk = require('api')('@diffbot-2/v1.1#9i9y4qmlr6p26mz');

async function searchGoogle(query) {
  const diffbotApiKey = process.env.DIFFBOT_API_KEY
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

      sdk.auth(diffbotApiKey);
      sdk.article({
        url: firstResultUrl
      })
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));

      // console.log(`Content from the site: ${content}`);
  } else {
      console.log("Failed to find the first result's URL.");
  }

  await browser.close();
}

module.exports = searchGoogle;
