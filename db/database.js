
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'database_test',
    host: 'database',
    dialect: 'mysql',
    dialectOptions: {
      socketPath: '/var/run/mysqld/mysqld.sock'
    },
    define: {
      paranoid: true
    }
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'database_test',
    host: 'database',
    dialect: 'mysql',
    dialectOptions: {
      socketPath: '/var/run/mysqld/mysqld.sock'
    },
    define: {
      paranoid: true
    }
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      socketPath: '/var/run/mysqld/mysqld.sock'
    },
    define: {
      paranoid: true
    }
  }
}
