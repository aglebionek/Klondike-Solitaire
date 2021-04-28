/*
  Test user data:
    - login: pasjans-test
    - haslo: zaq1@WSX

  Setting up connection in the server:

    import mysql from 'mysql';

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'pasjans-test',
      password: 'zaq1@WSX',
      database: 'pasjans-db'
    });

    connection.connect();

    // do something

    connection.end();
*/

SOURCE ./db_create.sql;
SOURCE ./db_user_create.sql;
SOURCE ./table_create.sql;