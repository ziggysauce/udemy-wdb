const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgrounds = [
  {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
  {name: 'Granite Hill', image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg'}
];

// Landing Page
app.get('/', (req,res) => {
  res.render('landing');
});

// Campgrounds GET
app.get('/campgrounds', (req,res) => {
  res.render('campgrounds', {campgrounds: campgrounds});
});

// Campgrounds POST
app.post('/campgrounds', (req,res) => {
  // Get data from form and add to campground array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  // Redirect back to campgrounds page
  res.redirect('/campgrounds');
});

// New campgrounds form
app.get('/campgrounds/new', (req,res) => {
  res.render('new.ejs');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});