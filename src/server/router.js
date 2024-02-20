const express = require("express");

const router = express.Router();

const matches_per_year = require("./1-matches-per-year");
const matches_won_per_team_per_year = require("./2-matches-won-per-team-per-year");
const extra_run = require("./3-extra-runs-per-team-by-year");
const economical_bowler_by_year = require("./4-economical-bowler-by-year");
const toss_and_match_winner = require("./5-toss-and-match-winner");
const most_player_of_match_per_season = require("./6-player-of-the-match-by-season");
const strike_rate_per_batsman_per_season = require("./7-strike-rate-per-batsman-per-season");
const batsman_dismissal_by_bowler = require("./8-batsman-dismissal-by-bowler");
const best_economy_in_superover = require("./9-best-economy-in-super-over");

router.get("/matches-per-year", async (req, res, next) => {
  let result = await matches_per_year("matches");
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

router.get("/matches-won-per-team-per-year", async (req, res, next) => {
  let result = await matches_won_per_team_per_year("matches");
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

router.get("/extra-runs-per-team-by-year", async (req, res, next) => {
  const year = +req.query.year;
  if(!year ||  isNaN(year)){
    next(new Error(`check your params`));
    return;
  }
  let result = await extra_run("matches", "delivery", +year);
  if (!result) {
    next(new Error(`internal server error`));
    return;
  } else {
    res.status(200).send(result);
  }
});

router.get("/economical-bowler-by-year", async (req, res, next) => {
  const year = +req.query.year;
  if (!year || isNaN(year)) {
    next(new Error(`check you params`));
  }
  let result = await economical_bowler_by_year("matches", "delivery", year);
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

router.get("/toss-and-match-winner", async (req, res, next) => {
  let result = await toss_and_match_winner("matches");
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

router.get("/player-of-the-match-by-season", async (req, res, next) => {
  let result = await most_player_of_match_per_season("matches");
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

router.get(
  "/strike-rate-per-batsman-per-season",
  async (req, res, next) => {
    let result = await strike_rate_per_batsman_per_season(
      "matches",
      "delivery"
    );
    if (!result) {
      next(new Error(`internal server error`));
    } else {
      res.status(200).send(result);
    }
  }
);

router.get("/batsman-dismissal-by-bowler", async (req, res, next) => {
  let result = await batsman_dismissal_by_bowler("delivery");
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

router.get("/best-economy-in-super-over", async (req, res, next) => {
  let result = await best_economy_in_superover("delivery");
  if (!result) {
    next(new Error(`internal server error`));
  } else {
    res.status(200).send(result);
  }
});

module.exports = router;
