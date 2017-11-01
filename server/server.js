const express = require('express');
const bodyparser = require('body-parser');

const {mongoose} = require('./mongoose/mongoose.js');
const {todo} = require('./models/todo.js');
const {user} = require('./models/user.js');

var app = express();

app.use(bodyparser.json());

app.post('/todos',(req,res) => {
  var todo_new = new todo({
    text : req.body.text,
    completed : req.body.completed
  })

  todo_new.save().then((doc) => {
    res.send(doc);
  },(error) => {
    res.status(400).send(error);
  })
});

app.get('/todos',(req,res) => {
  todo.find({completed : false}).then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})

// var newUser = new user({
//   email : ''
// });
//
// newUser.save().then((res) => {
//   console.log(JSON.stringify(res,undefined,2))
// },(err) => {
//   console.log('ERROR');
// });
