const fs = require("fs");
const getFile = require(".");
const { get_the_ids } = require("./get-ids-by-year");

async function economical_bowler_by_year(
  matchesFilePath,
  deliveryFilePath,
  year
) {
  const matches = await getFile(matchesFilePath);
  const delivery = await getFile(deliveryFilePath);
  const ids = get_the_ids(matches, year);
  const bowlerEconomy = {};
  for (let bowl of delivery) {
    if (ids.has(+bowl.match_id)) {
      if (!bowlerEconomy[bowl["bowler"]]) {
        bowlerEconomy[bowl["bowler"]] = {
          run: 0,
          bowls: 0,
        };
      }
      if (+bowl["bye_runs"] > 0 || +bowl["legbye_runs"] > 0) {
        bowlerEconomy[bowl["bowler"]]["run"] += 0;
        bowlerEconomy[bowl["bowler"]]["bowls"] += 1;
      } else if (+bowl["wide_runs"] > 0 || +bowl["noball_runs"] > 0) {
        bowlerEconomy[bowl["bowler"]]["run"] += +bowl["total_runs"];
        bowlerEconomy[bowl["bowler"]]["bowls"] += 0;
      } else {
        bowlerEconomy[bowl["bowler"]]["run"] += +bowl["total_runs"];
        bowlerEconomy[bowl["bowler"]]["bowls"] += 1;
      }
    }
  }
  const res = [];
  for (let bowler of Object.keys(bowlerEconomy)) {
    res.push({
      name: bowler,
      economy:
        (bowlerEconomy[bowler]["run"] / bowlerEconomy[bowler]["bowls"]) * 6,
    });
  }
  res.sort((bowler1, bolwer2) => {
    return bowler1["economy"] - bolwer2["economy"];
  });
  return res.slice(0, 10);
}

module.exports = economical_bowler_by_year;


