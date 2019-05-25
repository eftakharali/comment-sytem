var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  name: {type: String},
  token: {type: String},

}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
