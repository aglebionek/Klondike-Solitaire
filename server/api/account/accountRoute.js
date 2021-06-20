//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//account jest dodawany automatycznie
router.get("/:userId", async (req, res) => {
  let userId;
  try {
    const key = process.env.TOKEN_KEY;
    const token = req.cookies.token;
    const { id } = jwt.verify(token, key);
    userId = id;
  } catch (e) {
    return res.status(401).json("invalid token");
  }
  const userExistQuery = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/player_exists.sql")
    )
    .toString();

  let resp = await mysqlQuery(userExistQuery, [userId]);
  if (resp.length == 0) return res.status(404).json("użytkownik nie istnieje");

  const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/account_select.sql")
    )
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
    .readFileSync(
      path.join(__dirname, "../../database/queries/account_stats_select.sql")
    )
    .toString();

  resp = await mysqlQuery(query, [userId]);
  if (resp.length == 0) return res.status(404).json("nie ma statystyk w bazie");
  return res.status(200).json(resp[0]);
});

router.put("/edit", async (req, res) => {
  const { icon_id, username, password, newPassword, country } = req.body;
  const avatar = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  };
  if (!avatar[icon_id]) return res.status(400).json("brak awatara w bazie");
  if (!username) return res.status(400).json("Nie możesz ustawić pustej nazwy");

  let userId;
  try {
    const key = process.env.TOKEN_KEY;
    const token = req.cookies.token;
    const { id } = jwt.verify(token, key);
    userId = id;
  } catch (e) {
    return res.status(401).json("invalid token");
  }

  const getPasswordQuery = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/get_password.sql")
    )
    .toString();

  const resp = await mysqlQuery(getPasswordQuery, [String(userId)]);
  const currentPassword = resp[0].password;

  const isPasswordCorrect = await bcrypt.compare(password, currentPassword);
  if (!isPasswordCorrect)
    return res.status(401).json("Podane hasło jest błędne");
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const query = fs
    .readFileSync(
      path.join(__dirname, "../../database/queries/account_update.sql")
    )
    .toString();

  await mysqlQuery(query, [
    icon_id,
    username,
    hashedNewPassword,
    country,
    userId,
  ]);

  res.status(200).json("zaaktualizowano");
});

module.exports = router;
