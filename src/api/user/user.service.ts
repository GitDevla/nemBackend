import { AuthType } from '../auth/auth.schema';
import { User } from './user.model';
import { CreateUserType } from './user.schema';

export const validatePassword = async (data: AuthType) => {
	const user = await findUserByEmail(data.email);
	if (!user) return null;
	const isValid = await user.validatePassword(data.password);
	if (!isValid) return null;

	return user;
};

export const createUser = async (data: CreateUserType) => {
	const { email, username, password } = data;

	const createdUser = User.create({ email, username });
	createdUser.setPassword(password);
	createdUser.save();

	return createdUser;
};

export const findUserByEmail = async (email: string) => {
	return await User.findOne({ email });
};

export const findUserById = async (id: number) => {
	return await User.findOne({ where: { id } });
};

export const findUsersByIds = async (ids: number[]) => {
	const users = User.createQueryBuilder().where('id IN (:ids)', { ids }).getMany();
	return await users;
};

export const getAllUsers = async () => {
	return await User.find();
};
