const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth.auth, (req, res) => {
  console.log(req.user)
  res.status(200).json(req.user);
});

module.exports = router;
