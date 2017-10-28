const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('unable to connect to the server');
  }
  console.log('Connection to mongo db server successful');

  db.collection('Todos').find({_id : new ObjectID("59f412b5fbcc0631bccdffbe")}).toArray().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log('Unable to fetch the data you requested');
  })

  db.close();
})
