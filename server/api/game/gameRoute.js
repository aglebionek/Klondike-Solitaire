const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");


router.post("/get-last-id", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/get_last_game_id.sql"))
    .toString();

  let resp = await mysqlQuery(query);
  if (resp.length == 0)
    return res.status(401).json("Coś się zespuło i nie było mnie słychać więc powtórze jeszcze raz");

  const { id } = resp[0];

  return res.status(200).json(id);
});

router.post("/insert-game", async (req, res) => {
  const {start, end} = req.body;

  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/insert_game.sql"))
    .toString();

  let resp = await mysqlQuery(query, [start, end]);

  return res.status(200).json("ok");
});

router.post("/insert-game-occur", async (req, res) => {
  const {player_id, game_id, points, completion_time, moves, starting_distribution, is_win, is_lose, is_draw, key} = req.body;
  if(key % 317 == 0)
  {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/insert_game_occur.sql"))
    .toString();
  console.log(query);

  let resp = await mysqlQuery(query, [player_id, game_id, points, completion_time, moves, starting_distribution, is_win, is_lose, is_draw]);

  return res.status(200).json("ok");
  }
  else{
    // błędna wartość pola key - nieautoryzowany dostęp
    return res.status(401).json("błędny klucz autoryzacji(key)")
  }
});

module.exports = router;
