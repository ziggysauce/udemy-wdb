const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'Once again Rusty wins cutest dog!',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE
// Calls on every route (DRY)
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  next();
});

// Landing Page
app.get('/', (req,res) => {
  res.render('landing');
});

// INDEX - get all campgrounds
// Campgrounds GET
app.get('/campgrounds', (req,res) => {
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
app.post('/campgrounds', (req,res) => {
  // Get data from form and add to campground array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc};

  // Create new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create new campground
// New campgrounds form
app.get('/campgrounds/new', (req,res) => {
  res.render('campgrounds/new');
});


// SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req,res) => {
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


// =======================
// COMMENTS ROUTES
// =======================

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req,res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', {campground: campground});
    }
  })
});


app.post('/campgrounds/:id/comments', isLoggedIn, (req,res) => {
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
          campground.comments.push(comment._id);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});


// ==========================
// AUTH ROUTES ==============
// ==========================

// Show register forms
app.get('/register', (req,res) => {
  res.render('register');
});

// Handle sign up logic
app.post('/register', (req,res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// Show login form
app.get('/login', (req,res) => {
  res.render('login');
});

// Handle login logic
app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
  }), (req,res) => {
});

// Logout route
app.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/campgrounds');
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});

