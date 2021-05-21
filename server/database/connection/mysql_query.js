const mysql = require("mysql2");
const config = require("../../config/dbconfig");
const util = require("util");

const sqlConnection = async function sqlConnection(sql, values, next) {
  var connection = mysql.createConnection(config);
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
    console.log("Prawdopodobnie błędna kwerenda"+error);
  }

  connection.end();
  return resp;
};

module.exports = sqlConnection;
