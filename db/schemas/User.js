import { Schema } from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username.required'],
    minlength: [6, 'username.short.length'],
    unique: true,
  },
  lastname: {
    type: String
  },
  firstname: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'email.required'],
    validate: {
      validator: isEmail,
      message: 'invalid.email'
    },
    unique: true
  },
  password: {
    type: String,
    min: [8, 'password.short.length']
  },
  about: {
    type: String
  },
  active: {
    type: String,
    enum: [false, true],
    default: true
  }
});

export default userSchema;
