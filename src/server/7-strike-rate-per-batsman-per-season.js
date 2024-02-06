const { get_season_by_id } = require("./get-ids-by-year");
const getFile = require(".");
const fs = require("fs");

async function strike_rate_per_batsman_per_season(
  matchFilePath,
  deliveryFilePath
) {
  const matches = await getFile(matchFilePath);
  const deliveries = await getFile(deliveryFilePath);

  // const res = {};
  const idsPerSeason = get_season_by_id(matches);
  const res = deliveries.reduce((res, ball) => {
    const season = idsPerSeason[ball.match_id];
    if (!res[season]) {
      res[season] = {};
    }
    if (!res[season][ball.batsman]) {
      res[season][ball.batsman] = {
        runs: 0,
        balls: 0,
      };
    }
    res[season][ball.batsman]["runs"] += +ball["batsman_runs"];
    if (ball["wide_runs"] == "0" || ball["noball_runs"] == "0") {
      res[season][ball.batsman]["balls"] += 1;
    }
    return res;
  }, {});

  Object.keys(res).forEach((key) => {
    Object.keys(res[key]).forEach((batsman) => {
      res[key][batsman] =
        (res[key][batsman]["runs"] / res[key][batsman]["balls"]) * 100;
    });
  });
  const finalObj = Object.keys(res).reduce((finalObj, key) => {
    Object.keys(res[key]).forEach((player) => {
      if (!finalObj[player]) {
        finalObj[player] = {};
      }
      finalObj[player][key] = res[key][player];
    });
    return finalObj;
  }, {});

  return finalObj;
}

module.exports = strike_rate_per_batsman_per_season;
