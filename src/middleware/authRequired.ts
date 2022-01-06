import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../service/authService';
import { Unauthorized } from '../util/ApiErrors';

export default async (req: Request, res: Response, next: NextFunction) => {
	const token = req.body.token;
	if (!token) throw new Unauthorized('Kérlek jeletkezzbe');

	const decoded = await validateToken(token);
	if (!decoded) throw new Unauthorized('Kérlek jeletkezzbe');
	console.log(decoded);

	res.locals.user = decoded;
	next();
};
