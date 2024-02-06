const fs = require("fs");
const getFile = require(".");

async function matches_won_per_team_per_year(matchFilePath) {
  const matches = await getFile(matchFilePath);
  const res = matches.reduce((result, match) => {
    if (!result[match.season]) {
      result[match.season] = {};
    }
    if (result[match.season][match.winner]) {
      result[match.season][match.winner] += 1;
    } else {
      result[match.season][match.winner] = 1;
    }
    return result;
  }, {});
  return res;
}


module.exports = matches_won_per_team_per_year;
