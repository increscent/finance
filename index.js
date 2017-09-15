var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
var secrets = require('./config/secrets');
app.use(session({ secret: secrets.session_secret}));

var passportConfig = require('./config/passport_config');
passportConfig(app);

var route_config = require('./config/route_config');
for (var i in route_config.route_types) {
  var route = route_config.route_types[i];
  var router = require('./routes/' + route + '_routes');
  app.use('/api/' + route, router);
}

// serve frontend files
app.use(express.static(__dirname + '/public'));

app.listen(45678);
console.log('Finance app listening on port: 45678');
