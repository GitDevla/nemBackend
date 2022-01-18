import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../util/ApiErrors';

export default async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user;
	if (!user) throw new Unauthorized('Kérlek jeletkezzbe');
	return next();
};
