import { connect } from 'mongoose';
import Config from './config.dev';

const { dbHost, dbName } = Config;
const urlConnect = `mongodb://${dbHost}/${dbName}`;

const db = connect(urlConnect);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.info('success of connection to mongoDB');
});
export default db;
