'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _secrets = require('./config/secrets');

var _secrets2 = _interopRequireDefault(_secrets);

var _passportConfig = require('./config/passportConfig');

var _passportConfig2 = _interopRequireDefault(_passportConfig);

var _apiRoutes = require('./apiLayer/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var mongoStore = (0, _connectMongo2.default)(_expressSession2.default);

app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
    secret: _secrets2.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: _mongoose2.default.connection }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 6 }
}));

(0, _passportConfig2.default)(app);

app.use('/api', _apiRoutes2.default);
app.use(_express2.default.static(__dirname + '/../public'));

app.listen(45678);
console.log('Finance app listening on port: 45678');