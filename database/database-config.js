export const DBConfig = {
  username: 'postgres',
  password: 'R27OKas72mas',
  database: 'fill-my-car-postgres',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
