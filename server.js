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

const localDomainName = 'localhost';
const webDomainName = 'https://api.napolnimojavto.si/';
const corsOptionsOrigin = 'https://api.napolnimojavto.si/';
var defaultDomainName = '';

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
app.use(cors());
app.use(cookieParser());
app.use(helmet());

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

/*
database.sequelize.query('SELECT * FROM' + database.vehicles).success(function(result) {
  console.log(result);
}).error(function(err) {
  console.log(err);
});*/

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
app.use(require('./controller/vehicles/vehicles.route'));
app.use(require('./controller/trips/trips.route'));
app.use(require('./controller/trip-passengers/trip-passengers.route'));
app.use(require('./controller/index'));

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
const certificate = fs.readFileSync('../../../ssl/certs/napolnimojavto_si_b351d_e230f_1595587392_a295722e91b17b4374eb34f11128255f.crt');

const privateKey = fs.readFileSync('server-key.pem');
const certificate = fs.readFileSync('server-crt.pem');
const ca = fs.readFileSync('ca-crt.pem');


const privateKey = fs.readFileSync(path.join(__dirname, '../../ssl/keys/cadce_3af6d_caa9c3669e870d14e3e86ccb01ae9c96.key'), 'utf-8');
const certificate = fs.readFileSync(path.join(__dirname, '../../ssl/certs/api_napolnimojavto_si_cadce_3af6d_1595776936_cd5b3ba91450b4fdc96cd1f981386bee.crt'), 'utf-8');

  requestCert: true,
  rejectUnauthorized: true,*/

const privateKey = fs.readFileSync(path.join(__dirname, '../../ssl/keys/bfa16_51e29_ed5bd294115c0f62e6c12e443d26c7de.key'), 'utf-8');
const certificate = fs.readFileSync(path.join(__dirname, '../../ssl/certs/api_napolnimojavto_si_bfa16_51e29_1619550376_7ca0ed87ba2cd7628f91241ac394792b.crt'), 'utf-8');
const csr = fs.readFileSync(path.join(__dirname, '../../ssl/csrs/api_napolnimojavto_si_bfa16_51e29_e11cbd0a183ec1f6b93efa82820664af.csr'), 'utf-8');

const options = {
  root: path.join(__dirname, '/'),
  dotfiles: 'deny'
};

const optionsSSL = {
  root: path.join(__dirname, '/'),
  key: privateKey,
  crt: certificate,
  csr: csr,
  requestCert: false,
  rejectUnauthorized: false
};

/*
  ignoreHTTPSErrors: true,
*/

// HTTPS Server (SSL)
const serverHTTPS = https.createServer(optionsSSL, app);

// HTTP Server
const serverHTTP = http.createServer(app);

if (isProduction === true) {
  defaultDomainName = webDomainName;
  defaultServerType = serverHTTPS;
  consoleAppRunningTypeMessage = consoleAppRunningTypeMessagePROD;
} else {
  defaultDomainName = localDomainName;
  defaultServerType = serverHTTP;
  consoleAppRunningTypeMessage = consoleAppRunningTypeMessageDEV;
}

// Add CORS middleware headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', corsOptionsOrigin);
  res.header('Access-Control-Allow-Origin', defaultDomainName);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization, Origin');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/*
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, World Node.js!\n");
}).listen(process.env.PORT);
console.log('App deluje...');*/

serverHTTPS.listen(process.env.PORT, () => {
  console.log(consoleDivider);
  console.log(consoleAppRunningTypeMessage);
  console.log(consoleServerMessage);
  console.log(consoleDivider);
});
