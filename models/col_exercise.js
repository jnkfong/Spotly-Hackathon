const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  exercise_name:{type: String, default: '', required:true},
  exercise_type:{type: String, default: '',required:true },
  //depends on exercise_type
  exercise_measurement:{type:String,default:''}, //'kg/lbs' or 'minutes' or '# of reps'
  exercise_sets:{type:Number,default:0},
  exercise_reps:{type:Number,default:0},
  exercise_weight:{type:Number,default:0},
  exercise_time:{type:Number,default:0},
})

//relationship between AchievementSchema and ExerciseSchema:
//if category.exercise_type = Cardio : exercise_measurement = 'minutes'
//if category.exercise_type = Weights: exercise_measurement = 'kgs/lbs', exercise_sets = x, exercise_reps = x
// if category.exercise_type = Running : exercise_measurement = 'minutes'
exports.ExerciseSchema = ExerciseSchema;
module.exports = mongoose.model('Exercise', ExerciseSchema);
