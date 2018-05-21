export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active'
    }
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    }
  });
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
