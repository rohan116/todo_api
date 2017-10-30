const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if(err){
    return console.log('Could not connect the specified database')
  }
  console.log('Database connected successfully');

  // db.collection('Todos').find({flag:true}).toArray().then((res) => {
  //   console.log(JSON.stringify(res,undefined,2));
  // },(err) => {
  //   console.log('Error');
  // })

  db.collection('Todos').findOneAndUpdate(
    {_id : new ObjectID('59f412b5fbcc0631bccdffbe')},
    {
      $set : {flag : false}
    },{
      returnOriginal : false
    }
  ).then((res) => {
    console.log(JSON.stringify(res,undefined,2));
  },(err) => {
    console.log('Error');
  })

  db.collection('Users').update(
    {
      _id : new ObjectID('59f4151d8a294c319c1c6667')
    },{
      $set : {
        name : 'shaan'
      }
    },
    {
      returnOriginal : false
    }
  ).then((res) => {
    console.log(JSON.stringify(res,undefined,2));
  },(err) => {
    console.log('Error Updating')
  })

  db.close();
})
