const fs = require("fs");
const getFile = require(".");
const { get_the_ids } = require("./get-ids-by-year");

async function extra_run(matchesFilePath, deliveryFilePath, year) {
  const matches = await getFile(matchesFilePath);
  const delivery = await getFile(deliveryFilePath);
  const ids = get_the_ids(matches, year);
  const res = delivery.reduce((extras, bowl) => {
    if (ids.has(+bowl.match_id)) {
      if (!extras[bowl["bowling_team"]]) {
        extras[bowl["bowling_team"]] = 0;
      }
      if (bowl["extra_runs"] !== "0") {
        extras[bowl["bowling_team"]] += Number(bowl.extra_runs);
      }
    }
    return extras;
  }, {});
  return res;
}

module.exports = extra_run;
