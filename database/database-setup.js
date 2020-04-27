const Sequelize = require('sequelize');
const DBConfig = require('./database-config'); // DB connection parameters

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
