const jwt = require("jsonwebtoken");

const logverifyToken = (req, res, next) => {
  const token = req.headers["access"];
  const refresh = req.headers['refresh']
  console.log("token..",token)
  if (!token && !refresh) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    
    const rdecoded = jwt.verify(refresh, process.env.JWT_SECRET_KEY)
    req.user = rdecoded
  } catch (err) {
    console.log("error",err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = logverifyToken;