import express from 'express';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import logger from 'morgan';
import favicon from 'serve-favicon';
import config from './config/database';
import ejs from 'ejs'

const api = require('./routes/api');
const app = express();

app.use(cors());

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() =>  console.log('Mongo database is running! :)'))
  .catch((err) => console.error(err));

app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/vehicles', express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

module.exports = app;
