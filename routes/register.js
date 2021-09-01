const express = require("express");
const router = express.Router();
const user = require("../middleware/user");

router.post("/user/new-user", user.register, (req, res) => {
  if (req.user !== undefined) {
    res.status(200).json({ result: true, message: "Register Success!" });
  } else {
    res.status(400).json({ result: false, message: "Register Failed!" });
  }
});

module.exports = router;
