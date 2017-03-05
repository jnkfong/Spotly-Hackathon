//Includes
var express = require('express');
var app = express();
var path = require("path");

const mongoose = require('mongoose');

//connect to DB
var uri ='mongodb://localhost:27017';
var db = mongoose.connect(uri);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var User = require('./models/col_user.js');

//register new user
// var user = new User({firstname:'Matt'});
// user.save();

//Routing
app.use("/theme/css", express.static(path.join(__dirname, '/theme/css')));
app.use("/theme/js", express.static(path.join(__dirname, '/theme/js')));
app.use("/theme/fonts", express.static(path.join(__dirname, '/theme/fonts')));
app.use("/theme/sass", express.static(path.join(__dirname, '/theme/sass')));
app.use("/img", express.static(path.join(__dirname, '/img')));
app.use("/views", express.static(path.join(__dirname, '/views')));
app.use("/", express.static(path.join(__dirname, '/templates')));
app.use("/profile", express.static(path.join(__dirname, '/templates/profile.html')));

//Views
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+ "/templates/index.html"));
})


app.get('/users',function(req,res){
  mongoose.model('User').find(function(err,user){
  res.send(user);
});
});

app.post('/login',function(req,res){
	
	console.log(req.body);
	mongoose.model('User').find({
	  username:req.body.username, 
	  password:req.body.password},
	  function(err,user){
		 console.log("</login>" + "Username:" + user.username);
		 if(typeof user == "undefined"){
			 res.send("Incorrect");
		 }
		 else{
			res.send(user);
		 }
	});
});


//Run server
app.listen(3000, function () {
  console.log('-Server running-')

})
