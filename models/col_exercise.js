const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name:{type: String, default: '', required:true},
  type:{type: String, default: '', required:true},
  description:{type:String,default:''},
  //depends on exercise_type
  measurement:{type:String,default:''}, //'kg/lbs' or 'minutes' or '# of reps'
  sets:{type:Number,default:0},
  reps:{type:Number,default:0},
  weight:{type:Number,default:0},
  time:{type:Number,default:0},
  goal: {type: Number, default:0,required:true},
  current: {type: Number, default:0},
  progress:{type:Number, default:0},
  planned_date: {type: Date, default: Date.now,required:true},
  achieved_date: {type:Date}
})

//relationship between AchievementSchema and ExerciseSchema:
//if category.exercise_type = Cardio : exercise_measurement = 'minutes'
//if category.exercise_type = Weights: exercise_measurement = 'kgs/lbs', exercise_sets = x, exercise_reps = x
// if category.exercise_type = Running : exercise_measurement = 'minutes'
exports.ExerciseSchema = ExerciseSchema;
module.exports = mongoose.model('Exercise', ExerciseSchema);
