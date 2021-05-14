const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");


router.get("/getStats", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/get_stats.sql")) //select * from players
    .toString();

  const resp = await mysqlQuery(query); //select * from players

  res.status(200).json(resp);
});

router.get("/sortStatsByName", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_name.sql")) //select * from statstable ORDER BY Nazwa
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Nazwa

  res.status(200).json(resp);
});

router.get("/sortStatsByNameDesc", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_name_DESC.sql")) //select * from statstable ORDER BY Nazwa DESC
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Nazwa DESC

  res.status(200).json(resp);
});

router.get("/sortStatsByRank", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_rank.sql")) //select * from statstable ORDER BY Ranking
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Ranking

  res.status(200).json(resp);
});

router.get("/sortStatsByRankDesc", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_rank_DESC.sql")) //select * from statstable ORDER BY Ranking DESC
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Ranking DESC

  res.status(200).json(resp);
});

router.get("/sortStatsByWins", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_wins.sql")) //select * from statstable ORDER BY Wygrane
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Wygrane

  res.status(200).json(resp);
});

router.get("/sortStatsByWinsDesc", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_wins_DESC.sql")) //select * from statstable ORDER BY Wygrane DESC
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Wygrane DESC

  res.status(200).json(resp);
});

router.get("/sortStatsByDraw", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_draw.sql")) //select * from statstable ORDER BY Remisy
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Remisy

  res.status(200).json(resp);
});

router.get("/sortStatsByDrawDesc", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_draw_DESC.sql")) //select * from statstable ORDER BY Remisy DESC
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Remisy DESC

  res.status(200).json(resp);
});

router.get("/sortStatsByLosers", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_losers.sql")) //select * from statstable ORDER BY Przegrane
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Przegrane

  res.status(200).json(resp);
});

router.get("/sortStatsByLosersDesc", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/sort_stats_by_losers_DESC.sql")) //select * from statstable ORDER BY Przegrane DESC
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable ORDER BY Przegrane DESC

  res.status(200).json(resp);
});

router.get("/filterStatsByAll", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/get_stats.sql")) //select * from statstable
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable

  res.status(200).json(resp);
});

router.get("/filterStatsByTop10", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/filter_stats_by_top10.sql")) //select * from statstable where Ranking <= 10 ORDER BY Ranking;
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable where Ranking <= 10 ORDER BY Ranking;

  res.status(200).json(resp);
});

router.get("/filterStatsByTop20", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/filter_stats_by_top20.sql")) //select * from statstable where Ranking <= 20 ORDER BY Ranking;
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable where Ranking <= 20 ORDER BY Ranking;

  res.status(200).json(resp);
});

router.get("/filterStatsByTop30", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/filter_stats_by_top30.sql")) //select * from statstable where Ranking <= 30 ORDER BY Ranking;
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable where Ranking <= 30 ORDER BY Ranking;

  res.status(200).json(resp);
});

router.get("/filterStatsByTop50", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/filter_stats_by_top50.sql")) //select * from statstable where Ranking <= 50 ORDER BY Ranking;
    .toString();

  const resp = await mysqlQuery(query); //select * from statstable where Ranking <= 50 ORDER BY Ranking;

  res.status(200).json(resp);
});



module.exports = router;