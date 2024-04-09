const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    role: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);