function get_the_ids(matches, year) {
  const matchingIds = new Set();
  for (let match of matches) {
    if (match.season == year) {
      matchingIds.add(+match.id);
    }
  }
  return matchingIds;
}

function get_season_by_id(matches) {
  const idsPerSeason = {};
  for (let index = 2008; index <= 2017; index++) {
    const ids = get_the_ids(matches, index);
    for (const value of ids) {
      idsPerSeason[value] = index;
    }
  }

  return idsPerSeason;
}

module.exports = {
  get_the_ids,
  get_season_by_id,
};
