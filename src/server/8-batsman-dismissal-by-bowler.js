const getFile = require(".");
const fs = require("fs");

async function batsman_dismissal_by_bowler(deliveryFilePath) {
  const delivery = await getFile(deliveryFilePath);
  const res = delivery.reduce((res, ball) => {
    if (ball["player_dismissed"] !== "") {
      if (!res[ball["player_dismissed"]]) {
        res[ball["player_dismissed"]] = {};
      }
      if (
        !res[ball["player_dismissed"]][ball["bowler"]] &&
        ball["player_dismissed"]["dismissal_kind"] !== "run out"
      ) {
        res[ball["player_dismissed"]][ball["bowler"]] = 1;
      }
      if (ball["player_dismissed"]["dismissal_kind"] !== "run out") {
        res[ball["player_dismissed"]][ball["bowler"]] += 1;
      }
    }
    return res;
  }, {});
  Object.keys(res).forEach((player) => {
    let dismissals = 0;
    let betterBowler = [];
    Object.keys(res[player]).forEach((bowler) => {
      if (res[player][bowler] > dismissals) {
        dismissals = res[player][bowler];
        betterBowler = [bowler];
      } else if (res[player][bowler] == dismissals) {
        betterBowler.push(bowler);
      }
    });
    res[player] = betterBowler;
  });
  return res;
}

module.exports = batsman_dismissal_by_bowler;
