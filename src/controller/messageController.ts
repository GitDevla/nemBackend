import { Request, Response } from 'express';
import { tokenType } from '../model/types/tokenType';
import { getConversation } from '../service/conversationService';
import { createMessage } from '../service/messageService';
import { findUserById } from '../service/userService';
import { NotFound } from '../util/ApiErrors';
import responseWrapper from '../util/responseWrapper';
import { messageCreateType } from '../validator/messageValidator';

export const messageCreateHandler = async (
	req: Request<{}, {}, messageCreateType>,
	res: Response,
) => {
	const user: tokenType = res.locals.user;

	const creator = await findUserById(user.userId);
	if (!creator) throw new NotFound('Ez a felhasználó nem létezik');
	const conv = await getConversation(req.body.room);
	if (!conv) throw new NotFound('Ez a beszélgetés nem létezik');

	const createdmessage = await createMessage(req.body, creator, conv);

	responseWrapper(res, createdmessage);
};
