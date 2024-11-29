const Post = require("../models/addpost");

const Edit = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  const data = await Post.findOne({ where: { id } });
  //   console.log(data);
  res.json(data);
};

// const Update = async (req, res) => {
//   const { id } = req.params;
//   //   console.log(req.body);
//   //   console.log(id);
//   const { username, categoryId, discription } = req.body;
//   console.log(username, categoryId, discription);

//   const updateData = await Post.findOne({ where: { id } });
//   updateData.username = username;
//   updateData.discription = discription;
//   updateData.categoryId = categoryId;
//   updateData.path = req.file ? req.file.path : updateData.path; //
//   await updateData.save();
//   //   console.log(updateData);
//   res.send("successsss");
// };
const Update = async (req, res) => {
  const { id } = req.params;
  const { username, categoryId, discription } = req.body;

  try {
    const BAS_PATH = "http://localhost:5000/";
    const updateData = await Post.findOne({ where: { id } });
    if (updateData) {
      updateData.username = username;
      updateData.discription = discription;
      updateData.categoryId = categoryId;
      updateData.path = `${BAS_PATH}${req.file.filename}`; // Use uploaded file path

      await updateData.save();
      res.send("successsss");
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    res.status(500).send("An error occurred");
  }
};

module.exports = { Edit, Update };
