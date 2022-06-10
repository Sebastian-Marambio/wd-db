const router = require("express").Router();
const mongoose = require("mongoose");
const Tool = require("../models/Tool.model");
const User = require("../models/User.model");
const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config")
const {format} = require('date-fns');



router.get("/detail/add", isLoggedIn, (req, res, next) => {
  res.render("tools/create.ejs"); 
});

router.post("/detail/add", isLoggedIn, fileUploader.single("tool-img"), async (req, res, next) => {
  try {
    req.body.creator = req.session.user._id;
    if (req.file) {
      await Tool.create({
        toolName: req.body.toolName, 
        description: req.body.description,
        category: req.body.category, 
        img: req.file.path,
        downloadLink: req.body.downloadLink,
        creator: req.body.creator
      });
    } else
    { await Tool.create( req.body ); }
    res.redirect("/user/"); 
  } catch (error) {
    if (error.code === 11000) {
        return res
          .status(400)
          .render("tools/create", { errorMessage: "Program already registered in Database. Please create a program with a different name" });}
    console.log(error);
    res.redirect("/tools/detail/add", { errorMessage: 'Problem!' });
  }
});

router.get("/detail/:id", async (req, res, next) => {
  const { id } = req.params
  let isOwner = false;
  let isLoggedIn = false;
  const toolDetails = await Tool.findById(id)
  const date = toolDetails.createDate;
  const formattedDate = format(date, 'dd.MM.yyyy')
  try {
    if (req.session.user._id == toolDetails.creator) {
      isOwner = true; isLoggedIn = true
      res.render('tools/details.ejs', { toolDetails, isOwner, isLoggedIn, formattedDate })
    } else {
      isLoggedIn = true;
      res.render('tools/details.ejs', { toolDetails, isOwner, isLoggedIn, formattedDate })
    }
  } catch {
    res.render('tools/details.ejs', {toolDetails, isOwner, isLoggedIn, formattedDate})
  }
}); 

router.get("/detail/:id/edit", async (req, res, next) => {
  const { id } = req.params
  let isOwner=false
  const toolDetails = await Tool.findById(id)

  if (req.session.user._id == toolDetails.creator) {isOwner=true}
  res.render('tools/edit.ejs/', {toolDetails, isOwner})
})

router.post("/detail/:id/edit", fileUploader.single("tool-img"), async (req, res, next) => {
  const { id } = req.params
  if (req.file) {
    await Tool.findByIdAndUpdate(id, {
      toolName: req.body.toolName,
      description: req.body.description,
      category: req.body.category,
      img: req.file.path,
      downloadLink: req.body.downloadLink,
      creator: req.body.creator
    })
  } else {
    await Tool.findByIdAndUpdate(id, req.body);
  };
  res.redirect('/user/')
})

router.post("/detail/:id/rate", async (req, res, next) => {
  const { id } = req.params
  const userToBeUpdated = await User.findById(req.session.user._id)
  const data = await Tool.findById(id)

  try {
    // has user a rating for this tool?
    let hasRating = false;
    // if user already has a rating for this tool
    userToBeUpdated.ratings.forEach(async rating => {
    if (rating.tool == id) { 
      hasRating = true;
      const newRating = ((data.rating * data.numberOfRatings + (req.body.rating - rating.ratingValue)) / data.numberOfRatings).toFixed(1);
      rating.ratingValue = req.body.rating;
      await User.findByIdAndUpdate(req.session.user._id, userToBeUpdated)
      await Tool.findByIdAndUpdate(id, { rating: newRating });
      }
  })
  // if user rates for the first time
  if (!hasRating) {
    userToBeUpdated.ratings.push({ tool: id, ratingValue: req.body.rating })
    await User.findByIdAndUpdate(
    req.session.user._id, {
    $push: {ratings: userToBeUpdated.ratings}
  })
    const newRating = (((data.rating * data.numberOfRatings) + Number(req.body.rating)) / (data.numberOfRatings + 1)).toFixed(1);
    const newNumberOfRatings = data.numberOfRatings + 1;
    await Tool.findByIdAndUpdate(id, { rating: newRating, numberOfRatings: newNumberOfRatings }); 
  }
  res.redirect(`/tools/detail/${id}`); 
  } catch (error) {
    console.log(error)
  }
})
 
router.post("/detail/:id/delete", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Tool.findByIdAndDelete(id)
    res.redirect('/user')
})

router.post("/detail/:id/incrementDownloadCounter", async (req, res) => {
  const { id } = req.params;
  const toolToBeUpdated = await Tool.findById(id)
  if (toolToBeUpdated.downloadLink != "") {
    const newNumberOfDownloads = toolToBeUpdated.downloads + 1;
    await Tool.findByIdAndUpdate(id, { downloads: newNumberOfDownloads });
    console.log("number of downloads incremented");
    res.redirect(`${toolToBeUpdated.downloadLink}`);
  } else {
    
    res.render("error.ejs", {errorMessage: "This tool unfortunately has no download link."});
  }
  
})
  
module.exports = router; 