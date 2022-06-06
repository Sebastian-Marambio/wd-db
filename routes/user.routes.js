const router = require("express").Router();
const mongoose = require("mongoose")
const express = require("express");
const Tool = require("../models/Tool.model");
const User = require("../models/User.model")



/* GET home page */
router.get("/", async (req, res, next) => {
    let data = await Tool.find({creator: req.session.user});
    res.render("user/profile.ejs", {data});
});

module.exports = router;
