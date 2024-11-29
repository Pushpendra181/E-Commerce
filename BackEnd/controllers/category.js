const Category = require("../models/categorie.model");

const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ mes: "success category", categories });
  } catch (error) {
    return res.status(500).json({ mes: "errr", error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "category name requried" });
    }
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ mes: "errr", error });
  }
};



module.exports = { createCategory, getCategory };
