const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [String],
  learn: [String],
  coins: { type: Number, default: 0 },
  name: String,
  contact: String,
  country: String,
  degree: String,
  city: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
