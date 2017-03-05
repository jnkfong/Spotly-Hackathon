//Includes
var express = require('express');
var app = express();
const mongoose = require('mongoose');

//connect to DB
var uri ='mongodb://localhost:27017';
var db = mongoose.connect(uri);

var User = require('../models/col_user.js');

//register new user
// var user = new User({firstname:'Matt'});
// user.save();

//Views
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/users',function(req,res){
  mongoose.model('User').find(function(err,user){
  res.send(user);
});
});

//Run server
app.listen(3000, function () {
  console.log('-Server running-')

})
