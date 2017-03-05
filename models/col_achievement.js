const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Exercise = require('./col_exercise.js');

const AchievementSchema = new Schema({
  category: [{type: Schema.Types.ObjectId,ref:Exercise}],
  goal: {type: Number, default:'',required:true},
  current: {type: Number, default:0},
  progress:{type:Number, default:0},
  planned_date: {type: Date, default: Date.now,required:true},
  achieved_date: {type:Date},
})


exports.AchievementSchema = AchievementSchema;
module.exports = mongoose.model('Achievement',AchievementSchema);