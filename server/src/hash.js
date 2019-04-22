const bcrypt = require('bcrypt');
// Some reference code from the website
// http://www.passportjs.org/docs/username-password/
// https://github.com/jaredhanson/passport-local
// https://stackoverflow.com/questions/34511021/passport-js-missing-credentials
// https://stackoverflow.com/questions/31407425/passport-js-always-executing-failureredirect
// Configure the registration part of passport
passport.use('register', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, callback) {
        if (password.length < 6) {
            return callback('The length of your passoword must be at least 4');
        } else {
            User.findOne({"username": username}, (err, result, count) => {
              if (err) { 
                  return callback(err); 
              } else if (result) { 
                  return callback('Username already been taken');
              } else {
                  bcrypt.hash(password, 10, (err, hash) => {
                      const newUser = new User({
                          username: username,
                          password: hash,
                          comments: [],
                          shoppingCart: []
                      });
                      newUser.save((err, user, count) => {
                          if (err) {
                              console.log(err);
                          } else {
                              req.session.user = user;
                              return callback(null, user);
                          }
                      });
                  });
              }
            });
        }
    }
  ));
  
  // Configure the login part of passport
  passport.use('login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, callback) {
        User.findOne({"username": username}, (err, result, count) => {
            if (err) {
                return callback(err);
            } else if (!result) {
                return callback('This user does not exist');
            } else {
                bcrypt.compare(password, result.password, (err, passwordCorrect) => {
                  if (passwordCorrect) {
                      req.session.user = result;
                      return callback(null, result);
                  } else {
                      return callback('Wrong password');
                  }
                });
            }
        });
    }
  ));