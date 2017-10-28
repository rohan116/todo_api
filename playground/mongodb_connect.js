const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('unable to connect to the server');
  }
  console.log('Connection to mongo db server successful');
  // var collection = "Todos";
  //   db.collection(collection).insertOne({
  //   text : "inserted using node js",
  //   flag : true,
  //   name : "rohan"
  // },(err,result) => {
  //   if(error){
  //     return console.log('unable to insert value to the collection');
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // })

  db.collection('Users').insertMany([{
    name : "Rohan",
    age : 25,
    location : "India"
  },
  {
    name: "Amishi",
    age : 25,
    location : "USA"
  }], (err,result) => {
    if(err){
      return console.log('Unable to insert multiple records')
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  })

  db.close();
})
