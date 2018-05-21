import bcrypt from 'bcrypt';
import models from '../db/models';

const getAll = async (request, response) => {
  try {
    const result = await models.User.findAll();
    response.send(result);
  } catch (e) {
    console.error('Error User Get All', e.message);
  }
};

const add = async (request, response) => {
  try {
    const { user } = request.body;
    const { password } = request.body.user;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (error, hash) => {
      if (error) {
        throw error;
      }
      const result = await models.User.create({ ...user, password: hash });
      response.status(201).json(result);
    })
  } catch (e) {
    console.error('Error Add User', e.message);
  }
}

export default { getAll, add };
