import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

export default async (res: Response, body: Object = {}, status = 200) => {
	res.status(status).json({ data: instanceToPlain(body), success: true });
};
