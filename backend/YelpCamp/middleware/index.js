// All middleware functions
const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req,res,next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      // Check that there's no valid ID OR if DB returns null
      if (err || !foundCampground) {
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        // Does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that!');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in first!');
    res.redirect('back');
  }
}

middlewareObj.checkCommentOwnership = (req,res,next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back');
      } else {
        // Does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that!');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in first!');
    res.redirect('back');
  }
}

middlewareObj.isLoggedIn = (req,res,next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in first!');
  res.redirect('/login');
}

module.exports = middlewareObj;