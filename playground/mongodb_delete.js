const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('unable to connect to the server');
  }
  console.log('Connection to mongo db server successful');

  db.collection('Todos').findOneAndDelete({_id : new ObjectID('59f42f7d9ac9ea26a7884f09')}).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  },(err) => {
    console.log('Unable to delete the specified document')
  })

  db.close();
})
