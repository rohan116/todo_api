const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const bcryptjs = require('bcryptjs');
//Creating a schema
var UserSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
    minlength : 6,
    trim : true,
    unique : true,
    validate : {
      validator : (value) => {
        return validator.isEmail(value);
      },
      message : '{value} is not an email.'
    }
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  },
  tokens : [{
    access : {
      type : String,
      required : true
    },
    token : {
      type : String,
      required : true
    }
  }]
});


UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'Auth';
  var token = jwt.sign({_id : user._id.toHexString()},'abc123').toString();
  user.tokens.push({access,token});

  return user.save().then(() => {
    return token;
  })
}

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,'abc123');
  }
  catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id' : decoded._id,
    'tokens.token' : token,
    'tokens.access' : 'Auth'
  }).then((user) => {
    return user;
  })
};

UserSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcryptjs.genSalt(10,(err,salt) => {
      bcryptjs.hash(user.password,salt,(err,hash) => {
        user.password = hash;
        next();
      })
    })
  }
  else{
    next();
  }
})

var user = mongoose.model('Users',UserSchema);

module.exports = {user};
