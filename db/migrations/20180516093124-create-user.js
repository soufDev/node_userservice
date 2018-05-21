module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
      notEmpty: true,
      unique: true,
      notNull: true
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING,
      notEmpty: true,
      unique: true
    },
    about: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
