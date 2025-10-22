import * as usersModels from '../../models/users.models.js';
import AppError from '../../utils/appError.js';
import * as socialLogin from '../../models/socialLogin.models.js';
import { profileInserData } from '../../models/profile.models.js';

const oauthServiceFunction = async (profile) => {
  if (!profile) throw new AppError(`Platfrom auth problem Please try again`, 500);

  const platform = profile.provider;
  const id = profile.id;
  const name = profile.displayName || profile.username || 'NoName';
  const email = profile.emails?.[0]?.value || null;
  const photo = profile.photos?.[0]?.value || null;

  if (!platform, !id, !name, !email, !photo)
    throw new AppError('Not provide Perfect user detail', 400);

  const userData = {
    platform,
    platformId: id,
    name,
    email,
    photo,
  };

  const findUser = await usersModels.findByEmail(userData.email);

  if (findUser) {
    console.log('find userf', findUser.id, findUser.email);

    const updateUsers = await socialLogin.updateSocialLogin(
      userData.platform,
      userData.platformId,
      findUser.id
    );

    console.log(updateUsers);

    return { message: 'Welcome Back', user: findUser, social: updateUsers };
    // throw new AppError('User Already Register', 409);
  } else {
    const insertUserSocailData = await usersModels.oauthLoginSocial(userData.email);

    const authUserData = {
      id: insertUserSocailData.id,
      email: insertUserSocailData.email,
    };

    const socialLoginDB = await socialLogin.socialLogin(
      authUserData.id,
      userData.platform,
      userData.platformId
    );

    console.log('social Login successfull', socialLoginDB);

    const profileUpdate = await profileInserData(userData.name, userData.photo, authUserData.id);

    console.log('profile', profileUpdate);

    if (!authUserData.email && !authUserData.id)
      throw new AppError('Bad Request Please try again', 400);

    return {
      message: `user register successfully`,
      user: insertUserSocailData,
      social: socialLogin,
      profile: profileUpdate,
    };
  }
};

export default oauthServiceFunction;
