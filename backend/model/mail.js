const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  sender_mail: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sentDate: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  starred: {
    type: Boolean,
    default: false
  }
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;
