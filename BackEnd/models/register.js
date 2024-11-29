const { DataTypes } = require("sequelize");
const dataBaseConnection = require("../connection/database");

const User = dataBaseConnection.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

dataBaseConnection
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });

module.exports = User;
