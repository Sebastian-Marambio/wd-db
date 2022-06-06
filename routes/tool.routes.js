const router = require("express").Router();
const mongoose = require("mongoose");
const Tool = require("../models/Tool.model");
const User = require("../models/User.model")
const express = require("express");


router.get("/detail/add", (req, res, next) => {
  res.render("tools/create.ejs");
});

router.post("/detail/add", async (req, res, next) => {
  try {
    req.body.creator = req.session.user._id;
    console.log(req.body)
    await Tool.create(req.body);
    res.redirect("/user/");
  } catch (error) {
    console.log(error);
    res.redirect("/tools/detail/add", { errorMessage: "hi!" });
  }
});

module.exports = router;
