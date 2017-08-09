var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var budget_routes = require('./routes/budget_routes');
app.use('/', budget_routes);
var transaction_routes = require('./routes/transaction_routes');
app.use('/', transaction_routes);
var analysis_routes = require('./routes/analysis_routes');
app.use('/', analysis_routes);

app.listen(45678);
console.log('App listening on port: 45678');
