import User from '../db/services/user';

const usernameValidator = async (request, response, next) => {
  const user = await User.findOne({ username: request.body.user.username });
  if (user) {
    response.status(400).json({ message: 'username.exist' }).end();
  } else {
    next();
  }
}
const emailValidator = async (request, response, next) => {

  const user = await User.findOne({ email: request.body.user.email });
  if (user) {
    response.status(400).json({ message: 'email.exist' }).end();
  } else {
    next();
  }
}

export {
  usernameValidator,
  emailValidator
}
