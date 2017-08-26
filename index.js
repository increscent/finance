var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var config = require('./config');
for (var i in config.route_types) {
  var route = config.route_types[i];
  var router = require('./routes/' + route + '_routes');
  app.use('/api/' + route, router);
}

// serve frontend files
app.use(express.static(__dirname + '/public'));

app.listen(45678);
console.log('Finance app listening on port: 45678');
