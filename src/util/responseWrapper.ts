import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

export default async (res: Response, body: Object = {}) => {
	res.status(200).json({ data: instanceToPlain(body), success: true });
};
