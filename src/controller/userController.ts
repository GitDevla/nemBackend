import { Request, Response } from 'express';
import { generateToken } from '../service/authService';
import { createUser, getUser, validatePassword } from '../service/userService';
import { Conflict, InvalidParameter } from '../util/ApiErrors';
import { loginType } from '../validator/authValidator';
import { registerType } from '../validator/userValidator';

export const registerHandler = async (req: Request<{}, {}, registerType>, res: Response) => {
	const existingUser = await getUser(req.body.email);
	if (existingUser) throw new Conflict('Ez a felhasználó már létezik');
	const createdUser = await createUser(req.body);
	res.send('New user created');
};
