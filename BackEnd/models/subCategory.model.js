const { DataTypes } = require("sequelize");
const dataBaseConnection = require("../connection/database");
const Categorie = require("./categorie.model"); // Import the Categorie model
const Category = require("./categorie.model");
const Post = require("./addpost");

const Subcategory = dataBaseConnection.define("subcategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie, // Reference Categorie model here
      key: "id",
    },
  },
});

// Establish relationship
Subcategory.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Subcategory, { foreignKey: "categoryId" });

// Category.belongsToMany("SubCategory", {
//   through: Post,
//   foreignKey: "categoryId",
// });
// Subcategory.belongsToMany("Category", {
//   through: Post,
//   foreignKey: "SubCategory",
// });

dataBaseConnection
  .sync({ force: false }) // Set force: true if you want to reset the tables
  .then(() => {
    console.log("success.");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });

module.exports = Subcategory;
