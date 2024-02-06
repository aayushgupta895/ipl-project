const fs = require("fs");
const matches_per_year = require("./src/server/1-matches-per-year");
const matches_won_per_team_per_year = require("./src/server/2-matches-won-per-team-per-year");
const extra_run = require("./src/server/3-extra-runs-per-team-by-year");
const economical_bowler_by_year = require("./src/server/4-economical-bowler-by-year");
const toss_and_match_winner = require("./src/server/5-toss-and-match-winner");
const most_player_of_match_per_season = require("./src/server/6-player-of-the-match-by-season");
const strike_rate_per_batsman_per_season = require("./src/server/7-strike-rate-per-batsman-per-season");
const batsman_dismissal_by_bowler = require("./src/server/8-batsman-dismissal-by-bowler");
const best_economy_in_superover = require("./src/server/9-best-economy-in-super-over");

function writeFile(result, fileName) {
  const json_string = JSON.stringify(result);
  fs.writeFile(`./src/public/output/${fileName}.json`, json_string, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully");
  });
}

(async () => {
  let res = await matches_per_year("matches");
  writeFile(res, "matchesPlayedPerYear");
  res = await matches_won_per_team_per_year("matches");
  writeFile(res, "matchesWonPerTeamPerYear");
  res = await extra_run("matches", "delivery", 2016);
  writeFile(res, "extraRunsByYear");
  res = await economical_bowler_by_year("matches", "delivery", 2015);
  writeFile(res, "economicalBowlerByYear");
  res = await toss_and_match_winner("matches");
  writeFile(res, "mostTossAndMatchWinners");
  res = await most_player_of_match_per_season("matches");
  writeFile(res, "mostPlayerOfMatchPerSeason");
  res = await strike_rate_per_batsman_per_season("matches", "delivery");
  writeFile(res, "strikeRatePerBatsmanPerSeason");
  res = await batsman_dismissal_by_bowler("delivery");
  writeFile(res, "batsmanDismissalByBowler");
  res = await best_economy_in_superover("delivery");
  writeFile(res, "bestEconomyInSuperOver");
})();
