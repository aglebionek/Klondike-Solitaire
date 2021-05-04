//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");

//account jest dodawany automatycznie
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/userAccountEdit.sql")) 
    .toString();

    const resp = await mysqlQuery(query,{ id: id } ); //select * from players where id = 1

    // res.send(resp);

    res.status(200).json({ resp });
});

router.put("/edit/:userId", async (req, res) => {


    const { icon_id } = req.body;

    const avatar = {
        1: true,
        2: true,
      };
      if (!avatar[icon_id]) return res.status(400).json("invalid icon_id");

    const userId = req.params.userId;

    const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/update_account.sql")
    )
    .toString();
    //     console.log(query, [icon_id, userId]);
    await mysqlQuery(query, [icon_id, userId]);

    return res.status(200).json("settings updated successfully");
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
