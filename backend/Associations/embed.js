const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

// POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// USER - email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

const User = mongoose.model('User', userSchema);

const Post = mongoose.model('Post', postSchema);

// const newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "Hermione Granger"
// });

// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding. Go to potions class to elarn it!"
// });


// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// const newPost = new Post({
//   title: "Reflection on Apples",
//   content: "They are delicious"
// });

// newPost.save((err, post) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(post);
//   }
// });

User.findOne({name: "Hermione Granger"}, (err, user) => {
  if (err) {
    // console.log(err);
  } else {
    user.posts.push({
      title: "3 things I really hate",
      content: "Voldemort. Voldemort. Voldemort."
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});


// foundUser.posts.push(post._id)