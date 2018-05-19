import models from '../db/models';

export default {
  getAll: async (request, response) => {
    try {
      const result = await models.User.findAll();
      response.send(result);
    } catch (e) {
      console.error('User Get All', e.message);
    }
  },
  add: async (request, response) => {
    try {
      const { user } = request.body;
      const result = await models.User.create(user);
      response.send(result);
    } catch (e) {
      console.error('Add User', e.message);
    }
  }
}
