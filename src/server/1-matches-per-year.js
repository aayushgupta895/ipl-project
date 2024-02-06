const getFile = require("./index");
const fs = require("fs");
async function matches_per_year(filePath) {
  const matches = await getFile(filePath);
  const perYear = {};
  for (let match of matches) {
    if (!perYear[match.season]) {
      perYear[match.season] = 1;
    }
    perYear[match.season] += 1;
  }
  return perYear;
}

module.exports = matches_per_year;


