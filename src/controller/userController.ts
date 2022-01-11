import { Request, Response } from 'express';
import { createUser, findUser } from '../service/userService';
import { Conflict } from '../util/ApiErrors';
import responseWrapper from '../util/responseWrapper';
import { registerType } from '../validator/userValidator';

export const registerHandler = async (req: Request<{}, {}, registerType>, res: Response) => {
	const existingUser = await findUser(req.body.email);
	if (existingUser) throw new Conflict('Ez a felhasználó már létezik');
	const createdUser = await createUser(req.body);
	responseWrapper(res);
};
