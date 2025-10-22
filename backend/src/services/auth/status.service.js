import * as userModel from '../../models/users.models.js';
import AppError from '../../utils/appError.js';

const userStatusService = async (email) => {
  if (!email) throw new AppError('Please Enter Your Email', 404);

  const userStatus = await userModel.statusChangeTrue(email);

  return { message: 'Your status change successfully', userStatus };
};

const userStatusFalse = async (email) => {
  if (!email) throw new AppError('Please Enter Your Email', 404);

  const userStatus = await userModel.statusChangeFalse(email);
  return { message: 'Your status change successfully', userStatus };
};

export default {userStatusService, userStatusFalse};
