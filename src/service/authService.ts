import jwt from 'jsonwebtoken';
import config from '../../config';
import { tokenType } from '../model/types/tokenType';
import { User } from '../model/userModel';

export const generateToken = async (user: User) => {
	const token = jwt.sign({ userId: user.id }, config.jwt.token, config.jwt.config);
	return { token };
};

export const validateToken = async (token: string) => {
	try {
		const decodedToken = jwt.verify(token, config.jwt.token);
		return decodedToken as tokenType;
	} catch (error) {
		return null;
	}
};
