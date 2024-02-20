const fs = require("fs");
const getFile = require(".");

async function matches_won_per_team_per_year(matchFilePath) {
  const matches = await getFile(matchFilePath);
  let res = matches.reduce((acc, curr) => {
    if(curr.winner == "") return acc;
    acc[curr.winner] = !acc[curr.winner] ? {} : acc[curr.winner];
    acc[curr.winner][curr.season] = !acc[curr.winner][curr.season]
      ? 1
      : acc[curr.winner][curr.season] + 1;
    return acc;
  }, {});
  return res;
}


module.exports = matches_won_per_team_per_year;
