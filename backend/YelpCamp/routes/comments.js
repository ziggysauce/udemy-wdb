const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware')


// Comments NEW
router.get('/new', middleware.isLoggedIn, (req,res) => {
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
router.post('/', middleware.isLoggedIn, (req,res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log('Error: ', err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', 'Something went wrong');
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
          req.flash('success', 'Successfully added comment!');
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// Comments EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req,res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash('error', 'Campground not found');
      return res.redirect('back');
    }
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash('error', 'Comment not found');
        res.redirect('back');
      } else {
        res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
      }
    });
  });
});


// Comments UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, (req,res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});


// Comment DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, (req,res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', 'Comment deleted!');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;