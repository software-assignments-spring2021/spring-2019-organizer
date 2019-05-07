
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    // strategy configuration
    passport.use(new GoogleStrategy({
            clientID: '266661848887-c1k9k4o5etb29rt36t61sr5t1kdd3m3j.apps.googleusercontent.com',
            clientSecret: '6OSTNWm9NUQjd7JpbbkuVt4N',
            callbackURL: 'http://localhost:5000/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                email: profile.emails,
                token: token
            });
        }
    ));

    // put info to cookie
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // decode the cookie and persist the session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

};