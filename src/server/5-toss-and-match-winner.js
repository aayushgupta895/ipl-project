const getFile = require(".");
const fs = require("fs");

async function toss_and_match_winner(matchFilePath) {
  const matches = await getFile(matchFilePath);
  const result = {};
  for (let match of matches) {
    if (!result[match["winner"]] && match["result"] !== "no result") {
      result[match["winner"]] = 0;
    }
    if (match["winner"] == match["toss_winner"]) {
      result[match["winner"]] += 1;
    }
  }
  return result;
}
module.exports = toss_and_match_winner;

