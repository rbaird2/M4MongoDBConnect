//** Code START
'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var express = require('express'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require('jsonwebtoken');


const app = require('./app');
//new code
//const mongoose = require('mongoose');

const MONGO_DATA_BASE = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

//Connect to database
mongoose.connect(MONGO_DATA_BASE) //, commented out to make code work
  //connection recipe
  // {
  //   useNewUrlParser: true,
  //   useCreateIndex: true
  // })
.then(con=>{
    console.log(con.connection);// log connection properties
    console.log(`The Database connection was successful with ${process.env.DATABASE}`);// log connection properties
  });

//const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//** Code END





  