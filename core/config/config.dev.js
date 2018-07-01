import ENV from './env';

const Config = {
  serverPort: ENV.SERVER_PORT || 9000,
  dbHost: ENV.DB_HOST || 'localhost',
  dbPassword: ENV.DB_PASSWORD || '',
  dbUser: ENV.DB_USER || 'root',
  dbPort: ENV.DB_PORT || '27017',
  dbName: ENV.DB_NAME || 'user-database'
};

export default Config;
