const _ = require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./mongoose/mongoose.js');
const {todo} = require('./models/todo.js');
const {user} = require('./models/user.js');
const {authenticate} = require('./middleware/authenticate.js');


var port = process.env.PORT || 3000;
var app = express();

app.use(bodyparser.json());

app.post('/users',(req,res) => {
  var body = _.pick(req.body,["email","password"]);
  //console.log(hashedPassword);
  var users = new user({
    email : body.email,
    password : body.password
  });
  users.save().then(() => {
    return users.generateAuthToken();
  },(err) => {
    res.status(400).send(err);
  }).then((token) => {
    res.header('x-auth',token).send({_id : users._id , email : users.email});
  });
});

app.post('/todos',authenticate,(req,res) => {
  console.log(req.users);
  var todo_new = new todo({
    text : req.body.text,
    completed : req.body.completed,
    createdBy : req.users._id
  })

  todo_new.save().then((doc) => {
    res.send(doc);
  },(error) => {
    res.status(400).send(error);
  })
});

// app.get('/todos',(req,res) => {
//   todo.find({completed : false}).then((todos) => {
//     res.send({todos});
//   },(e) => {
//     res.status(400).send(e);
//   });
// });

app.get('/todos',authenticate,(req,res) => {
  todo.find({createdBy : req.users._id}).then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;
  if(ObjectID.isValid(id))
  {
    todo.findById(id).then((doc) => {
      if(!doc){
        res.send({id: "Id not found"})
         console.log('Id not found');
      }
      else{

        if(doc.createdBy.toString() == req.users._id.toString()){
          res.send(doc);
        }
        else{
          res.send("This todo is not created by you. Kindly search the ones created by you")
        }

      }
    })
  }
  else{
    res.send({id: "Id is invalid"})
    console.log('Id is invalid')
  }
})

app.delete('/todos/:id',authenticate,(req,res) =>{
    var id = req.params.id;
    if(ObjectID.isValid(id)){

      todo.findById(id).then((doc) => {
        if(!doc){
          res.send({id: "Id not found"})
           console.log('Id not found');
        }
        else{
          if(doc.createdBy.toString() == req.users._id.toString()){
            todo.findByIdAndRemove({_id : id}).then((todo) => {
              if(!todo){
                res.status(400).send();
              }
              else{
                  res.send(JSON.stringify(todo,undefined,2));
              }
            })
          }
          else{
            res.send("This todo is not created by you. Kindly delete the ones created by you")
          }
        }
      })

      // todo.findByIdAndRemove({_id : '59f74735d30d263198679129'}).then((todo) => {
      //   if(!todo){
      //     res.status(400).send();
      //   }
      //   else{
      //       res.send(JSON.stringify(todo,undefined,2));
      //   }
      // });
    }
    else{
      res.status(400).send();
    }
})

app.patch('/todos/:id',authenticate,(req,res) =>{
  var id = req.params.id;
  console.log(id);
  var body = _.pick(req.body,["text","completed"]);

  todo.findById(id).then((doc) => {
    if(!doc){
      res.send({id: "Id not found"})
       console.log('Id not found');
    }
    else{
      if(doc.createdBy.toString() == req.users._id.toString()){
        if(_.isBoolean(body.completed) && body.completed){
          body.completedOn = new Date().getTime();
        }else{
          body.completed = false;
          body.completedOn = null;
        }

        if(ObjectID.isValid(id)){
          todo.findByIdAndUpdate(id,{$set : body},{new : true}).then((doc) => {
            if(!doc){
              return res.status(400).send();
            }
            res.send(JSON.stringify(doc,undefined,2));
          })
        }
        else{
          res.status(400).send();
        }
      }
      else{
        res.send("This todo is not created by you. Kindly update the ones created by you")
      }
    }
  })
});

app.get('/users/me',authenticate,(req,res) => {
  res.send({_id : req.users._id , email : req.users.email})
})

app.post('/users/login',(req,res) => {
  //var body = req.body;
  var body = _.pick(req.body,['email','password']);

  user.findbyCredentials(body.email,body.password).then((result) => {
    return result.generateAuthToken().then((token) => {
      res.header('x-auth',token).send({_id : result._id , email : result.email});
    });
  }).catch((e) => {
    res.status(401).send();
  });
  //res.send(body);
});

app.delete('/users/me/token',authenticate,(req,res) => {
  req.users.deleteToken(req.token).then((reult) => {
    res.status(200).send();
  },() => {
    res.status(401).send();
  })
})

app.listen(port, () => {
  console.log('Started on port '+port);
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
