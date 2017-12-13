const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./models').mongoose;
const secrets = require('./config/secrets');
app.use(session({
    secret: secrets.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 6}
}));

const passportConfig = require('./config/passport_config');
passportConfig(app);

app.use('/api', function (req, res, next) {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  res.set({'Expires': date.toString()});
  next();
});

const route_config = require('./config/route_config');
for (var i in route_config.route_types) {
  var route = route_config.route_types[i];
  var router = require('./routes/' + route + '_routes');
  app.use('/api/' + route, router);
}

// serve frontend files
app.use(express.static(__dirname + '/public'));

app.listen(45678);
console.log('Finance app listening on port: 45678');
