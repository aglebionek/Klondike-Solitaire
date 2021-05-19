const path = require("path");
const fs = require("fs");

const file = fs.readFileSync(
  path.join(__dirname, "./BaltimoreCyberTrustRoot.crt.pem")
);

module.exports = {
  host: "localhost",
  user: "pasjans",
  password: "zaq1@WSX",
  database: "pasjans",
};