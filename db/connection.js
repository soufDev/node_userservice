import Sequelize from 'sequelize';
import Config from '../core/config/dbConfig';

const sequelize = new Sequelize(
  Config.db_name, Config.db_username,
  Config.db_password, Config.options,
);
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been established !');
  } catch (e) {
    console.error('Unable to connect to the database.', e);
  }
}

export {
  sequelize,
  dbConnection
};
