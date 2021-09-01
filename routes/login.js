const express = require("express");
const router = express.Router();
const user = require("../middleware/user");

router.post("/user/login", user.login, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
