const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = {
  auth: async (req, res, next) => {
    let tokenRaw = String(req.headers.auth);
    let id = await jwt.verify(tokenRaw, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        req.user = false;
        req.message = {message:'Can not verify user,Please sign on again!'}
        return next()
      } else {
        return token.id
      }
    });
    req.user = await User.findById(id);
    next();
  },
};
