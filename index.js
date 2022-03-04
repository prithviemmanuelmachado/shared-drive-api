const database = require('./models/init');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const router = require('./routes');
const cookie_parser = require('cookie-parser');

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(cookie_parser());
app.use(router);


database(function(err){
  if(!err)
  {
      app.listen(port, ()=>{
          console.log(`API listening at http://localhost:${port}`);
      });
  }
});


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
