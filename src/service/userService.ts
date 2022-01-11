import { User } from '../model/userModel';
import { registerType } from '../validator/userValidator';
import { loginType } from '../validator/authValidator';

export const validatePassword = async (data: loginType) => {
	const user = await findUser(data.email);
	if (!user) return null;
	const isValid = await user.validatePassword(data.password);
	if (!isValid) return null;

	return user;
};

export const createUser = async (data: registerType) => {
	const { email, username, password } = data;

	const createdUser = User.create({ email, username });
	createdUser.setPassword(password);
	createdUser.save();

	return createdUser;
};

export const findUser = async (email: string) => {
	return await User.findOne({ email });
};
