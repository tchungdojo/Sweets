// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned

// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
// require('../models/customer');
var User = mongoose.model('User');

module.exports = (function() {
 return {
  userList: function(req, res) {
     User.find({}, function(err, results) {
       // console.log(results);
       if(err) {
         console.log(err);
       } else {
         // console.log(results);
         res.json(results);
       }
   })
  },

  userLogin: function(req, res) {
    User.findOne({email: req.body.email}, function(err, result){
      if(err){
          console.log('error with user login');
        } else {
          res.json(result);
        }
    })
  },

  userAdd: function(req, res) {
        var newUser = new User(req.body);
        newUser.save(function(err, result) {
        if(err) {
          console.log('error in registering user to db');
          } else {
          console.log(newUser.first_name + ' ' + newUser.last_name + ' has been added!');
          res.json(result);
          }
      }
    )},

    // userRemove: function(req, res) {
    //  console.log(req.body);
    //  user = {name: req.body.name, dateCreated: req.body.dateCreated};
    //  User.remove(user,function(err) {
    //   if(err) {
    //      console.log(err);
    //       } else {
    //      res.redirect('/');
    //       }
    //   })
    // }

}})();