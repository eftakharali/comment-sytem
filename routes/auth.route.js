const { Router } = require('express');
const passport = require('passport');
const generateToken = require('../utils/createJwtToken');

const router = Router();

router.route('/test').get((req, res) => {
  res.send('Test successful');
})
router.route('/github').get(
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

router.route('/github/callback').get(passport.authenticate('github'), async (req, res) => {

  if (req.user){
    const token = generateToken(req.user.username)
    return res.json({user: req.user, token });
  } else {
    res.status(400).json({'message': 'Login failed'});
  }

});

router.route('/logout').get((req, res) => {
  req.logout();
  res.redirect('/home');
});

module.exports = router;

