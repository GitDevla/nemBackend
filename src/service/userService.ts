import db from '../util/db';
import bcrypt from 'bcrypt';
import { loginType } from '../validator/authValidator';

export const validatePassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const user = await db.user.findFirst({ where: { email: email } });
	if (!user) return null;

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return null;

	return user;
};
