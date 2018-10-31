const databasePort = '27017';
const databaseName = 'fill-my-car';

module.exports = {
  'secret':'meansecure',
  'database': `mongodb://localhost:${databasePort}/${databaseName}`
};
