import { Sequelize } from 'sequelize-typescript';
import { DBConfig } from './database-config'; // DB connection parameters

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

export const sequelize = new Sequelize({
  database: DBConfig.database,
  dialect: DBConfig.dialect,
  username: DBConfig.username,
  password: DBConfig.password,
  operatorsAliases: false,
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

module.exports = database;
