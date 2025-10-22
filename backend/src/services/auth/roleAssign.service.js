import * as userModel from "../../models/users.models.js";
import AppError from "../../utils/appError.js";

const roleAssignUsers = async (email, role) => {
if (!email || !role) throw new AppError(`Required Email and Role Please Enter`, 402);

const users = await userModel.insertUserRole(email, role);

return {messsage: `SuccessFully register users`, id:users.id, email:users.email, role:users.role, users}
}

export default roleAssignUsers;