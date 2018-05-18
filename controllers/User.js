import models from '../db/models';

export default class UserControler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  static async getAll() {
    const result = await models.User.findAll();
    return result;
  }
}
