import AppError from '../../utils/appError.js';
import * as userModel from '../../models/users.models.js';

const loginOTPService = async (email) => {
  if (!email) throw new AppError('email is missing', 404);

  const users = await userModel.userLoginOTPQuery(email);

  return { message: 'user login successfully', users };
};

export default loginOTPService;
