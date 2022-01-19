import { Router } from 'express';
import authRequired from '../../middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import {
	conversationCreateHandler,
	conversationReadHandler,
	conversationsReadHandler,
} from './conversation.controller';
import { conversationCreateSchema } from './conversation.schema';
const conversationRoute = Router();

conversationRoute.post(
	'/',
	[authRequired, validateSchema(conversationCreateSchema)],
	conversationCreateHandler,
);
conversationRoute.get('/', conversationsReadHandler);
conversationRoute.get('/:id', conversationReadHandler);

export default conversationRoute;
