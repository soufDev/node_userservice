import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import models from '../db/models';

const { Op } = Sequelize;

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
        response.status(400).json(error).end();
      } else {
        const result = await models.User
          .create({ ...user, password: hash })
          .catch(Sequelize.ValidationError, (validationError) => {
            const errors = validationError.errors.map(err => ({
              attribute: err.path,
              type: err.type,
              validatorKey: err.validatorKey,
              message: err.message
            }));
            response.status(400).json({ validation_errors: errors });
          });
        response.status(201).json(result).end();
      }
    })
  } catch (e) {
    console.error('Error Add User', e.message);
  }
}

const update = async (request, response) => {
  const whereCondition = { id: request.params.id };
  const { user } = request.body;
  try {
    const updateResult = await models.User
      .update({
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        about: user.about,
        status: user.status
      }, {
        fields: ['email', 'username', 'firstname', 'lastname', 'about', 'status'],
        returning: true,
        where: whereCondition
      }).catch(Sequelize.ValidationError, (validationError) => {
        const errors = validationError.errors.map(err => ({
          attribute: err.path,
          type: err.type,
          validatorKey: err.validatorKey,
          message: err.message
        }));
        response.status(400).json({ validation_errors: errors });
      });
    if (updateResult[0] === 1) {
      response.status(204).json({ message: 'User updated with success' });
    } else {
      response.status(400).json({ message: 'an error was occurred' });
    }
  } catch (e) {
    console.error('Error update User', e.message);
  }
}

const getOne = async (request, response) => {
  try {
    const { param } = request.params;
    const user = await models.User.findOne({
      where: {
        [Op.or]: [
          { id: param },
          { username: param },
        ]
      }
    });
    if (user === null) {
      response.status(404).json({ message: 'User not found' });
    } else {
      response.status(200).json({ user });
    }
  } catch (e) {
    console.error('Error in get User', e.message)
  }
}

const deleteOne = async (request, response) => {
  const { param } = request.params;
  const idClause = Number.isNaN(parseInt(param, 10)) ? '-1' : param;
  try {
    const user = await models.User.destroy({
      where: {
        [Op.or]: [
          { id: idClause },
          { username: param }
        ]
      }
    });
    if (user === 0) {
      response.status(404).json({ message: 'User not found' });
    } else {
      response.status(200).json({ user });
    }
  } catch (e) {
    console.error('Error in delete User', e.message);
  }
}

export default {
  getAll,
  add,
  update,
  getOne,
  deleteOne
};
