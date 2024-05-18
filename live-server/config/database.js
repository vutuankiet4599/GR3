require("dotenv").config();
const databaseConfig = {
    dbHost: process.env.DB_HOST || "localhost",
    dbName: process.env.DB_NAME || "database",
    dbUserName: process.env.DB_USERNAME || "root",
    dbPassword: process.env.DB_PASSWORD || "",
    dbPort: process.env.DB_PORT || "3306",
};

module.exports = databaseConfig;
