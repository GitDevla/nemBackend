import { Request, Response } from 'express';
import { Conflict } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { generateToken } from '../auth/auth.service';
import { CreateUserType } from './user.schema';
import { createUser, findUserByEmail, getAllUsers } from './user.service';

export const createUserHandler = async (req: Request<{}, {}, CreateUserType>, res: Response) => {
	const existingUser = await findUserByEmail(req.body.email);
	if (existingUser) throw new Conflict('Ez a felhasználó már létezik');
	const createdUser = await createUser(req.body);
	const token = await generateToken(createdUser);

	responseWrapper(res, token);
};

export const readUsersHandler = async (req: Request, res: Response) => {
	const users = await getAllUsers();
	responseWrapper(res, users);
};
