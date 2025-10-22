import { Router } from 'express';
import passport from '../config/passport.js';
import oauthController from '../controller/oauth/oauth.controller.js';

const router = Router();

//google
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect user to Google OAuth2 login
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Handle Google OAuth2 callback and authenticate user
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: User authenticated via Google and tokens issued
 *       401:
 *         description: Invalid or expired Google token
 */
router.get('/google/callback', passport.authenticate('google', {session:false}),oauthController)

//github
/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Redirect user to GitHub OAuth2 login
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirect to GitHub login page
 */
router.get('/github', passport.authenticate('github', {scope: ['user:email']}))

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: Handle GitHub OAuth2 callback and authenticate user
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: User authenticated via GitHub and tokens issued
 *       401:
 *         description: Invalid or expired GitHub token
 */
router.get('/github/callback', passport.authenticate('github', {session:false}),oauthController)

//linkedin
/**
 * @swagger
 * /auth/linkedin:
 *   get:
 *     summary: Redirect user to LinkedIn OAuth2 login
 *     tags:
 *       - OAuth
 *     responses:
 *       302:
 *         description: Redirect to LinkedIn login page
 */
router.get('/linkedin', passport.authenticate('linkedin', {scope: ['r_emailaddress', 'r_liteprofile']}))


/**
 * @swagger
 * /auth/linkedin/callback:
 *   get:
 *     summary: Handle LinkedIn OAuth2 callback and authenticate user
 *     tags:
 *       - OAuth
 *     responses:
 *       200:
 *         description: User authenticated via LinkedIn and tokens issued
 *       401:
 *         description: Invalid or expired LinkedIn token
 */
router.get('/linkedin/callback', passport.authenticate('linkedin', {session: false}),oauthController)

export default router;