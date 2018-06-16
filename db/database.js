
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'database_development',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'database_test',
    host: '192.168.99.100',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
