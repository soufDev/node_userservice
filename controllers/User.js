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
    const result = await models.User.create(user);
    response.send(result);
  } catch (e) {
    console.error('Error Add User', e.message);
  }
}

export default { getAll, add };
