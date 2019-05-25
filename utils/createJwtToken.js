
const jwt = require('jsonwebtoken');


module.exports  = function (username) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    username,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.JWT_SECRET || 'rento');
}