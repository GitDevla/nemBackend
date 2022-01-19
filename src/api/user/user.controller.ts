import { Request, Response } from 'express';
import { Conflict } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { generateToken } from '../auth/auth.service';
import { registerType } from './user.schema';
import { createUser, findUserByEmail } from './user.service';

export const registerHandler = async (req: Request<{}, {}, registerType>, res: Response) => {
	const existingUser = await findUserByEmail(req.body.email);
	if (existingUser) throw new Conflict('Ez a felhasználó már létezik');
	const createdUser = await createUser(req.body);
	const token = await generateToken(createdUser);

	responseWrapper(res, token);
};
