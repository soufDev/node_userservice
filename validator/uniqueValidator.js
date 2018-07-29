import { Types } from 'mongoose';
import User from '../db/services/user';

const usernameValidator = async (request, response, next) => {
  const user = await User.findOne({ username: request.body.user.username });
  if (user) {
    response.status(400).set('x-error', 'username.exist').end();
  } else {
    next();
  }
}
const emailValidator = async (request, response, next) => {
  const user = await User.findOne({ email: request.body.user.email });
  if (user) {
    response.status(400).set('x-error', 'email.exist').end();
  } else {
    next();
  }
}

const idObjectValidator = async (request, response, next) => {
  const { ObjectId } = Types;
  if (!ObjectId.isValid(request.params.id.toLowerCase())) {
    response.status(400).set('x-error', 'invalid.id.params').end();
  } else {
    next();
  }
}

const existUserValidation = async (request, response, next) => {
  const user = await User.findOne({ _id: Types.ObjectId(request.params.id) });
  if (user) {
    next();
  } else {
    response.status(404).set('x-error', 'user.not.found').end();
  }
}

export {
  usernameValidator,
  emailValidator,
  idObjectValidator,
  existUserValidation
}
