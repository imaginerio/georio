const LocalStrategy = require('passport-local').Strategy;
const { User } = require('@models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => Promise.resolve()
    .then(async () => {
      const user = await User.findByPk(id);
      done(null, user);
    })
    .catch(done));

  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => Promise.resolve()
        .then(async () => {
          const user = await User.findOne({ where: { email } });
          if (!user || !(await user.comparePassword(password))) {
            return done(null, null);
          }

          return done(null, user);
        })
        .catch(done)
    )
  );
};
