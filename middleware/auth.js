const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.headers["auth"];
  const refresh = req.headers["refresh"];

  console.log("token..",token)
  if (!token && !refresh) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if(!refresh){
      console.log("error",err)
      return res.status(401).send("Invalid Token");  
    }
    try {
      const decoded = jwt.verify(refresh,)
    } catch (error) {
      
    }
  }
};

module.exports = verifyToken;