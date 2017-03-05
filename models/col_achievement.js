const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Exercise = require('./col_exercise.js');
const User = require('./col_user.js');

const AchievementSchema = new Schema({
  username:{type:String,required:true},
  category: {type:String,default:'',required:true},
  exercises:{type:String,default:'',required:true},
})

exports.AchievementSchema = AchievementSchema;
module.exports = mongoose.model('Achievement',AchievementSchema);
