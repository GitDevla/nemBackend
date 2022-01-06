import { Request, Response } from 'express';
import { createUser, getUser } from '../service/userService';
import { Conflict } from '../util/ApiErrors';
import { registerType } from '../validator/userValidator';
import responseWrapper from '../util/responseWrapper';

export const registerHandler = async (req: Request<{}, {}, registerType>, res: Response) => {
	const existingUser = await getUser(req.body.email);
	if (existingUser) throw new Conflict('Ez a felhasználó már létezik');
	const createdUser = await createUser(req.body);
	responseWrapper(res);
};
