require("dotenv").config();
const sdk = require("api")("@diffbot-2/v1.1#9i9y4qmlr6p26mz");
const DiffbotSearch = require("./diffbotsearch");
const diffSearch = new DiffbotSearch();

const diffbotApiKey = process.env.DIFFBOT_API_KEY;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function searchWithDiff(query) {
  sdk.auth(diffbotApiKey);
  const fixedQuery = query.split(" ").join("+");
  const firstResultUrl = await diffSearch.search(
    `https://www.google.com/search?q=${fixedQuery}`
  );

  let choice = -1;

  if (firstResultUrl) {
    console.log(`Getting Results`);

    console.log(firstResultUrl);
    const arrLen = firstResultUrl.objects[0].items.length;
    const adjustedLen = arrLen > 5 ? 5 : arrLen;
    const topFiveHits = firstResultUrl.objects[0].items.slice(0, adjustedLen);

    console.log(topFiveHits);

    // change for GPT reply in thread. once integrating.
    readline.question("What article", (number) => {
      choice = number;
      readline.close();
    });

    if (choice >= 0 <= adjustedLen) {
      console.log(firstResultUrl.objects[0].items[choice]);
    }
  } else {
    console.log("Failed to find the first result's URL.");
  }

  // await browser.close();
}

module.exports = searchWithDiff;
