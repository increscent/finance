var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var config = require('./config');
for (var i in config.route_types) {
  var router = require('./routes/' + config.route_types[i]);
  app.use('/', router);
}

app.listen(45678);
console.log('App listening on port: 45678');
