const Post = require("../models/addpost");

const AddPost = async (req, res) => {
  //   console.log("sasaassaa");
  const { price, discription, categoryId, subcategoryId } = req.body;
  console.log(req.body);
  // console.log("file", req.file.filename);
  const BAS_PATH = "http://localhost:5000/";
  console.log(price, discription, categoryId, subcategoryId);
  try {
    const CreatePost = await Post.create({
      price,
      discription,
      path: `${BAS_PATH}${req.file.filename}`,
      categoryId,
      subcategoryId,
    });
    res.send(CreatePost);
    console.log("post", CreatePost);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  AddPost,
};
