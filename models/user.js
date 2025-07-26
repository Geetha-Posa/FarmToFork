const mongoose = require('mongoose');

// define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['farmer', 'consumer'], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;