const Post = require("../models/addpost");

const Delete = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const data = await Post.findOne({ where: { id } });

  if (!data) {
    // If no post is found with the given ID, respond with a 404 error
    return res.status(404).json({ mes: "Post not found" });
  }

  // If the post is found, proceed to delete it
  await data.destroy();
  return res.status(200).json({ mes: "Post successfully deleted" });
};

module.exports = { Delete };
