const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

// router.get("/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const queryExistPlayer = fs
//     .readFileSync(path.join(__dirname, "../../database/queries/get_stats_player.sql"))  // select * from stats where id =?
//     .toString();

//   const resp = await mysqlQuery(queryExistPlayer, [userId]);
//   if (resp.length == 0) return res.status(404).json("user doesn't exist");

//   const query = fs
//   .readFileSync(
//     path.join(__dirname, "../../database/queries/get_stats.sql") // select * from stats
//   )
//   .toString();

//   resp = await mysqlQuery(query, [userId]);
//   if (resp.length == 0) return resp.status(204);
//   return res.status(200).json(resp[0]);
// });

router.get("/getStats", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/get_stats.sql")) //select * from players
    .toString();

  const resp = await mysqlQuery(query); //select * from players

  res.status(200).json(resp);
});



module.exports = router;