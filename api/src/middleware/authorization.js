const dotenv = require("dotenv");

module.exports = function isAuthorized(req, res, next) {
  if (
    req.body.password === process.env.PASSWORD ||
    req.query.password === process.env.PASSWORD
  ) {
    next();
  } else {
    // return unauthorized
    res.status(401).send("Unauthorized");
  }
};
