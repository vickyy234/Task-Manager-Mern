import { Router } from 'express';
import passport from 'passport';
import generateTokenAndRedirect from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// Google routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: process.env.CLIENT_URL + '/' }),
    generateTokenAndRedirect
);

// GitHub routes
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: process.env.CLIENT_URL + '/login' }),
    generateTokenAndRedirect
);

// Verify route
router.get('/verify', authMiddleware, (req, res) => {
    res.status(200).end();
});

export default router;