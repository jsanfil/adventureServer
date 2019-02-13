'use strict';

// Configure Authentication
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    fs = require('fs'),
    appRoot = require('app-root-path'),
    logger = require(appRoot+'/config/winston.js'),
    passport = require('passport');
require('dotenv').config({ path: appRoot+'/.env' });

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
var publicKey = fs.readFileSync(appRoot+process.env.COGNITO_PUBKEY, "utf8");
opts.secretOrKey = publicKey;
opts.ignoreExpiration = true; // For debugging only
opts.audience = process.env.COGNITO_AUDIENCE;
opts.issuer = process.env.COGNITO_ISSUER;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  logger.debug('ID Token: %j', jwt_payload);
  // logger.debug("Get token");
  var token_role = (jwt_payload['custom:roles'] === undefined) ? "user" : jwt_payload['custom:roles'];
  var user = {username: jwt_payload['cognito:username'],
              role: token_role};
  return done(null, user);
}));

module.exports = passport;