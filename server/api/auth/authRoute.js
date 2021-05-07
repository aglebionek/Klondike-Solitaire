const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

router.get("/verify", (req, res) => {
  const token = req.cookies.token;
  const key = process.env.TOKEN_KEY;
  try {
    jwt.verify(token, key);
    return res.sendStatus(200);
  } catch {
    return res.status(401).json("invalid token");
  }
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(emailRegex)) return res.status(400).json("email is invalid");
  if (!username) return res.status(400).json("username cannot be empty");
  if (username.length > 20) return res.status(400).json("username is too long");
  if (password.length < 6) return res.status(400).json("password is too short");
  if (password.length > 15) return res.status(400).json("password is too long");

  const checkIfUserExistsQuery = fs
    .readFileSync(
      path.join(
        __dirname,
        "../../database/queries/check_if_user_exists_by_email.sql"
      )
    )
    .toString();

  let resp = await mysqlQuery(checkIfUserExistsQuery, [email]);
  if (resp.length > 0)
    return res.status(403).json({ email: "email is already in use" });

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/register.sql"))
    .toString();

  resp = await mysqlQuery(query, [username, email, hashedPassword]);

  if (!resp) return res.status(500).json("problem creating user");

  const key = process.env.TOKEN_KEY;
  const token = jwt.sign(
    {
      id: resp.insertId,
      username,
      email,
    },
    key,
    { expiresIn: 60 * 60 * 24 * 7 }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite: true,
  });

  return res.status(200).json("user created successfully");
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(emailRegex)) return res.status(400).json("email is invalid");
  if (!password) return res.status(400).json("Password is empty");

  const query = fs
    .readFileSync(path.join(__dirname, "../../database/queries/login.sql"))
    .toString();

  let resp = await mysqlQuery(query, [email]);

  if (resp.length == 0)
    return res.status(401).json("Email lub hasło jest niepoprawne");

  const { id, password: hashedPassword, username } = resp[0];
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect)
    return res.status(401).json("Email lub hasło jest niepoprawne");

  const key = process.env.TOKEN_KEY;
  const token = jwt.sign(
    {
      id,
      username,
      email,
    },
    key,
    { expiresIn: 60 * 60 * 24 * 7 }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite: true,
  });

  return res.status(200).json("ok");
});

module.exports = router;
