//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");


//account jest dodawany automatycznie
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
    .readFileSync(path.join(__dirname, "../../database/queries/account_select.sql")) 
    .toString();
   // const resp = await mysqlQuery(query,{ id: id } ); //select * from players where id = 1

    // res.send(resp);
    resp = await mysqlQuery(query, [userId]);
    if (resp.length == 0) return resp.status(204);
    return res.status(200).json(resp[0]);

    //res.status(200).json({ resp });
});

router.put("/edit/:userId", async (req, res) => {


    const { icon_id, username, password, country } = req.body;

    const avatar = {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
      };
      if (!avatar[icon_id]) return res.status(400).json("invalid icon_id");

    const userId = req.params.userId;

    const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/account_update.sql")
    )
    .toString();
    //     console.log(query, [icon_id, userId]);
    await mysqlQuery(query, [icon_id,username,password,country, userId]);

    return res.status(200).json("settings updated successfully");
});


module.exports = router;
