const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    rol: {
      type: String,
      require: true,
      default: 'user',
      enum: ['admin', 'user']
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = { User };
