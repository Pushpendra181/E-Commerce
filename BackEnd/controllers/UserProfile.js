const Post = require("../models/addpost");
const { email } = require("./register");

const UserProfile = async (req, res) => {
  // const { email } = req.body;
  const Email = email
  console.log(Email);
  // console.log(req.body);
  const user = await Post.findAll();
  console.log(user);
  res.json(user)
};

module.exports= {UserProfile}