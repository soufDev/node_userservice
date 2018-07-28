import mongoose, { Types } from 'mongoose';
import userSchema from '../schemas/User';

class User {
  static getAll() {
    return this.find({});
  }

  static add(user) {
    return user.save();
  }

  static update(_id, user) {
    return this.findByIdAndUpdate(Types.ObjectId(_id), user);
  }

  static deleteAll() {
    return this.remove({});
  }

  static get(idOrUsername) {
    return this.findOne({})
  }
}

userSchema.loadClass(User);
export default mongoose.model('User', userSchema);
