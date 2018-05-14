import dotenv from 'dotenv';

dotenv.load();
const { env } = process;
console.log(env);
export default {
  db_name: env.DB_NAME,
  db_username: env.DB_USERNAME,
  db_password: env.DB_PASSWORD,
  options: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_TYPE,
  }
}
