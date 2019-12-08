import { Schema } from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username.required'],
    minlength: [6, 'username.short.length'],
    unique: true
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
    validate: [(email) => isEmail(email), 'email.invalid'],
    unique: true
  },
  password: {
    type: String,
    min: [8, 'password.short.length'],
    select: false
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

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  getters: true,
  tranform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export default userSchema;
