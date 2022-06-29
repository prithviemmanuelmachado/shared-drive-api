const mongoose = require('mongoose');
const secrets = require('../secrets.json');

const password = secrets.dbPassword;
const uri = secrets.dbURI.replace('<password>', password);

function init(callback)
{
  mongoose.connect(uri, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error',function (err)
  {
    console.log("Error on connecting to db");
    callback(err);
  });

  db.once('open', function() {
    console.log("Connected to db");
    callback(null);
  });
}


module.exports = init;