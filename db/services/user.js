import mongoose from 'mongoose';
import userSchema from '../schemas/User';

class User {
  static getAll() {
    return this.find({});
  }

  static add(user) {
    return user.save();
  }

  static update(_id, user) {
    return this.findByIdAndUpdate(_id.toString(), user);
  }

  static deleteAll() {
    return this.remove({});
  }
}

userSchema.loadClass(User);
export default mongoose.model('User', userSchema);
