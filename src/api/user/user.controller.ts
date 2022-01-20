import { Request, Response } from 'express';
import { TokenType } from 'src/types/tokenType';
import { Conflict, NotFound } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { generateToken } from '../auth/auth.service';
import { CreateUserType, ReadUserType, UpdateUserType } from './user.schema';
import { createUser, findUserByEmail, findUserById, getAllUsers, updateUser } from './user.service';

export const createUserHandler = async (
	req: Request<{}, {}, CreateUserType['body']>,
	res: Response,
) => {
	const existingUser = await findUserByEmail(req.body.email);
	if (existingUser) throw new Conflict('Ez a felhasználó már létezik');
	const createdUser = await createUser(req.body);
	const token = await generateToken(createdUser);

	responseWrapper(res, { ...token, createdUser });
};

export const readUsersHandler = async (req: Request, res: Response) => {
	const users = await getAllUsers();
	const filtered = users.map(({ id, username }) => ({ id, username }));
	responseWrapper(res, filtered);
};

export const readUserHandler = async (req: Request<ReadUserType['params']>, res: Response) => {
	const user = await findUserById(req.params.id);
	responseWrapper(res, user);
};

export const updateUserHandler = async (
	req: Request<{}, {}, UpdateUserType['body']>,
	res: Response,
) => {
	const requestFrom: TokenType = res.locals.user;
	const user = await findUserById(requestFrom.userId);
	if (!user) throw new NotFound('Nincs ilyen felhasználó');
	const updatedUser = await updateUser(user, req.body);
	responseWrapper(res, updatedUser);
};
