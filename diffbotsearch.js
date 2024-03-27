require("dotenv").config();
const sdk = require("api")("@diffbot-2/v1.1#9i9y4qmlr6p26mz");
const diffbotApiKey = process.env.DIFFBOT_API_KEY;
class DiffbotWebSearch {
  async search(url) {
     url = 'https://www.google.com/search?q=biden+is+lost&scroll=slow';
const token = diffbotApiKey;
const apiUrl = `https://api.diffbot.com/v3/list?url=${encodeURIComponent(url)}&token=${token}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  }

  article(url) {
    sdk.auth(diffbotApiKey);
    return sdk
      .article({ url })
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
