// const connection =
//   'mongodb+srv://moti:1234@cluster0.5l2ct.mongodb.net/data-center-2?retryWrites=true&w=majority';
const connection = process.env.MONGODB_URI;
const mongoose = require('mongoose');
const {addLogger} = require("../actions/loggerDBActions"); 
const options = {
  useNewUrlParser: true,
  autoIndex: true,
  keepAlive: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
};



mongoose.connect(
  connection,
  options,

  () => {
    addLogger({ loggerId : 0, statusCode  : 200 , descriptionId  : 1, params : []})
    console.log('connected to database, ');
  }
);
mongoose.connection.on('error', (err) => {
  console.log(err);
});
