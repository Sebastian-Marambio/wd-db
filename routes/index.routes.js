const router = require("express").Router();
const Tool = require("../models/Tool.model");
const User = require("../models/User.model")

/* GET home page */
router.get("/", async (req, res, next) => {
  let data = await Tool.find();
  res.render("index", {data});
});

module.exports = router;
