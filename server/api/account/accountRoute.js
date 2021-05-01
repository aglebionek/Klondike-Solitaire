//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

//account jest dodawany automatycznie
router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/userAccountEdit.sql")) 
    .toString();

    const resp = await mysqlQuery(query,{ id: id } ); //select * from players where id = 1

    // res.send(resp);

    res.status(200).json({ resp });
});

// router.get("/edit/avatar/:id", async (req, res) => {
//     const id = req.params.id;
//     const query = fs
//     .readFileSync(path.join(__dirname, "../../database/queries/userAccountAvatar.sql")) 
//     .toString();

//     const resp = await mysqlQuery(query,{ id: id } ); //select * from players where id = 1

//     // res.send(resp);

//     res.status(200).json({ resp });
// });



module.exports = router;
