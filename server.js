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


/*User Views*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+ "/templates/index.html"));
})

/** Get Username and redirect link **/
app.post('/login', jsonParser, function(req, res) {
  // console.dir(req.body.username);
  // console.dir(req.body.password);
  User.find({'username':req.body.username},function(err,user){
    if (err){
      res.send(err);
    }else{
      //compare input password with hash
      //Debug: console.log("Username: " +user[0]['username']);
      //Debug: console.log("Password: " +user[0]['password']);

      if (user && bcrypt.compareSync(req.body.password, user[0]['password'])) {
            res.send(JSON.stringify({'redirect':'/profile.html','profile':req.body.username}));
      }else{
        res.send("Not Found");
      }
    }
  });
});

/** Get User object by Username (check username) **/
app.post('/getProfile', jsonParser, function(req,res){
  User.find({'username':req.body.profile},function(err,user){
    console.log(req.body.profile);
    if (err){
      res.send(err);
    }else{
        res.json(user); // return user object in JSON format
    }
  });
});

/** Get Achievements list object by Username **/
app.post('/getAchievements', jsonParser, function(req,res){
  User.find({'username':req.body.profile},function(err,user){
    console.log('Profile:'+req.body.profile);
    if (err){
        res.send(err);
    }else{
        res.json({'achievements':user['achievements']}); // return user object
    }
  });
});

/** Get Exercises list objects by achievement **/
app.post('/getExercises', jsonParser, function(req,res){
  Achievement.find({$and:[{'username':req.body.profile},{'achievement':req.body.achievement}]},function(err,achievement){
    console.log('Profile:'+req.body.profile);
    console.log('Achievement:'+req.body.achievement);
    if (err){
        res.send(err);
    }else{
        res.json({'exercises':achievement['exercises']}); // return exercise object list
    }
  });
});

/** Create Exercise objects **/
app.post('/createExercise', jsonParser, function(req,res){
  var new_exercise = new Exercise({
  name:req.body.exercise.name,
  type:req.body.exercise.type,
  description:req.body.exercise.description,
  measurement:req.body.exercise.measurement,
  sets:req.body.exercise.sets,
  reps:req.body.exercise.reps,
  weight:req.body.exercise.weight,
  time:req.body.exercise.time,
  goal:req.body.exercise.goal,
  current:req.body.exercise.current,
  progress:req.body.exercise.progress,
  achieved_date:req.body.exercise.achieved_date,
});
  new_exercise.save(function(err,new_exercise){
    if(err){
      res.send(err);
    }else{//should we save multiple exercises with one post request?
      res.json(201,new_exercise);
    }
});
});


/** Create Achievement objects **/
app.post('/createAchievement', jsonParser, function(req,res){
  var new_achievement = new Achievement({
    user_id:req.body.profile,
    category:req.body.category,
    //@TODO exercises:
    });

    if (err){
        res.send(err);
    }else{
        // res.json({'exerci':achievement['exercises']}); // return exercise object list
    }
});


//@TODO Search: find users based on first and last name

/** Populate achievemnets with exercises **/
// User
// .findOne({ user_id: 'Once upon a timex.' })
// .populate('_creator')
// .exec(function (err, story) {
//   if (err) return handleError(err);
//   console.log('The creator is %s', story._creator.name);
//   // prints "The creator is Aaron"
// });

/**Populate achievements with users**/


app.listen(3000, function () {
  console.log('-Server running-');
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
//
// user.save(function(err) {
//         if (err) {
//             console.log(err.message);
//             // return next(err);
//         }else{
//           console.log('Saved!');
// }
//
//         // callback(user);
//     });
