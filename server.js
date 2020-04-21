import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Import database settings
import database from './database/database-setup';

// Listening
const portForDatabase = 5432;
const portForServer = 4000;
const portForApp = 4444;
const localDomainName = 'https://localhost';
const webDomainName = 'https://napolnimojavto.si';
const defaultDomainName = localDomainName;
const corsOptionsOrigin = defaultDomainName;
const path = require('path');
const consoleDivider = '\n******************************************\n';
const consoleMessage = 'Server runs on port: ';
const connectionMessageRunning =
'Connection from PostgreSQL database has been established successfully and it is running.';
const connectionMessageNotRunning = 'Unable to connect to the PostgreSQL database. Error:';

// Variables
const router = express.Router();
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const corsOptions = {
  origin: isProduction ? webDomainName : '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// Parse application/json
app.use(bodyParser.json());

app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, '')));
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

// Database
database.sequelize.sync().then(() => {
  console.log(consoleDivider);
  console.log(connectionMessageRunning);
  console.log(consoleDivider);
  initial();
}).catch((error) => {
  console.log(consoleDivider);
  console.error(connectionMessageNotRunning, error);
  console.log(consoleDivider);
});

function initial() {
  let tripPassengers = [{
      belongsToUser: 'kV6FwjmHrbZiJQwwBcBYO5EMJmq1',
      belongsToVehicle: '2',
      belongsToTrip: 'Citroen',
      tripPassengerSeatsReservation: 4,
      tripPassengerStartLocation: 'Citroen',
      tripPassengerEndLocation: 'silver',
      tripPassengerName: 'Citroen',
      tripPassengerEmail: 'Citroen',
      tripPassengerPhone: 'Citroen',
  }];
  // console.log(database);
  // Init data -> save to PostgreSQL
  const TripPassenger = database.tripPassengers;
  for (let i = 0; i < tripPassengers.length; i++) {
    TripPassenger.create(tripPassengers[i]);
  }
}

// Import data
require('./controller/auth');

app.use('/', router);
app.use(require('./controller/index'));
app.use(require('./controller/vehicles/vehicles.route'));
app.use(require('./controller/trips/trips.route'));
app.use(require('./controller/trip-passengers/trip-passengers.route'));
app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function(req, res, next) {
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", corsOptionsOrigin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(portForServer, function () {
  console.log(consoleDivider);
  console.log(consoleMessage + portForServer);
  console.log(consoleDivider);
});
