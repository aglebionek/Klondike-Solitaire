//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

//settings jest dodawany automatycznie
router.get("/edit/:user", (req, res) => {
  //kod, patrz na przykład example/exampleRoute.js
});

module.exports = router;
