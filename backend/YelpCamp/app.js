const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg',
//     description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
//   }, (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Newly created campground');
//       console.log(campground);
//     }
//   });

// const campgrounds = [
//   {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
//   {name: 'Granite Hill', image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg'},
//   {name: 'Mountain Goat\'s Rest', image: 'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg'}
// ];

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
      res.render('index', {campgrounds: allCampgrounds});
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
  res.render('new.ejs');
});


// SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req,res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // Render show template with that campground
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});