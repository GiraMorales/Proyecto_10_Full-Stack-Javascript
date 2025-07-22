const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    relatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rol: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next(); // solo si la password cambió
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = { User };
