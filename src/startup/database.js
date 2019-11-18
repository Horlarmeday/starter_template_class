import mongoose from 'mongoose';
import winston from 'winston';

class Connection {
  constructor() {
    const url = process.env.MONGODB_URI || `mongodb://localhost/testDB`;
    winston.info('Establish new connection with url', url);
    console.log('Established DB connection');
    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(url);
  }
}

export default new Connection();
