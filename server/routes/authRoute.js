import { Router } from 'express';
import passport from 'passport';
import generateTokenAndRedirect from 'jsonwebtoken';

const router = Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    generateTokenAndRedirect
);