var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//user Schema
var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index:{unique: true}},
  password: {type: String, required: true, select: false},
});

//hash the password before the user is saved
UserSchema.pre('save',function(next){
  var user = this;

  //hash password if user is new or password has been changed
  if (!user.isModified('password')) return next();

  //generate hash
  bcrypt.hash(user.password, null, null, function(err, hash){
    if(err) return next(err);

    user.password = hash;
    next();
  });

});

//Compare to saved password
UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

//return the model
module.exports = mongoose.model('User', UserSchema);
