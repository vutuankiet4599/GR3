const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database");

const poolConnection = mysql.createPool({
    host: databaseConfig.dbHost,
    database: databaseConfig.dbName,
    user: databaseConfig.dbUserName,
    password: databaseConfig.dbPassword,
    port: databaseConfig.dbPort,
    waitForConnections: true,
    connectionLimit: 10, // Adjust the limit based on your requirements
    queueLimit: 0,
});

module.exports = poolConnection;
