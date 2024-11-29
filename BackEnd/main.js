const express = require("express");
const userRouter = require("./routes/register");
const app = express();
const port = 5000;
const path = require("path");
const cors = require("cors");
const cookiparser = require("cookie-parser");
app.use(cookiparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
    credentials: true,
  })
);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "upload")));

app.listen(port, (req, res) => {
  console.log(`port listen ${port}`);
});
