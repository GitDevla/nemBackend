import { Request, Response } from 'express';
import { tokenType } from '../../model/types/tokenType';
import { NotFound } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { findUserById } from '../user/user.service';
import { conversationCreateType, conversationReadType } from './conversation.schema';
import { createConversation, getAllConversations, getConversation } from './conversation.service';

export const conversationCreateHandler = async (
	req: Request<{}, {}, conversationCreateType>,
	res: Response,
) => {
	const token: tokenType = res.locals.user;

	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');
	const createdRoom = await createConversation(user, req.body);

	responseWrapper(res, createdRoom);
};

export const conversationsReadHandler = async (req: Request, res: Response) => {
	const posts = await getAllConversations();

	responseWrapper(res, posts);
};

export const conversationReadHandler = async (
	req: Request<conversationReadType, {}, {}>,
	res: Response,
) => {
	const posts = await getConversation(req.params.id);

	responseWrapper(res, posts);
};
