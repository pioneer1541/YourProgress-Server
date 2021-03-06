const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth.auth, (req, res) => {
  if(req.user) {
    res.status(200).send(req.user);
  }
});

module.exports = router;
