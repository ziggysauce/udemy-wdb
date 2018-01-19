var express = require('express');
var app = express();

// "/" => "Hi there!"
app.get('/', function(req, res) {
  res.send('Hi there!');
});


// "/bye" => "Goobye!"
app.get('/bye', function(req, res) {
  res.send('Goodbye!!');
});


// "/dog" => "MEOW!"
app.get('/dog', function(req, res) {
  console.log('somebody made a request to /dog');
  res.send('MEOW!!');
});

// Use a colon to set a variable
app.get('/r/:subredditName', function(req, res) {
//   console.log(req.params);
  var subreddit = req.params.subredditName;
  res.send('WELCOME TO THE ' + subreddit.toUpperCase() + ' SUBREDDIT!');
});

app.get('/r/:subredditName/comments/:id/:title', function(req, res) {
  res.send('this is a comments page');
});

// Catch all (should be last)
// Order or routes matters
app.get('*', function(req, res) {
  res.send('you are a star');
});


// Tell Express to listen for requests (start server)

// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log('server has started');
// });

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});