import { Request, Response } from 'express';
import { TokenType } from 'src/types/tokenType';
import { NotFound } from 'src/util/ApiErrors';
import responseWrapper from 'src/util/responseWrapper';
import { findUserById } from '../user/user.service';
import { UpdateProfileType } from './profile.schema';
import { updateProfile } from './profile.service';

export const updateUserInfoHandler = async (
	req: Request<{}, UpdateProfileType['body']>,
	res: Response,
) => {
	const token: TokenType = res.locals.user;
	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');

	const updated = await updateProfile(user, req.body);

	responseWrapper(res, updated);
};
