//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

//account jest dodawany automatycznie
router.get("/edit/:userId", async (req, res) => {
    const id = req.params.userId;

    res.send(id);


});

module.exports = router;
