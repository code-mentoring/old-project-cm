import { User } from '../models/User';
import { BaseService } from './BaseService';

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  socialId: string;
  socialPic: string;
}

export interface UpdateUser extends CreateUser {
  id: string;
}
export interface GetUser {
  id: string;
}

export const UserService = new class extends BaseService<
  User,
  CreateUser,
  UpdateUser,
  GetUser
  > {
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
}(User);
