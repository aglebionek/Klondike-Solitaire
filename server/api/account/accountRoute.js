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
    if (resp.length == 0) return res.status(404).json("użytkownik nie istnieje");

    const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/account_select.sql")) 
    .toString();
   
    resp = await mysqlQuery(query, [userId]);

    return res.status(200).json(resp[0]);
});

router.get("/stats/:userId", async (req, res) => {
  const userId = req.params.userId;
    
  const userExistQuery = fs
  .readFileSync(
    path.join(__dirname, "../../database/queries/player_exists.sql")
  )
  .toString();

    let resp = await mysqlQuery(userExistQuery, [userId]);
    if (resp.length == 0) return res.status(404).json("użytkownik nie istnieje");

    const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/account_stats_select.sql")) 
    .toString();
   
    resp = await mysqlQuery(query, [userId]);
    if (resp.length == 0) return res.status(404).json("nie ma statystyk w bazie");
    return res.status(200).json(resp[0]);
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
      if (!avatar[icon_id]) return res.status(400).json("brak awatara w bazie");

    const userId = req.params.userId;

    const userExistQuery = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/player_exists.sql")
    )
    .toString();
  
      let resp = await mysqlQuery(userExistQuery, [userId]);
      if (resp.length == 0) return res.status(404).json("użytkownik nie istnieje");

    const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/account_update.sql")
    )
    .toString();

    await mysqlQuery(query, [icon_id,username,password,country, userId]);

    return res.status(200).json("konto zaktualizowane pomyślnie");
});


module.exports = router;
