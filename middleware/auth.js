//A function that has access to req/res

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
   const bearerHeader = req.headers["authorization"]; //The authorization header is where we get the bearer token

   const token = bearerHeader && bearerHeader.split(" ")[1];
// const token = req.header('x-auth-token');

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, config.get("jwtSecrets"));
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401);
  }
};


