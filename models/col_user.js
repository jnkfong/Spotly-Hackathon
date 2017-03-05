const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const Achievement = require('./col_achievement.js');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  // id:{type:Number},
  first_name: { type: String, default: '',required:true },
  last_name: { type: String, default: '',required:true },
  age:{ type: Number, default: '' },
  height:{ type: Number, default: '' },
  city:{ type: String, default: '',required:true },
  weight_goal:{ type: Number, default: '' },
  weight_current:{ type: String, default: '',required:true },
  body_fat_percentage:{type:Number,default:0},
  achievements:[{type:Schema.Types.ObjectId,ref:Achievement}],
  subscribed_status:{type:Boolean,required:true},
  email:{type:String,required:true},
  username:{type:String,required:true},
  hashed_username:{type:String},
  password: {type: String, required:true},
  friends_list:[{type: String}]
});
const validatePresenceOf = value => value && value.length;

// Hash the password
UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// Hash the username
UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('username')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.username, salt, function(err, hash){
            if(err) return next(err);

            user.hashed_username = hash;
            next();
        });
    });
});


  /**
   * Backend Validations (check if existing)
   */
  UserSchema.path('email').validate(function (email, fn) {
    const User = mongoose.model('User');
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email: email }).exec(function (err, users) {
        fn(!err && users.length === 0);
      });
    } else fn(true);
  }, 'ERROR: Email already exists');

  UserSchema.path('username').validate(function (username, fn) {
    const User = mongoose.model('User');
    // Check only when it is a new user or when email field is modified
    if (this.isNew){
      User.find({ username:username }).exec(function (err, users) {
        fn(!err && users.length === 0);
      });
    } else fn(true);
  }, 'ERROR: Username already exists');



  /**
   * Statics
   */

  UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    load: function (options, cb) {
      options.select = options.select || 'name username';
      return this.findOne(options.criteria)
        .select(options.select)
        .exec(cb);
    }
  };



/**************static functions**************/
/* Usage:
    User.findByName(function(err, obj) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(obj); // return user object in JSON format
});

// UserSchema.statics.findByName = function(name, cb) {
  // return this.find({ name: new RegExp(name, 'i') }, cb);
// };
*/
module.exports = mongoose.model('User', UserSchema);
