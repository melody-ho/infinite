const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.sendFile("main.html", { root: "../client/dist/" });
});

module.exports = router;
