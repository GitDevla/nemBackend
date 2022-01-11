import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';

export default async (res: Response, body: Object = {}) => {
	res.status(200).json({ data: instanceToPlain(body), success: true });
};
