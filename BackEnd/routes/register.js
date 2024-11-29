// const Authorization = require("../config/Authorization");
const { AddPost } = require("../controllers/AddPost");
const { AllPost } = require("../controllers/AllPost");
const { singIn, logIn, logOut } = require("../controllers/register");

const upload = require("../middlewares/multer");
const { UserProfile } = require("../controllers/UserProfile");
const { AuthenticateToken } = require("../middlewares/auth");
const { getCatogory, createCategory, getCategory } = require("../controllers/category");
const { Delete } = require("../controllers/delete");
const { Edit, Update } = require("../controllers/Update");
const {
  getSubcategories,
  createSubCategory,
} = require("../controllers/subCotegory");

const express = require("express");
const router = express.Router();

router.post("/singin", singIn);

router.post("/login", logIn);

router.post("/logout", logOut);

router.get("/allpost", AuthenticateToken, AllPost);

router.get("/userprofile", UserProfile);

router.post("/addpost", upload.single("image"), AddPost);

router.get("/getcategory", getCategory);

router.post("/createcategory", createCategory);

router.delete("/delete/:id", Delete);

router.get("/edit/:id", Edit);

router.put("/update/:id", upload.single("image"), Update);

router.get("/getsubcategories", getSubcategories);

router.post("/createsubcategory", createSubCategory);

module.exports = router;
