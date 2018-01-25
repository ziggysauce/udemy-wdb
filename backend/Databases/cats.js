const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

// Pattern
const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// Methods
const Cat = mongoose.model('Cat', catSchema);


// adding a new cat to the DB
// const george = new Cat({
//   name: 'Mrs. Norris',
//   age: 7,
//   temperament: 'Evil'
// });

// george.save((err, cat) => {
//   if (err) {
//     console.log('something went wrong');
//   } else {
//     console.log('cat saved to database:');
//     console.log(cat);
//   }
// });

// Cat.create({
//   name: 'Snow White',
//   age: 15,
//   temperament: 'Bland'
// }, (err, cat) => {
//   if (err) {
//     console.log('Error: ');
//     console.log(err);
//   } else {
//     console.log('New cat: ');
//     console.log(cat);
//   }
// });


// retrieve all cats from the DB and console.log each one
Cat.find({}, (err, cats) => {
  if (err) {
    console.log('Error: ');
    console.log(err);
  } else {
    console.log('All the cats: ');
    console.log(cats);
  }
});