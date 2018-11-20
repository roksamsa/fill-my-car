import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
const path = require('path');

// Listening
const listeningPort = 4000;
const consoleDivider = '\n******************************************\n\n';
const consoleMessage = 'Server runs on port ';

// Import database settings
import './config/database';

// Variables
const router = express.Router();
const app = express();

app.use(cors());
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'This is the secret',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Import data
app.use(require('./routes/index'));
app.use(require('./routes/vehicles.route'));
app.use(require('./routes/users.route'));
require('./config/passport');
require('./routes/auth');
app.use('/', router);

app.listen(listeningPort, function () {
  console.log(consoleDivider + consoleMessage + listeningPort);
});
