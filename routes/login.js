const express = require("express");
const router = express.Router();
const user = require("../middleware/user");

router.post("/user/login", user.login, (req, res) => {
  if(req.user)
  {
    res.status(200).send(req.user);
  } else {
    res.status(400).send(req.message);
  }
});

module.exports = router;
