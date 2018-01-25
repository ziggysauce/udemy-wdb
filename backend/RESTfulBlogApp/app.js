const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

const app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// MONGOOSE.MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Test Blog',
//   image: 'https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-0.3.5&s=ace8622c7094beceb5014dc585c62e18&auto=format&fit=crop&w=1350&q=80',
//   body: 'Hello this is a blog post'
// });

// RESTful ROUTES

app.get('/', (req,res) => {
  res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', (req,res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log('Error!');
      console.log(err);
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// NEW ROUTE
app.get('/blogs/new', (req,res) => {
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', (req,res) => {
  // create blog
  console.log(req.body);
  req.body.blog.body = req.sanitize(req.body.blog.body);
  console.log('===================');
  console.log(req.body);

  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render('new');
    } else {
      // then, redirect to index
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTE
app.get('/blogs/:id', (req,res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', (req,res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });
});

// UDPATE ROUTE
app.put('/blogs/:id', (req,res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      red.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// DELETE ROUTE
app.delete('/blogs/:id', (req,res) => {
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      // redirect somewhere
      res.redirect('/blogs');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});