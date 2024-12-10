const jwt = require("jsonwebtoken");
const secret = "1234";

exports.AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mes: "token not provide" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ mes: "Invalid token" });
    }
    req.user = user;     
    next();
  });  
};  
 