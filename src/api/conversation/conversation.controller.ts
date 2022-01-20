import { Request, Response } from 'express';
import { tokenType } from 'src/types/tokenType';
import { NotFound, Unauthorized } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { findUserById } from '../user/user.service';
import { CreateConversationType } from './conversation.schema';
import {
	createConversation,
	deleteConversation,
	getAllConversationsUserHasAccessTo,
	getConversation,
} from './conversation.service';

export const createConversationHandler = async (
	req: Request<{}, {}, CreateConversationType>,
	res: Response,
) => {
	const token: tokenType = res.locals.user;

	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');
	const createdRoom = await createConversation(user, req.body);

	responseWrapper(res, createdRoom);
};

export const readConversationsHandler = async (req: Request, res: Response) => {
	const user: tokenType = res.locals.user;
	const posts = await getAllConversationsUserHasAccessTo(user.userId);
	responseWrapper(res, posts);
};

export const readConversationHandler = async (req: Request, res: Response) => {
	const user: tokenType = res.locals.user;

	// @ts-ignore //TODODODOD
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
