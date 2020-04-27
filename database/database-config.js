Object.defineProperty(exports, "__esModule", {
  value: true
});

const host = 'localhost';
const username = 'roksam1';
const password = 'bger8jvCkd';
const database = 'roksam1_fill_my_car_postgres';
const dialect = 'postgres'; // Database management system type
const port = 5432;
const pool = {
  acquire: 30000,
  idle: 10000,
  max: 5,
  min: 0
};

const DBAuthorization = {
  host, username, password
};

const replication = {
  read: DBAuthorization,
  write: DBAuthorization
};

const DBConfig = {
  dialect,
  pool,
  username,
  password,
  port,
  database,
  replication
};

module.exports = DBConfig;

/*
PRODUCTION 1
const host = 'localhost';
const username = 'roksam1_R27OKs42';
const password = 'GXZ0#WHAP]_rV(725u';
const database = 'roksam1_fill_my_car_postgres';
const dialect = 'postgres'; // Database management system type
const port = 5432;
const pool = {
  acquire: 30000,
  idle: 10000,
  max: 5,
  min: 0
};

PRODUCTION 2
const host = 'localhost';
const username = 'roksam1';
const password = 'bger8jvCkd';
const database = 'roksam1_fill_my_car_postgres';
const dialect = 'postgres'; // Database management system type
const port = 5432;
const pool = {
  acquire: 30000,
  idle: 10000,
  max: 5,
  min: 0
};

DEVELOPMENT
const host = 'localhost';
const username = 'postgres';
const password = 'R27OKas72mas';
const database = 'fill-my-car-postgres';
const dialect = 'postgres'; // Database management system type
const port = 5432;
const pool = {
  acquire: 30000,
  idle: 10000,
  max: 5,
  min: 0
};

https://napolnimojavto.si/
roksam1_fill_my_car_postgres
roksam1_R27OKs42
GXZ0#WHAP]_rV(725u

roksam1_fill_my_car_postgres-> \conninfo
You are connected to database "roksam1_fill_my_car_postgres" as user "roksam1_R27OKs42" via socket in "/var/run/postgresql" at port "5432".
*/
