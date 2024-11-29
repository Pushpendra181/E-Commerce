const Post = require("../models/addpost");
// const User = require("../models/register");

const AllPost = async (req, res) => {
  const allPost = await Post.findAll();
  // console.log(allPost);
  res.json({ allPost });
};

module.exports = { AllPost };
