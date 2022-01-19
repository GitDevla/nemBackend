import { Request, Response } from 'express';
import { tokenType } from '../../model/types/tokenType';
import { NotFound } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { getConversation } from '../conversation/conversation.service';
import { findUserById } from '../user/user.service';
import { messageCreateType } from './message.schema';
import { createMessage } from './message.service';

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
