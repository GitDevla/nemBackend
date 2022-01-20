import { Request, Response } from 'express';
import { TokenType } from 'src/types/tokenType';
import { NotFound, Unauthorized } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { findUserById } from '../user/user.service';
import { CreateConversationType, ReadConversationType } from './conversation.schema';
import {
	createConversation,
	deleteConversation,
	getAllConversationsUserHasAccessTo,
	getConversation,
} from './conversation.service';

export const createConversationHandler = async (
	req: Request<{}, {}, CreateConversationType['body']>,
	res: Response,
) => {
	const token: TokenType = res.locals.user;

	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');
	const createdRoom = await createConversation(user, req.body);

	responseWrapper(res, createdRoom);
};

export const readConversationsHandler = async (req: Request, res: Response) => {
	const user: TokenType = res.locals.user;
	const posts = await getAllConversationsUserHasAccessTo(user.userId);
	responseWrapper(res, posts);
};

export const readConversationHandler = async (
	req: Request<ReadConversationType['params']>,
	res: Response,
) => {
	const user: TokenType = res.locals.user;
	const posts = await getConversation(req.params.id);
	if (posts?.creator.id !== user.userId)
		throw new Unauthorized('Ezt a chat szobát nem nézheted meg');
	responseWrapper(res, posts);
};

export const deleteConversationHandler = async (req: Request, res: Response) => {
	// @ts-ignore //TODODODOD
	const success = await deleteConversation(req.params.id);

	responseWrapper(res);
};
