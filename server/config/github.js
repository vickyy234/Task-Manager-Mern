import passport from "passport";
import { Strategy } from "passport-github2";
import User from "../models/User.js";

passport.use(new Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/github/callback',
},
    async (_accessToken, _refreshToken, profile, done) => { //unused parameters are prefixed with an underscore
        try {
            const existingUser = await User.findOne({ profileId: profile.id });
            if (existingUser) return done(null, existingUser);

            const newUser = await User.create({
                profileId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
                authProvider: profile.provider
            });
            return done(null, newUser);
        } catch (e) {
            console.error("Error in GitHub Strategy:", e);
            return done(e, null);
        }
    }
));