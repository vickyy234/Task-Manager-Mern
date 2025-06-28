import { Router } from 'express';
import passport from 'passport';
import generateTokenAndRedirect from '../controllers/authController.js';

const router = Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: process.env.CLIENT_URL + '/login' }),
    generateTokenAndRedirect
);

export default router;