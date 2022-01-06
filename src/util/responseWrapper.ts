import { Response } from 'express';
export default async (res: Response, body: Object = {}) => {
	res.status(200).json({
		...body,
		success: true,
	});
};
