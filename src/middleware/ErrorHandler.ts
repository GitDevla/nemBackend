import { Request, Response, NextFunction } from 'express';
import { APIError } from '../util/ApiErrors';
export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof APIError) {
		return res.status(err.statusCode).json({
			errorName: err.name,
			details: err.message,
			success: false,
		});
	}
	console.log(err);
	return res.status(500).json({
		errorName: 'INTERNAL_SERVER_ERROR',
		details: 'Ismeretlen szerverhiba történt',
		success: false,
	});
};
