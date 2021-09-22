const express = require("express");
const router = express.Router();
const user = require("../middleware/user");

router.post("/user/new-user", user.register, (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(300).send(req.message);
  }
});

module.exports = router;
