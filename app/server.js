//Includes
var express = require('express')
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017');

//Views
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//Run server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//Connect to DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected');
});
