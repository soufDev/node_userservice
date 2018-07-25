import Mongoose from 'mongoose';
import logger from '../logger/app-logger';
import Config from './config.dev';

Mongoose.promise = global.Promise;

const dbConnection = async () => {
  const { dbHost, dbName, dbPort } = Config;
  const urlConnect = `mongodb://${dbHost}:${dbPort}/${dbName}`;
  try {
    logger.info(urlConnect);
    await Mongoose.connect(urlConnect, { useNewUrlParser: true });
    logger.info('Connected to Mongo');
  } catch (e) {
    logger.error(e.message);
  }

}
export default dbConnection;
