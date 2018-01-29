const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');

const Post = require('./models/post');
const User = require('./models/user');


// User.create({
//   email: 'bob@gmail.com',
//   name: 'Bob Belcher'
// });

Post.create({
  title: 'How to cook the best burger pt. 4',
  content: 'part 4 yo'
}, (err,post) => {
  User.findOne({email: 'bob@gmail.com'}, (err, foundUser) => {
    if(err) {
      console.log(err);
    } else {
      foundUser.posts.push(post._id);
      foundUser.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      })
    }
  });
});

// User.findOne({email: 'bob@gmail.com'}).populate('posts').exec((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });




// foundUser.posts.push(post._id)