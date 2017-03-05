var express = require('express');
var app = express();
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var path = require("path");

var uri ='mongodb://localhost:27017';//connect to DB
var db = mongoose.connect(uri);

//Models
var User = require('./models/col_user.js');
var Exercise = require('./models/col_exercise.js');
var Achievement = require('./models/col_achievement.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();// create application/json parser
app.use(bodyParser.urlencoded({extended: true}));

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


app.get('/all_users',function(req,res){
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
/*User Views*/
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//REST API
// routes ======================================================================
/** Get object by User and Pass **/
app.post('/api/users', jsonParser, function(req, res) {
  // console.dir(req.body.username);
  // console.dir(req.body.password);
  User.find({'username':req.body.username},function(err,user){
    if (err){
      res.send(err);
    }else{
      //compare input password with hash
      console.log(req.body.password);
      // console.log(user);
      // console.log(user[0]['password']); //get array element

      if (user && bcrypt.compareSync(req.body.password, user[0]['password'])) {
        res.json(user); // return user object in JSON format
      }else{
        res.send("Not Found");
      }
    }
  });
});

app.listen(3000, function () {
  console.log('-Server running-')

})


/*Debug: register new collections*/
// var exercise = new Exercise(
//   {
//   exercise_name:'Running',
//   exercise_type:'Cardio',
//   exercise_measurement:'minutes',
//   exercise_time:'20',
//   }
// );
// exercise.save();
// console.log('Saved!');


// var achievement = new Achievement(
// {
// goal:20
// });
// achievement.save();
// console.log('Saved!');


// var user = new User(
// {
// first_name:'Matthew',
// last_name:'Fung',
// age:20,
// height:170,
// city:'Toronto',
// weight_goal:140,
// weight_current:135,
// subscribed_status:true,
// email:'fung2730@mylaurier.ca',
// username:'matthewfung',
// password:'123456',
// });
// user.save(function(err) {
//         if (err) {
//             console.log(err.message);
//             return next(err);
//         }
//           console.log('Saved!');
//         callback(user);
//     });
