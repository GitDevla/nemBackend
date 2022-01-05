import db from '../util/db';
import bcrypt from 'bcrypt';
import { registerType } from '../validator/userValidator';
import config from '../../config';

export const validatePassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await db.user.findFirst({ where: { email: email } });
	if (!user) return null;

	const isValid = await bcrypt.compare(password + config.encryption.papper, user.password);
	if (!isValid) return null;

	return user;
};

export const createUser = async (data: registerType) => {
	const { email, username, password } = data;
	const encryptedPass = await bcrypt.hash(
		password + config.encryption.papper,
		config.encryption.rounds,
	);

	const createdUser = await db.user.create({ data: { email, username, password: encryptedPass } });
	return createdUser;
};

export const getUser = async (email: string) => {
	return await db.user.findFirst({ where: { email: email } });
};
