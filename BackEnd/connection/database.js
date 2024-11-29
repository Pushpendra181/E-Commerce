const { Sequelize } = require("sequelize");

const dataBaseConnection = new Sequelize("e-commerce", "root", "Abhi@123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = dataBaseConnection;
