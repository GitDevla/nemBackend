import { User } from '../model/userModel';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const generateToken = async (user: User) => {
	const token = jwt.sign({ userId: user.id }, config.jwt.token, config.jwt.config);
	return { token };
};

export const validateToken = async (token: string) => {
	try {
		const decodedToken = jwt.verify(token, config.jwt.token);
		return { decodedToken };
	} catch (error) {
		return null;
	}
};
