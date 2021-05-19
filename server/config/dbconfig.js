const path = require("path");
const fs = require("fs");

const file = fs.readFileSync(
  path.join(__dirname, "./BaltimoreCyberTrustRoot.crt.pem")
);

module.exports = {
  host: "pasjans-klondike2.mysql.database.azure.com",
  user: "adminklondike@pasjans-klondike",
  password: ".klondike123",
  database: "pasjans-db",
  ssl: {
    ca: file,
  },
};