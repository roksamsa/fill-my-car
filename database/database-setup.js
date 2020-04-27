const Sequelize = require('sequelize');
const DBConfig = require('./database-config'); // DB connection parameters

/*
const DBConfig = require('./database-config')[env]; // DB connection parameters
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/dbname');
const sequelize = new Sequelize('postgres://' + DBConfig.username + ':' + DBConfig.password + '@' + DBConfig.host + ':' + DBConfig.port + '/' + DBConfig.database);
*/

const sequelize = new Sequelize({
  database: DBConfig.database,
  dialect: DBConfig.dialect,
  username: DBConfig.username,
  password: DBConfig.password,
  operatorsAliases: '0',
  host: DBConfig.host,
  port: DBConfig.port,
  pool: {
    max: DBConfig.pool.max,
    min: DBConfig.pool.min,
    acquire: DBConfig.pool.acquire,
    idle: DBConfig.pool.idle
  }
});

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

// Models
database.vehicles = require('../controller/vehicles/vehicle.model')(sequelize, Sequelize);
database.trips = require('../controller/trips/trip.model')(sequelize, Sequelize);
database.tripPassengers = require('../controller/trip-passengers/trip-passenger.model')(sequelize, Sequelize);

module.exports = database;

/*fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf(".") !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize["import"](path.join(__dirname, file));
  database[model.name] = model;
});

Object.keys(database).forEach(function (modelName) {
  if ('associate' in database[modelName]) {
    database[modelName].associate(database);
  }
});*/
