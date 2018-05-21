import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import models from '../db/models';

const getAll = async (request, response) => {
  try {
    const result = await models.User.findAll();
    response.send(result);
  } catch (e) {
    console.error('Error User Get All', e.message);
    response.send(e);
  }
};

const add = async (request, response) => {
  try {
    const { user } = request.body;
    const { password } = request.body.user;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (error, hash) => {
      if (error) {
        response.status(404).json(error).end();
      } else {
        const result = await models.User
          .create({ ...user, password: hash })
          .catch(Sequelize.ValidationError, (validationError) => {
            const err = validationError.errors[0];
            response.status(404).json({
              attribute: err.path,
              type: err.type,
              validatorKey: err.validatorKey,
              message: err.message
            });
          });
        response.status(201).json(result).end();
      }
    })
  } catch (e) {
    console.error('Error Add User', e.message);
  }
}

export default { getAll, add };
