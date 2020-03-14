import mongoose from 'mongoose';

const databaseDomain = 'napolnimojavto.si';
const databasePort = '27017';
const databaseName = 'fill-my-car';

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

mongoose.connect(`mongodb://${databaseDomain}:${databasePort}/${databaseName}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
const consoleDivider = '\n\n******************************************\n';
const connectionMessage = 'Mongo database is running';

connection.once('open', () => {
  console.log(connectionMessage + consoleDivider)
});

module.exports = connection;
