const router = require("express").Router();
const mongoose = require("mongoose")
const express = require("express");
const Tool = require("../models/Tool.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");



/* GET home page */
router.get("/", isLoggedIn, async (req, res, next) => {
    console.log(req.session.user);
    let data = await Tool.find({creator: req.session.user});
    res.render("user/profile.ejs", { data, user: req.session.user });
});

module.exports = router;
