const router = require("express").Router();
const mongoose = require("mongoose");
const Tool = require("../models/Tool.model");
const User = require("../models/User.model");
const express = require("express");


router.get("/detail/add", (req, res, next) => {
  res.render("tools/create.ejs"); 
});

router.post("/detail/add", async (req, res, next) => {
  try {
    
    req.body.creator = req.session.user._id;
    await Tool.create(req.body);
    res.redirect("/user/"); 
  } catch (error) {
    // if (error.code === 11000) {
    //     return res
    //       .status(400)
    //       .render("/detail/add", { errorMessage: "Program already registered in Database. Please create a program with a different name" });}
    console.log(error);
    res.redirect("/tools/detail/add", { errorMessage: "hi!" });
  }
});

router.get("/detail/:id", async (req, res, next) => {
    const {id} = req.params
    const toolDetails = await Tool.findById(id)
    res.render('tools/details.ejs', {toolDetails})
  });

router.post("/detail/:id/rate", async (req, res, next) => {
    const {id} = req.params
    const data = await Tool.findById(id)
    //if (data.numberOfRatings===0) {data.rating=0}
    const newRating = (((data.rating * data.numberOfRatings) + req.body.rating) / (data.numberOfRatings + 1)).toFixed(1);
    console.log(newRating)
    const newNumberOfRatings = data.numberOfRatings + 1;
    await Tool.findByIdAndUpdate(id, { rating: newRating, numberOfRatings: newNumberOfRatings });
    res.redirect(`/tools/detail/${id}`); 
})
 
router.post("/detail/:id/delete", async (req, res) => {
    const {id} = req.params
    await Tool.findByIdAndDelete(id)
    console.log('Deleted')
    res.redirect('/user')
})
  
module.exports = router;
