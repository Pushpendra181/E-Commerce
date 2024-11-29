// // const dataBaseConnection = require("../connection/database");
// const dataBaseConnection = require("../connection/database");
// const Categorie = require("./categorie.model");
// const Subcategory = require("./subCategory.model");
// // const Subcategory = require("./subcategory.model");

// // Establish relationships
// Categorie.hasMany(Subcategory, { foreignKey: "categoryId" });
// Subcategory.belongsTo(Categorie, { foreignKey: "categoryId" });

// // Synchronize database
// dataBaseConnection
//   .sync({ force: false }) // Set force: true if you want to reset the tables
//   .then(() => {
//     console.log("Database synchronized successfully with references.");
//   })
//   .catch((err) => {
//     console.error("Error synchronizing the database:", err);
//   });
