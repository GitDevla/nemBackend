import { Request, Response } from 'express';
import { generateToken } from '../service/authService';
import { validatePassword } from '../service/userService';
import { InvalidParameter } from '../util/ApiErrors';
import { loginType } from '../validator/authValidator';

export const loginHandler = async (req: Request<{}, {}, loginType>, res: Response) => {
	const user = await validatePassword(req.body);
	if (!user) throw new InvalidParameter('Rosz felhasználónév vagy jelszó');
	const token = await generateToken(user);
	res.send(token);
};
