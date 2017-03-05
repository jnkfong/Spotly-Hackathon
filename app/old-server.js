//Includes
var express = require('express');
var app = express();
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//connect to DB
var uri ='mongodb://localhost:27017';
var db = mongoose.connect(uri);

var User = require('../models/col_user.js');
var Exercise = require('../models/col_exercise.js');
var Achievement = require('../models/col_achievement.js');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();

//Run server
app.listen(3000, function () {
  console.log('-Server running-')
})

/*register new collections*/
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



/*Populate foreign Objects*/


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
      }
    }
  });
});

/** Get object by User and Pass  *
app.post('/api/todos', function(req, res) {

// create a todo, information comes from AJAX request from Angular
Todo.create({
text : req.body.text,
done : false
}, function(err, todo) {
if (err)
res.send(err);

// get and return all the todos after you create another
Todo.find(function(err, todos) {
if (err)
res.send(err)
res.json(todos);
});
});

});
*/

//
// // delete a todo
// app.delete('/api/todos/:todo_id', function(req, res) {
//     Todo.remove({
//         _id : req.params.todo_id
//     }, function(err, todo) {
//         if (err)
//             res.send(err);
//
//         // get and return all the todos after you create another
//         Todo.find(function(err, todos) {
//             if (err)
//                 res.send(err)
//             res.json(todos);
//         });
//     });
// });
