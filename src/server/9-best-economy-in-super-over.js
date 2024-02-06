const getFile = require(".");
const fs = require("fs");

async function best_economy_in_superover(deliveryFilePath) {
  const deliveries = await getFile(deliveryFilePath);
  const bowlerEconomy = {};
  for (let ball of deliveries) {
    if (ball.is_super_over !== "0") {
      if (!bowlerEconomy[ball["bowler"]]) {
        bowlerEconomy[ball["bowler"]] = {
          run: 0,
          balls: 0,
        };
      }
      if (+ball["bye_runs"] > 0 || +ball["legbye_runs"] > 0) {
        bowlerEconomy[ball["bowler"]]["run"] += 0;
        bowlerEconomy[ball["bowler"]]["balls"] += 1;
      } else if (+ball["wide_runs"] > 0 || +ball["noball_runs"] > 0) {
        bowlerEconomy[ball["bowler"]]["run"] += +ball["total_runs"];
        bowlerEconomy[ball["bowler"]]["balls"] += 0;
      } else {
        bowlerEconomy[ball["bowler"]]["run"] += +ball["total_runs"];
        bowlerEconomy[ball["bowler"]]["balls"] += 1;
      }
    }
  }
  const economies = {};
  for (let player in bowlerEconomy) {
    economies[player] =
      (bowlerEconomy[player]["run"] / bowlerEconomy[player]["balls"]) * 6;
  }
  let counter = 70;
  let playerWithBestEconomy = "";
  for (let player in economies) {
    if (economies[player] < counter) {
      counter = economies[player];
      playerWithBestEconomy = player;
    }
  }
  return { playerWithBestEconomy, economy: counter };
}

module.exports = best_economy_in_superover;

