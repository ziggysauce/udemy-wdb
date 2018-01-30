const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Comment = require('../models/comment');

// Comments NEW
router.get('/new', isLoggedIn, (req,res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', {campground: campground});
    }
  })
});

// Comments CREATE
router.post('/', isLoggedIn, (req,res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // Add username and ID to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // Save comment
          comment.save();
          campground.comments.push(comment._id);
          campground.save();
          console.log(comment);
          res.redirect('/campgrounds/' + campground._id);
        }
      });
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