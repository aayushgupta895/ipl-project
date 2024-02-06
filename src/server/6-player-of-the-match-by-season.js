const getFile = require(".");
const fs = require("fs");

async function most_player_of_match_per_season(matchFilePath) {
  const matches = await getFile(matchFilePath);
  const res = {};
  for (let match of matches) {
    if (!res[match.season]) {
      res[match.season] = {};
    }
    if (
      match["player_of_match"] !== "" &&
      !res[match.season][match["player_of_match"]]
    ) {
      res[match.season][match["player_of_match"]] = 0;
    }
    res[match.season][match["player_of_match"]] += 1;
  }
  const newRes = {};
  for (let key in res) {
    let betterBatsman = [];
    let counter = 0;
    for (let batsman in res[key]) {
      if (res[key][batsman] > counter) {
        counter = res[key][batsman];
        betterBatsman = [batsman];
      } else if (res[key][batsman] == counter) {
        betterBatsman.push(batsman);
      }
    }
    newRes[key] = betterBatsman;
  }
  return newRes;
}
module.exports = most_player_of_match_per_season;

