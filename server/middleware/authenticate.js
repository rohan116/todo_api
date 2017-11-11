const {user} = require('./../models/user.js');


var authenticate = (req,res,next) => {
  var token = req.header('x-auth');
  //console.log(token);
  user.findByToken(token).then((users) => {
    if(!users){
        Promise.reject();
    }
    req.users = users;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
}

module.exports = {
  authenticate
}
