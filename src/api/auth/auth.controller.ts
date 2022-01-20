import { Request, Response } from 'express';
import { InvalidParameter } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { validatePassword } from '../user/user.service';
import { AuthType } from './auth.schema';
import { generateToken } from './auth.service';

export const authHandler = async (req: Request<{}, {}, AuthType['body']>, res: Response) => {
	console.log(req.body);

	const user = await validatePassword(req.body);
	if (!user) throw new InvalidParameter('Rosz felhasználónév vagy jelszó');

	const token = await generateToken(user);

	responseWrapper(res, { ...token, user });
};
