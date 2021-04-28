//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

//rooms jest dodawany automatycznie
router.get("/display", (req, res) => {
  //kod, patrz na przykład example/exampleRoute.js
});

module.exports = router;
