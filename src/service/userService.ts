import { User } from '../model/userModel';
import bcrypt from 'bcrypt';
import { registerType } from '../validator/userValidator';
import config from '../../config';
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
	const encryptedPass = await bcrypt.hash(
		password + config.encryption.papper,
		config.encryption.rounds,
	);

	const createdUser = User.create({ email, username, password: encryptedPass });
	createdUser.save();

	return createdUser;
};

export const findUser = async (email: string) => {
	return await User.findOne({ email });
};
