const { Sequelize } = require("sequelize");

const dataBaseConnection = new Sequelize("blog", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = dataBaseConnection;
