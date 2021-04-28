const mysql = require("mysql2"),
  config = require("../../config/dbconfig.json");
const util = require("util");

const sqlConnection = async function sqlConnection(sql, values, next) {
  var connection = mysql.createConnection(config.db);
  connection.connect(function (err) {
    if (err !== null) {
      console.log("Error connecting to mysql:" + err);
    }
  });

  const query = util.promisify(connection.query).bind(connection);
  let resp;

  try {
    resp = await query(sql, values);
  } catch (error) {
    console.log("Prawdopodobnie błędna kwerenda");
  }

  connection.end();
  return resp;
};

module.exports = sqlConnection;
