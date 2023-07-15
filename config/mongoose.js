const mongoose = require('mongoose');
//mongoose.connect('mongodb://0.0.0.0:27017/athentication');
const DB = "mongodb+srv://bhatiashubham685:lApwmXuOaZWBOo3q@cluster0.6myayrv.mongodb.net/?retryWrites=true&w=majority"



 mongoose.connect(DB, {
useNewUrlParser: true,
 	useUnifiedTopology: true,
 });

const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'erroe connecting to db'));
// up and running then message
db.once('open',function(){
    console.log('Success fully connected to the database')
})