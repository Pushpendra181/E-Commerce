const Subcategory = require("../models/subCategory.model");

const getSubcategories = async (req, res) => {
  const { categoryId } = req.params;
  //   console.log(req.params);
  try {
    const subcategories = await Subcategory.findAll();
    console.log(subcategories);
    res
      .status(200)
      .json({ message: "Subcategories fetched successfully", subcategories });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subcategories", error });
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId, postId } = req.body;
    if (!name) {
      return res.status(400).json({ error: "catogry name requried" });
    }
    const subCatogory = await Subcategory.create({ name ,categoryId});
    res.status(201).json(subCatogory);
  } catch (error) {
    return res.status(500).json({ mes: "errr", error });
  }
};

module.exports = {
  getSubcategories,
  createSubCategory,
};
