import roleAssignUsers from '../../services/auth/roleAssign.service.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import utilsToken from '../../utils/token.js';

const roleAssignController = catchAsync(async (req, res) => {
  const { role } = req.body;
  if (!role) throw new AppError(`Required a role`, 403);

  const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) throw new AppError(`Token is Expire Please Try Again`, 401);

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

  const users = await roleAssignUsers(decoded.email, role);

  const payload = {
    id: users.id,
    email: users.email,
    role: users.role,
  };

  const generateNewToken = utilsToken.accessTokenGenerate(payload);
  const refreshToken = utilsToken.refreshTokenGenerate(payload);

  if (!generateNewToken) throw new AppError(`new token is not generate please try again`, 500);

  res.cookie('accessToken', generateNewToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 25 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: 'User Register Sucessfully', users: users.users });
});

export default roleAssignController;
