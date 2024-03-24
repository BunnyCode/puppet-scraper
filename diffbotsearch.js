require("dotenv").config();
const sdk = require("api")("@diffbot-2/v1.1#9i9y4qmlr6p26mz");
const diffbotApiKey = process.env.DIFFBOT_API_KEY;
class DiffbotWebSearch {
  search(url) {
    sdk.auth(diffbotApiKey);
    return sdk
      .extractAnalyze({ url })
      .then(({ data }) => {
        // Extract the data returned as a variable
        const extractedData = data;
        return extractedData;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
}

module.exports = DiffbotWebSearch;