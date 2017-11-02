const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/mongoose/mongoose.js');
const {todo} = require('./../server/models/todo.js');
const {user} = require('./../server/models/user.js');


var id = '59fb3d9cb0ebe898db3dfe21';

// todo.find({
//   _id : id
// }).then((res) => {
//   console.log(res);
// })
//
// todo.findOne({
//   _id : id
// }).then((res) => {
//   console.log(res);
// })
//
// todo.findById(id).then((res) => {
//   console.log(res);
// })

if(ObjectID.isValid(id)){
  user.findById(id).then((res) => {
    if(!res){
      return console.log('Id not found')
    }
    console.log(res);
  }).catch((e) => {
    console.log(e);
  })
}
else {
  console.log('Id is not valid')
}
