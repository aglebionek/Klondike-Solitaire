const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

router.get("/test/:id", async (req, res) => {
  const id = req.params.id; //id jest przekazywane przez sciezke(to wyżej z :id)
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/test.sql")) //select * from players where ?
    .toString();

  const resp = await mysqlQuery(query, { id: id }); //select * from players where id = 1

  res.status(200).json({ resp });
});

router.get("/test", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/test1.sql")) //select * from players
    .toString();

  const resp = await mysqlQuery(query); //select * from players

  res.status(200).json(resp);
});

module.exports = router;
