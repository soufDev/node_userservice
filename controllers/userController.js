import bcrypt from 'bcrypt';
import User from '../db/services/user';
import logger from '../core/logger/app-logger';

class userController {
  static async getAll(request, response) {
    try {
      const users = await User.getAll();
      logger.info('sending all users');
      response.send({ users });
    } catch (e) {
      logger.error(e.message);
      response
        .status(400)
        .json({ error: e.message })
        .end();
    }
  }

  static async add(request, response) {
    try {
      const { user } = request.body;
      const { password } = request.body.user;
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) {
          response.status(400).json({ error: 'required.password' }).end();
        }
        const userToStore = new User({ ...user, password: hash });
        const err = await userToStore.validateSync();
        if (err) {
          logger.error(err);
          response
            .status(400)
            .json({ errors: err.errors })
            .end();
        } else {
          const newUser = await User.add(userToStore);
          response.status(201).json({ ...newUser }).end();
        }
      })
    } catch (e) {
      logger.error(e.message);
      response
        .status(500)
        .json({ error: e })
        .end();
    }
  }

}

export default userController;
