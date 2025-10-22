import * as userModel from '../../models/users.models.js';
import AppError from '../../utils/appError.js';
import redisClient from '../../config/redis.js';
import bcrypt from 'bcrypt';

const userForgetPasswordService = async (email, password) => {
  if (!email || !password) throw new AppError('missing email and password', 404);

  const redisPassKey = `otp:forget-pass:${email}`;
  const stringHashPass = await redisClient.get(redisPassKey);

  if (!stringHashPass) throw new AppError('Error in server please try sometime later', 500);

  const redisPassInBcrypt = JSON.parse(stringHashPass);
  const verifyHashPass = await bcrypt.compare(password, redisPassInBcrypt);
  console.log('verify service pass:', verifyHashPass);

  const users = await userModel.forgetUserPassword(email, stringHashPass);

  return { message: 'SuccessFully update your Password', users };
};

export default userForgetPasswordService;
