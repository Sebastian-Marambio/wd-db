const router = require("express").Router();
const bodyParser = require('body-parser')
const Tool = require("../models/Tool.model");
const User = require("../models/User.model")

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page */ 
router.get("/", async (req, res, next) => {
  let data = await Tool.find().sort({rating: -1});
  res.render("index", {data});
  
});

router.post("/", urlencodedParser, async (req, res, next) => {
  let data = await Tool.find()
  console.log(req.body.filter);
  if (req.body.filter === 'all') {
    if (req.body.sort === 'rating') {
      data = await Tool.find().sort({rating: -1});
   }
   else if (req.body.sort === 'downloads') {
     data = await Tool.find().sort({downloads: -1});
   }
   else if (req.body.sort === 'alphabetically') {
     data = await Tool.find().collation({'locale':'en'}).sort({toolName: 1});
   }
   else if (req.body.sort === 'by-date') {
    data = await Tool.find().sort({createDate: -1});
  }}
  else {
    if (req.body.sort === 'rating') {
      data = await Tool.find({category: req.body.filter}).sort({rating: -1});
   }
   else if (req.body.sort === 'downloads') {
     data = await Tool.find({category: req.body.filter}).sort({downloads: -1});
   }
   else if (req.body.sort === 'alphabetically') {
     data = await Tool.find({ category: req.body.filter }).collation({'locale':'en'}).sort({toolName: 1});
   }
   else if (req.body.sort === 'by-date') {
    data = await Tool.find({category: req.body.filter}).sort({createDate: -1});
  }  
}
  res.render("index", {data});
})

router.post('/search/', async (req, res, next) => {

  const searchResults = await Tool.find({$text: {$search: req.body.search}})
  res.render("results", {searchResults})
})

module.exports = router;
