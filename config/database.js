import mongoose from 'mongoose';

const databasePort = '27017';
const databaseName = 'fill-my-car';

mongoose.connect(`mongodb://localhost:${databasePort}/${databaseName}`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB running!')
});
