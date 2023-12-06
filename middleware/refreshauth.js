const jwt = require("jsonwebtoken")

const refreshverifyToken = (req, res, next) => {
  const token = req.headers["auth"];
  console.log("token..",token)
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

  } catch (err) {
    console.log("error",err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = refreshverifyToken;