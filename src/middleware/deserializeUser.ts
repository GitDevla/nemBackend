import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../service/authService';

export default async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.body.token;
	if (!accessToken) return next();

	const decoded = await validateToken(accessToken);
	if (!decoded) return next();

	res.locals.user = decoded;
	return next();
};
