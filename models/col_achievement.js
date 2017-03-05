const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Exercise = require('./col_exercise.js');
const User = require('./col_user.js');

const AchievementSchema = new Schema({
  user_id:[{type: Schema.Types.ObjectId,ref:User}],
  category: {type:String,default:'',required:true},
  exercises:[{type: Schema.Types.ObjectId,ref:Exercise}]
})

exports.AchievementSchema = AchievementSchema;
module.exports = mongoose.model('Achievement',AchievementSchema);
