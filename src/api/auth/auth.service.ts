import config from '@config';
import jwt from 'jsonwebtoken';
import { TokenType } from 'src/types/tokenType';
import { User } from '../user/user.model';

export const generateToken = async (user: User) => {
	const token = jwt.sign({ userId: user.id }, config.jwt.token, config.jwt.config);
	return { token };
};

export const validateToken = async (token: string) => {
	try {
		const decodedToken = jwt.verify(token, config.jwt.token);
		return decodedToken as TokenType;
	} catch (error) {
		return null;
	}
};
