import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import Config from '../core/config/dbConfig';

const sequelize = new Sequelize(
  Config.db_name, Config.db_username,
  Config.db_password, Config.options,
);

console.log(Config);
let db = {};
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default Object.assign({}, db, {
  sequelize,
  Sequelize
});
