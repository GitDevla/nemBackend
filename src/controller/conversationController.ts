import { Request, Response } from 'express';
import { tokenType } from '../model/types/tokenType';
import {
	createConversation,
	getAllConversations,
	getConversation,
} from '../service/conversationService';
import { findUserById } from '../service/userService';
import { NotFound } from '../util/ApiErrors';
import responseWrapper from '../util/responseWrapper';
import { conversationCreateType, conversationReadType } from '../validator/conversationValidator';

export const conversationCreateHandler = async (
	req: Request<{}, {}, conversationCreateType>,
	res: Response,
) => {
	const token: tokenType = res.locals.token;
	console.log(token);

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
