const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');
const middleware = require('../middleware')


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
router.post('/', middleware.isLoggedIn, (req,res) => {
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
router.get('/new', middleware.isLoggedIn, (req,res) => {
  res.render('campgrounds/new');
});


// SHOW - shows more info about one campground
router.get('/:id', (req,res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      // Render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req,res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', {campground: foundCampground});
  });
});


// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req,res) => {
  // Find and update correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      res.redirect('.campgrounds/');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});


// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, (req,res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;