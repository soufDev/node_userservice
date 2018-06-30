import mongoose, { Schema, Model } from 'mongoose';
import userSchema from '../schemas/user';

class User {
  static findOne(id) {

  }
}

// export default (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     firstname: {
//       type: DataTypes.STRING
//     },
//     lastname: {
//       type: DataTypes.STRING
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           args: true,
//           msg: 'cannot be empty'
//         },
//         len: {
//           args: 3,
//           msg: 'must be at least 6 characters in length'
//         }
//       }
//     },
//     about: {
//       type: DataTypes.STRING
//     },
//     password: {
//       type: DataTypes.STRING
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           args: true,
//           msg: 'email cannot be empty'
//         },
//         isEmail: {
//           args: true,
//           msg: 'retry with another email syntax'
//         }
//       }
//     },
//     status: {
//       type: DataTypes.ENUM,
//       values: ['active', 'inactive'],
//       defaultValue: 'active'
//     }
//   }, {
//     defaultScope: {
//       attributes: { exclude: ['password'] },
//       indexes: [
//         {
//           unique: true,
//           fields: ['email', 'username']
//         }
//       ]
//     }
//   });
//   User.associate = (models) => {
//     // associations can be defined here
//   };
//   return User;
// };
