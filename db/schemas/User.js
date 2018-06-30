import { Schema } from 'mongoose';

const userShema = Schema({
  username: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  firstname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String
  }
});

export default userShema;
