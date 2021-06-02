const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys-api');

const mongoose = require('mongoose');
const User = mongoose.model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.SECRET,
}

// options.issuer = 'accounts.examplesoft.com';
// options.audience = 'yoursite.net';

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try{
                const user = await User.findById(jwt_payload.userId).select('email _id companyId status');
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }catch (error){
                console.log('PASSPORT_ERROR: ', error)
            }
        })
    )
}


