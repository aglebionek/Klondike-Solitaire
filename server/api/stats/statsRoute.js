const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");


router.get("/getStats", async (req, res) => {
  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/get_stats.sql"))
    .toString();

  let resp = await mysqlQuery(query); 

  res.status(200).json(resp);
});


module.exports = router;