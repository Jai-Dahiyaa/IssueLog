import request from 'supertest';
import app from '../src/index.js';
import redisClient from '../src/config/redis.js';
import db from '../src/db/db.js';

const testEmail = 'ok3@gmail.com'; // ✅ Use fresh email to avoid 409
const testPassword = 'jai@123';
let otpCode = '';

describe('Signup Route - /auth/signUp', () => {
  it('should send OTP and set refreshToken in cookie', async () => {
    const res = await request(app)
      .post('/auth/signUp')
      .send({ email: testEmail, password: testPassword });

    console.log('SIGNUP RESPONSE:', res.body); // ✅ Debug log

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Send OTP on your Gmail');

    // ✅ Check if cookie is set
    const cookies = res.headers['set-cookie'] || [];
    console.log('Cookies:', cookies);

    const hasRefreshToken = cookies.some(cookie => cookie.includes('refreshToken='));
    expect(hasRefreshToken).toBe(true);

    // ✅ Redis OTP check
    otpCode = await redisClient.get(`otp:${testEmail}`);
    console.log('OTP from Redis:', otpCode);

    expect(otpCode).toBeDefined();
  });
});

afterAll(async () => {
  try {
    await db.query(`DELETE FROM users WHERE email = '${testEmail}'`);
    await redisClient.del(`otp:${testEmail}`);
    await db.end();
  } catch (err) {
    console.error('Cleanup error:', err);
  }
}, 20000); // ✅ Increased timeout
