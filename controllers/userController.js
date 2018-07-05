import User from '../db/services/user';
import logger from '../core/logger/app-logger';

class userController {
  static async getAll(request, response) {
    try {
      const users = await User.getAll();
      logger.info('sending all users');
      response.send(users);
    } catch (e) {
      logger.error(e.message);
      response
        .status(400)
        .json({ error: e.message })
        .end();
    }
  }

}

export default userController;
