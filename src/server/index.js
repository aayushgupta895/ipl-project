const matchesFilePath = "/home/ubuntu/drills/ipl/src/data/matches.csv";
const deliveryFilePath = "/home/ubuntu/drills/ipl/src/data/deliveries.csv";
const csv = require("csvtojson");

async function processCSV(csvFilePath) {
  try {
    const jsonArrayObj = await csv().fromFile(csvFilePath);
    return jsonArrayObj;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getFile(filePath) {
  let records;
  if (filePath == "matches") {
    records = await processCSV(matchesFilePath);
  } else {
    records = await processCSV(deliveryFilePath);
  }
  return records;
}

module.exports = getFile;
