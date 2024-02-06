const getFile = require(".");
const fs = require("fs");

async function most_player_of_match_per_season(matchFilePath) {
  const matches = await getFile(matchFilePath);
  const res = matches.reduce((acc, match) => {
    if (!acc[match.season]) {
      acc[match.season] = {};
    }
    if (
      match["player_of_match"] !== "" &&
      !acc[match.season][match["player_of_match"]]
    ) {
      acc[match.season][match["player_of_match"]] = 0;
    }
    acc[match.season][match["player_of_match"]] += 1;
    return acc;
  }, {});

  const result = Object.keys(res).reduce((newRes, key) => {
    let betterBatsman = [];
    let counter = 0;
    Object.keys(res[key]).forEach((batsman) => {
      if (res[key][batsman] > counter) {
        counter = res[key][batsman];
        betterBatsman = [batsman];
      } else if (res[key][batsman] == counter) {
        betterBatsman.push(batsman);
      }
    });
    newRes[key] = betterBatsman;
    return newRes;
  }, {});
  return result;
}

module.exports = most_player_of_match_per_season;
