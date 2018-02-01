const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
});

//-----Encrypt password-----

//before saving model run this function
userSchema.pre('save', function(next) {

  const user = this; //user.email user.password

  //generate salt then run callback
  bcrypt.genSalt(10, function(err, salt) {

    if (err) {return next(err);}

    //encrypt password with salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {

      if (err) {return next(err);}

      //overwrite password with encrypted password
      user.password = hash;

      //save password
      next();
    });
  });

});

//Define methods

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err);}
    callback(null, isMatch);
  });
};

//Define class

const ModelClass = mongoose.model('user', userSchema);

//Export model
module.exports = ModelClass;