const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const helmet = require('helmet');
const morgan = require('morgan');

// Import database settings
const database = require('./database/database-setup');

// Is in production?
const isProduction = true;

// Other variables
const portForDatabase = 5432;
const portForServer = 4000;
const portForSSLServer = 4433;
const localDomainName = 'localhost';
const webDomainName = 'napolnimojavto.si';
const corsOptionsOrigin = 'https://' + defaultDomainName;

// All console messages
const consoleDivider = '\n******************************************\n';
const consoleServerMessage = 'Server runs on port: ';
const consoleDatabaseMessage = 'Database runs on port: ';
const connectionMessageRunning =
'Connection from PostgreSQL database has been established successfully and it is running.';
const connectionMessageNotRunning = 'Unable to connect to the PostgreSQL database. Error:';
const consoleAppRunningTypeMessagePROD = 'Application is in PRODUCTION mode.';
const consoleAppRunningTypeMessageDEV = 'Application is in DEVELOPMENT mode.';

var consoleAppRunningTypeMessage = '';
var defaultDomainName = '';
var defaultDomainPort = '';
var defaultServerType;

// Variables
const router = express.Router();
const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Parse application/x-www-form-urlencoded
/*app.use(bodyParser.urlencoded({
  extended: true
}));*/

app.use(helmet());

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

app.use(morgan('combined'));

/*
app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err);
  res.stat*+us(500).send();
});*/

// Database setup
database.sequelize.sync().then(() => {
  console.log(consoleDivider);
  console.log(connectionMessageRunning);
  console.log(consoleDatabaseMessage + portForDatabase);
  console.log(consoleDivider);
}).catch((error) => {
  console.log(consoleDivider);
  console.error(connectionMessageNotRunning, error);
  console.log(consoleDivider);
});

database.sequelize.query('SELECT * FROM' + database.vehicles).success(function(result) {
  console.log(result);
}).error(function(err) {
  console.log(err);
});

/*
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
*/

// Import data
require('./controller/auth');

app.use('/', router);
app.use(require('./controller/index'));
app.use(require('./controller/vehicles/vehicles.route'));
app.use(require('./controller/trips/trips.route'));
app.use(require('./controller/trip-passengers/trip-passengers.route'));

/*
app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, 'index.html'));
});*/

/*openssl req -nodes -new -x509 -keyout server.key -out server.cert*/

/*
  ciphers: [
    "ECDHE-RSA-AES128-SHA256",
    "DHE-RSA-AES128-SHA256",
    "AES128-GCM-SHA256",
    "RC4",
    "HIGH",
    "!MD5",
    "!aNULL"
  ].join(':'),
*/
/*
const privateKey = fs.readFileSync('../../../ssl/keys/b351d_e230f_15fa5903a5f402bb43354e5d9824b0a8.key');
const certificate = fs.readFileSync('../../../ssl/certs/napolnimojavto_si_b351d_e230f_1595587392_a295722e91b17b4374eb34f11128255f.crt');*/

const privateKey = fs.readFileSync('server-key.pem');
const certificate = fs.readFileSync('server-crt.pem');
const ca = fs.readFileSync('ca-crt.pem');

const options = {
  root: path.join(__dirname, ''),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

const optionsSSL = {
  root: path.join(__dirname, '/'),
  key: privateKey,
  cert: certificate,
  ca: ca,
  requestCert: true,
  rejectUnauthorized: true,
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

/*
  ignoreHTTPSErrors: true,
*/

// HTTPS Server (SSL)
const serverHTTPS = https.createServer(optionsSSL, app);

// HTTP Server
const serverHTTP = http.createServer(options, app);

if (isProduction === true) {
  defaultDomainName = webDomainName;
  defaultDomainPort = portForSSLServer;
  defaultServerType = serverHTTPS;
  consoleAppRunningTypeMessage = consoleAppRunningTypeMessagePROD;
} else {
  defaultDomainName = localDomainName;
  defaultDomainPort = portForServer;
  defaultServerType = serverHTTP;
  consoleAppRunningTypeMessage = consoleAppRunningTypeMessageDEV;
}

app.listen(8000);

defaultServerType.listen(defaultDomainPort, app, () => {
  console.log(consoleDivider);
  console.log(consoleAppRunningTypeMessage);
  console.log(consoleServerMessage + defaultDomainPort);
  console.log(consoleDivider);
});

//CORS middleware
const corsMiddleware = function(req, res, next) {
  // Update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", corsOptionsOrigin);
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
};

app.use(corsMiddleware);
