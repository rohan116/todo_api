const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = 'rohan';

bcryptjs.genSalt(10,(err,salt)=>{
  bcryptjs.hash(password,salt,(err,hash) => {
    console.log(hash);
  })
})

var hashedValue = '$2a$10$MuA5VEOBFZJ6IkpHKZa7Bexzqvl88.LFS4M0DZ3Mnlw8aVUdAm0iG';

bcryptjs.compare(password,hashedValue,(err,res) => {
  console.log(res);
})

// var token = jwt.sign('rohan','123abc');
// console.log(token);
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
// var message = 'This is user number 2';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
// var data = {
//   id : 4
// }
//
//  var token = {
//    data,
//    hash : SHA256(JSON.stringify(data) + "somesecret").toString()
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
// console.log(resultHash +" " + token.hash);
// if(resultHash === token.hash){
//   return console.log('Data is fine')
// }
// console.log('data was changed.')
