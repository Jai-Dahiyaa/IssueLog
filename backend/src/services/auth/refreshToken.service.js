import * as userModel from '../../models/users.models.js';
import AppError from '../../utils/appError.js';

const refreshTokenService = async (email) => {
  if (!email) throw new AppError('email not find unauthorized', 402);

  const users = await userModel.refreshRouteGetUsers(email);
  if (!users) throw new AppError('Users not find', 404);

  return { message: 'Refresh User successfully find', users };
};


export default refreshTokenService;