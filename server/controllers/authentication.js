const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {

  const timestamp = new Date().getTime();

  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);

}

exports.signin = function(req, res, next) {
  //user has already had their email and password auth'd
  //we just need to give them a token
  res.send({token: tokenForUser(req.user)});
};

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email or password'});
  }

  //Checking if a specific email exist or no
  User.findOne({email: email}, function(err, existingUser) {

//database connection doesn't exist
    if (err) {return (next(err));}

    //If an email exists return error

    if (existingUser) {
      return res.status(422).send({error: 'email is in use'});
    }

    //If an email address doesn't exist create user and save it

    const user = new User({

      email: email,
      password: password

    });

    user.save(function(err) {

      if (err) { return next(err);}

      //Respond  to  request indicating the user was created
      res.json({token: tokenForUser(user)});

    });
  });
};