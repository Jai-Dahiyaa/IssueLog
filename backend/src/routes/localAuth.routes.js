import express from 'express';
import signUpController from '../controller/auth/localAuth.controller.js';
import signUpOTPVerifyController from '../controller/auth/AuthVerifyOTP.controller.js';
import roleAssignController from '../controller/auth/roleAssign.controller.js';
import loginController from '../controller/auth/login.controller.js';
import statusChangeController from '../controller/auth/status.controller.js';
import { verifyAccessToken, verifyRefreshToken } from '../middleware/verifyToken.js';
import refreshTokenController from '../controller/auth/refreshToken.controller.js';
import logoutController from '../controller/auth/logout.controller.js';
import forgetPassword from '../controller/auth/forgetPassword.controller.js';
import loginOTPController from '../controller/auth/loginOTP.controller.js';
import { validate } from '../middleware/validate.middlewre.js';
import {
  signUpSchema,
  signUpOTPSchema,
  roleAssignSchema,
  loginSchema,
  statusChangeSchema,
  refreshTokenSchema,
  forgetPasswordSchema,
  forgetOTPVerifySchema,
  resetPasswordSchema,
  loginOTPSendSchema,
  loginOTPVerifySchema,
} from '../validators/auth.validation.js';

const router = express.Router();

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: User profile status change
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jaiotp@gmail.com
 *               password:
 *                 type: string
 *                 example: jai@123
 *     responses:
 *       200:
 *         description: OTP sent successfully your email
 *       400:
 *         description: Invalid input
 */
router.post('/signUp', validate(signUpSchema), signUpController);

/**
 * @swagger
 * /auth/signUpOTP:
 *   post:
 *     summary: Verify OTP and register user in database
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: jaiotp@gmail.com
 *               otp:
 *                 type: string
 *                 example: "273849"
 *     responses:
 *       200:
 *         description: OTP Verify user successfully register
 *       400:
 *         description: Invalid input
 */
router.post('/signUpOTP', validate(signUpOTPSchema), signUpOTPVerifyController);

/**
 * @swagger
 * /auth/roleassign:
 *   post:
 *     summary: Assign role to user and return updated tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: "company"
 *     responses:
 *       200:
 *         description: User Register Sucessfully
 *       400:
 *         description: Invalid input
 */
router.post('/roleassign', validate(roleAssignSchema), roleAssignController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and return access and refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jaiotp@gmail.com
 *               password:
 *                 type: string
 *                 example: jai@123
 *     responses:
 *       200:
 *         description: Welcome Back
 *       400:
 *         description: Invalid input
 */
router.post('/login', validate(loginSchema), loginController);

/**
 * @swagger
 * /auth/statusChange:
 *   post:
 *     summary: Authenticate user and return access and refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: true and false
 *     responses:
 *       200:
 *         description: Your status change successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  '/statusChange',
  verifyAccessToken,
  validate(statusChangeSchema),
  statusChangeController
);

/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Verify token from cookie and issue new access & refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: New access and refresh tokens issued successfully
 *       401:
 *         description: Invalid or expired token
 *       400:
 *         description: Missing refresh token
 *     cookies:
 *       refreshToken:
 *         type: string
 *         description: Refresh token stored in HTTP-only cookie
 */
router.post(
  '/refreshToken',
  verifyRefreshToken,
  validate(refreshTokenSchema),
  refreshTokenController
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out user by clearing authentication cookies
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully, cookies cleared
 *       400:
 *         description: Logout failed due to missing or invalid session
 */
router.post('/loggedOut', verifyAccessToken, logoutController);

/**
 * @swagger
 * /auth/forgetPassword:
 *   post:
 *     summary: Send OTP to user's email for password reset request
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: jaiotp@gmail.com
 *     responses:
 *       200:
 *         description: otp send successfully your email
 *       400:
 *         description: Invalid input
 */
router.post(
  '/forgetPassword',
  validate(forgetPasswordSchema),
  forgetPassword.forgetUserPasswordController
);

/**
 * @swagger
 * /auth/forget-otp-verify:
 *   post:
 *     summary: Verify OTP and allow user to reset password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: jaiotp@gmail.com
 *               otp:
 *                 type: string
 *                 example: 235434
 *     responses:
 *       200:
 *         description: Password Reset OTP Verify
 *       400:
 *         description: Invalid input
 */
router.post(
  '/forget-otp-verify',
  validate(forgetOTPVerifySchema),
  forgetPassword.forgetPaawordOTPVerify
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Change user password after authentication
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pass1
 *               - pass2
 *             properties:
 *               pass1:
 *                 type: string
 *                 example: dsgd453423
 *               pass2:
 *                 type: string
 *                 example: dsgd453423
 *     responses:
 *       200:
 *         description: Your password change successfull
 *       400:
 *         description: Invalid input
 */
router.post('/reset-password', validate(resetPasswordSchema), forgetPassword.resetNewUserPassword);

/**
 * @swagger
 * /auth/login-otp:
 *   post:
 *     summary: Send OTP to user's email for login authentication
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: jai@gmail.com
 *     responses:
 *       200:
 *         description: Login OTP send your email Successfully
 *       400:
 *         description: Invalid input
 */
router.post('/login-otp', validate(loginOTPSendSchema), loginOTPController.loginOTPController);

/**
 * @swagger
 * /auth/otp-login-verify:
 *   post:
 *     summary: Verify OTP and log in user with access token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *             properties:
 *               otp:
 *                 type: string
 *                 example: 244356
 *     responses:
 *       200:
 *         description: User Login SuccessFully
 *       400:
 *         description: Invalid input
 */
router.post(
  '/otp-login-verify',
  validate(loginOTPVerifySchema),
  loginOTPController.loginOTPuserVerify
);

export default router;
