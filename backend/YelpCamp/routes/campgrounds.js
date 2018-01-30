const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');


// INDEX - get all campgrounds
// Campgrounds GET
router.get('/', (req,res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - add new campground to DB
// Campgrounds POST
router.post('/', isLoggedIn, (req,res) => {
  // Get data from form and add to campground array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampground = {name: name, image: image, description: desc, author: author};

  // Create new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create new campground
// New campgrounds form
router.get('/new', isLoggedIn, (req,res) => {
  res.render('campgrounds/new');
});


// SHOW - shows more info about one campground
router.get('/:id', (req,res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // Render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;