import bcrypt from 'bcrypt';
import User from '../db/services/user';
import logger from '../core/logger/app-logger';

class userController {
  static async getAll(request, response) {
    try {
      const users = await User.getAll();
      const toJson = users.map((user) => {
        const { _doc } = user;
        return _doc;
      });
      logger.info('sending all users');
      response.send({ users: toJson });
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
        const userToStore = User({ ...user, password: hash });
        const err = await userToStore.validateSync();
        if (err) {
          logger.error(err);
          response
            .status(400)
            .json({ errors: err.errors })
            .end();
        } else {
          const newUser = await User.add(userToStore);
          response.status(201).json({ ...newUser.toJSON() }).end();
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

  static async update(request, response) {
    try {
      const { user } = request.body;
      const userToUpdate = User({ ...user, _id: request.params.id })
      const errors = await userToUpdate.validateSync();
      if (errors) {
        logger.error({ errors });
        response
          .status(400)
          .json({ ...errors })
          .end();
      } else {
        const updatedUser = await User.update(request.params.id, userToUpdate);
        response.status(200).json({ user: userToUpdate.toJSON() }).end();
      }
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
