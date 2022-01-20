import jwt from 'jsonwebtoken';

export type tokenType = {
	userId: number;
} & jwt.JwtPayload;
