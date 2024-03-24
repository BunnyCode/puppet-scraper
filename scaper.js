require("dotenv").config();
const sdk = require("api")("@diffbot-2/v1.1#9i9y4qmlr6p26mz");
const DiffbotSearch = require("./diffbotsearch");
const diffSearch = new DiffbotSearch();

const diffbotApiKey = process.env.DIFFBOT_API_KEY;

async function searchWithDiff(query) {
  sdk.auth(diffbotApiKey);
  const firstResultUrl = await diffSearch.search(
    "https://www.google.com/search?q=alexei+navalny+died+in+prison"
  );

  if (firstResultUrl) {
    console.log(`Navigating to first result: ${firstResultUrl}`);

    console.log(firstResultUrl);
  } else {
    console.log("Failed to find the first result's URL.");
  }

  // await browser.close();
}

module.exports = searchWithDiff;
