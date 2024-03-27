require("dotenv").config();
const sdk = require("api")("@diffbot-2/v1.1#9i9y4qmlr6p26mz");
const DiffbotSearch = require("./diffbotsearch");
const diffSearch = new DiffbotSearch();

const diffbotApiKey = process.env.DIFFBOT_API_KEY;
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

async function searchWithDiff(query) {
  sdk.auth(diffbotApiKey);

  const topResultsUrl = await diffSearch.search(
    `https://www.google.com/search?q=${query}`
  );

  console.log('topResultsUrl', topResultsUrl);
  // console.log('firstResultUrl', firstResultUrl);

  // let choice = 0;

  // if (firstResultUrl) {
  //   console.log(`Getting Results`);

  //   console.log(firstResultUrl);
  //   const arrLen = firstResultUrl.objects[0].items.length;
  //   const adjustedLen = arrLen > 5 ? 5 : arrLen;

  const randomIndex = Math.floor(Math.random() * 5); // 0 to 4

  const chosenArticle = topResultsUrl[randomIndex].link

    // console.log('topFiveHits', topFiveHits);

    // // change for GPT reply in thread. once integrating.
    // await readline.question("What article", (number) => {
    //   choice = number;
    //   readline.close();
    // });

    // if (0 <= choice <= adjustedLen) {
      // const url = firstResultUrl.objects[0].items[0].link;
      // const encodedUrl = encodeURI(url);
      // console.log("\n\n\n")
      // console.log(encodedUrl)
      // console.log("\n\n\n")

      console.log('chosenArticle', chosenArticle);
      const article = await diffSearch.article(
        chosenArticle
        );
      console.log('article', article);
  //   }
  // } else {
  //   console.log("Failed to find the first result's URL.");
  // }

  // await browser.close();
}

module.exports = searchWithDiff;
