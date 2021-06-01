const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

router.put("/edit/:userId", async (req, res) => {
  const { cardset_id, music, effect } = req.body;
  const card = {
    1: true,
    2: true,
  };

  if (!card[cardset_id]) return res.status(400).json("invalid cardset_id");
  if (isNaN(music) || music < 0 || music > 100)
    return res.status(400).json("invalid music volume");
  if (isNaN(effect) || effect < 0 || effect > 100)
    return res.status(400).json("invalid effect volume");

  const userId = req.params.userId;

  const userExistQuery = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/player_exists.sql")
    )
    .toString();

  const resp = await mysqlQuery(userExistQuery, [userId]);
  if (resp.length == 0) return res.status(404).json("user doesn't exist");

  const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/update_settings.sql")
    )
    .toString();

  await mysqlQuery(query, [cardset_id, music, effect, userId]);

  return res.status(200).json("settings updated successfully");
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const userExistQuery = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/player_exists.sql")
    )
    .toString();

  let resp = await mysqlQuery(userExistQuery, [userId]);
  if (resp.length == 0) return res.status(404).json("user doesn't exist");

  const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/get_settings.sql")
    )
    .toString();

  resp = await mysqlQuery(query, [userId]);
  if (resp.length == 0) return res.sendStatus(204);
  return res.status(200).json(resp[0]);
});

module.exports = router;
