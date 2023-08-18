const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOSTNAME || 'db',
    user: process.env.MYSQL_USER || 'root',
    port: process.env.MYSQL_PORT || 3006,
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'StoreManager',
    multipleStatements: true,
  });
  
module.exports = connection;