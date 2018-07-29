import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import User from '../db/services/user';
import logger from '../core/logger/app-logger';

class userController {
  static async getAll(request, response) {
    try {
      const users = await User.getAll();
      const toJson = users.map(user => user.toJSON());
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
      const id = Types.ObjectId(request.params.id);
      const userToUpdate = User({ ...user, _id: id });
      const errors = await userToUpdate.validateSync();
      if (errors) {
        const jsonError = errors.toJSON();
        logger.error({ jsonError });
        response
          .status(400)
          .json({ ...jsonError })
          .end();
      } else {
        const updatedUser = await User.update(id, userToUpdate);
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

  static async findOne(request, response) {
    const id = Types.ObjectId(request.params.id.toLowerCase());
    const user = await User.get(id);
    response.status(200).json({ user: user.toJSON() }).end();
  }

  static async delete(request, response) {
    const id = Types.ObjectId(request.params.id.toLowerCase());
    const deleteResult = await User.delete(id);
    response.status(204).set('x-code', 'success.delete.user').end();
  }
}

export default userController;
