import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const path = require('path');

// Listening
const listeningPort = 4000;
const consoleDivider = '\n******************************************\n\n';
const consoleMessage = 'Server runs on port ';
const databaseDomainLocal = 'https://localhost/';
const databaseDomainWeb = 'https://napolnimojavto.si/';

// Import database settings
import './config/database';

// Variables
const router = express.Router();
const app = express();

app.use(cors());
app.use(cookieParser());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// Parse application/json
app.use(bodyParser.json());

app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'This is the Rocks72 secret',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.status(500).send();
});

// Import data
app.use(require('./routes/index'));
app.use(require('./routes/vehicles.route'));
app.use(require('./routes/trips.route'));
app.use(require('./routes/trip-passengers.route'));
require('./routes/auth');
app.use('/', router);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", databaseDomainLocal); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(listeningPort, function () {
  console.log(consoleDivider + consoleMessage + listeningPort);
});
