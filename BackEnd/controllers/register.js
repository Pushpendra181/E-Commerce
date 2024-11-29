const User = require("../models/register");
const jwt = require("jsonwebtoken");
// adjust path to your model
const bcrypt = require("bcryptjs");
const { options } = require("../routes/register");

const singIn = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ message: "User exist" });
    }

    const bcryptPassword = await bcrypt.hash(password, 10);
    // const password = bcryptPassword;
    // Generate a JWT token
    const token = jwt.sign({ email: email }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    console.log(password);
    await User.create({ username, email, password: bcryptPassword });
    // Send the token in the response
    return res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const logIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  module.exports = { email, password };
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate the JWT token
    const token = jwt.sign({ email: user.email }, "1234", { expiresIn: "1h" });
    console.log(token);

    return res.json({ token, message: "login success Full", redirectUrl: "/" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// const logOut = (req, res) => {
//   res.status(200).json({ token: "" }).json({ msg: "logout" });
//   res.send("logOut successssssssssss");
// };

const logOut = (req, res) => {
  res.status(200).json({ msg: "Logout successful" });
};
module.exports = { singIn, logIn, logOut };
