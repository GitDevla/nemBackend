import { Request, Response } from 'express';
import { TokenType } from '../../types/tokenType';
import responseWrapper from '../../util/responseWrapper';
import { CreateMessageType } from './message.schema';
import { createMessage } from './message.service';

export const createMessageHandler = async (
	req: Request<{}, {}, CreateMessageType['body']>,
	res: Response,
) => {
	const user: TokenType = res.locals.user;

	const createdmessage = await createMessage(req.body, user.userId);

	responseWrapper(res, createdmessage);
};
