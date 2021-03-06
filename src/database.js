import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/userseparated', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
var db = mongoose.connection

db.on('error', function(err){
  console.log('connection error', err)
})

db.once('open', function(){
  console.log('Connection to DB successful')
})