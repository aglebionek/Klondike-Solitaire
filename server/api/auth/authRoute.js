//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

//auth jest dodawany automatycznie
router.post("/register", (req, res) => {
  //kod, patrz na przykład example/exampleRoute.js
});

module.exports = router;
