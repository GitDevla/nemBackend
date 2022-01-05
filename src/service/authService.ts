import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const generateToken = async (user: User) => {
	const token = jwt.sign({ userId: user }, config.jwt.token, config.jwt.config);
	return token;
};

export const validateToken = async (token: string) => {
	const decodedToken = jwt.verify(token, config.jwt.token);
	return decodedToken;
};
