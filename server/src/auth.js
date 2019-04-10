
const GoogleStrategy = require('passport-google-    oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '266661848887-c1k9k4o5etb29rt36t61sr5t1kdd3m3j.apps.googleusercontent.com',
            clientSecret: '6OSTNWm9NUQjd7JpbbkuVt4N',
            callbackURL: 'http://localhost:3000'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};