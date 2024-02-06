const getFile = require(".");
const fs = require("fs");

async function toss_and_match_winner(matchFilePath) {
  const matches = await getFile(matchFilePath);
  const result = matches.reduce((acc, match) => {
    if (!acc[match["winner"]] && match["result"] !== "no result") {
      acc[match["winner"]] = 0;
    }
    if (match["winner"] == match["toss_winner"]) {
      acc[match["winner"]] += 1;
    }
    return acc;
  }, {});
  return result;
}

module.exports = toss_and_match_winner;
