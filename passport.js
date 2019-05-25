const passport = require('passport');
const { Strategy: GitHubStrategy }  = require('passport-github2');
const User = require('./models/User');


passport.serializeUser((user, done) => {
  done(undefined, user);
});

passport.deserializeUser(async (user, done) => {
  console.log('deserialize', { user });
  done(undefined, user);
});


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK
},
async (accessToken, refreshToken, profile, cb) => {
  try {
    const existingUser = await User.findOne({username: profile.username});
    if (existingUser) {
      return cb(undefined, existingUser);
    }
    const email = profile.emails && profile.emails[0].value;
    const user = await User.create({ username: profile.username, name: profile.displayName, email: email });
    return cb(undefined, user);
  } catch (err) {
    return cb(err);
  }

}
));









































































