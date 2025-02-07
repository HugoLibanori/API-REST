"use strict";
require("dotenv/config");
const config = {
    dialect: "mariadb",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true,
    },
    dialectOptions: {
        timezone: "America/Sao_Paulo",
    },
    timezone: "America/Sao_Paulo",
};
module.exports = config;
