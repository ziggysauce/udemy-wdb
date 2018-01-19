var express = require('express');
var app = express();

app.get('/', function(req, res) {
//   res.send('<h1>Welcome to the homepage</h1><h2>blah blah blah</h2>');
  res.render("home.ejs");
});

app.get('/fellinlovewith/:thing', function(req,res) {
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});

app.get('/posts', function(req,res) {
  var posts = [
    {title: 'Post 1', author: 'Susy'},
    {title: 'My adorable pet bunny', author: 'Charlie'},
    {title: 'Can you believe this pomsky?', author: 'Colt'},
  ];
  
  res.render('posts.ejs', {posts: posts});
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});