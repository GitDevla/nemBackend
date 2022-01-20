import jwt from 'jsonwebtoken';

export type TokenType = {
	userId: number;
} & jwt.JwtPayload;
