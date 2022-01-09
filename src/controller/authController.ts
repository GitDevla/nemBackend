import { Request, Response } from 'express';
import { generateToken } from '../service/authService';
import { findUser } from '../service/userService';
import { InvalidParameter } from '../util/ApiErrors';
import responseWrapper from '../util/responseWrapper';
import { loginType } from '../validator/authValidator';

export const loginHandler = async (req: Request<{}, {}, loginType>, res: Response) => {
	const user = await findUser(req.body.email);
	const validPass = await user?.validatePassword(req.body.password);
	if (!(validPass && user)) throw new InvalidParameter('Rosz felhasználónév vagy jelszó');

	const token = await generateToken(user);
	responseWrapper(res, token);
};
