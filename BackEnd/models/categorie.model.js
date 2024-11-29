const { DataTypes } = require("sequelize");
const dataBaseConnection = require("../connection/database");

const Category = dataBaseConnection.define("categorie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
