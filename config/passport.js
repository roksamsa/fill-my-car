import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

// Import database settings
import './database';
import '../models/user.model';

const users = mongoose.model('users');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  users.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'Email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));
