const { DataTypes } = require("sequelize");
const dataBaseConnection = require("../connection/database");
// const Categorie = require("./categorie.model");
const Category = require("./categorie.model");
const Subcategory = require("./subCategory.model");

const Post = dataBaseConnection.define("post", {
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },   
   
  discription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    // allowNull: false,
  },   
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
    allowNull: false,
  },
  subcategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Subcategory,
      key: "id",
    },
    allowNull: true, // Allow null if subcategory is optional
  },
});
// Establish relationships
Post.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Category.hasMany(Post, { foreignKey: "categoryId" });

Post.belongsTo(Subcategory, {
  foreignKey: "subcategoryId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Subcategory.hasMany(Post, { foreignKey: "subcategoryId" });

dataBaseConnection
  .sync({ force: false })
  .then(() => {
    console.log("successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });

module.exports = Post;
