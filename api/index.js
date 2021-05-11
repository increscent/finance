#!/usr/local/bin/node

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import { getConfig } from './config/config.js';
import loginConfig from './config/loginConfig.js';
import apiRoutes from './apiLayer/apiRoutes.js';

const app = express();
const mongoStore = connectMongo(session);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: getConfig().SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 6}
}));

loginConfig(app);

app.use('/api', apiRoutes);
app.use(express.static(__dirname + '/../public'));

app.listen(45678);
console.log('Finance app listening on port: 45678');
