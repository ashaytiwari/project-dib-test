const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: String,
    expiryDate: Date,
    active: {
      type: Boolean,
      default: false
    },
    attachment: String,
    bidedUsers: [{
      userId: mongoose.Types.ObjectId,
      userName: String,
      email: String,
      bidAmount: Number
    }]
  }, {
  timestamp: true
}
);

module.exports = mongoose.model('projects', projectSchema);