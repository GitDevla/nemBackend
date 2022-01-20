import { Router } from 'express';
import { default as authRequired, default as requireUser } from '../../middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import {
	createConversationHandler,
	deleteConversationHandler,
	readConversationHandler,
	readConversationsHandler,
} from './conversation.controller';
import { CreateConversationSchema } from './conversation.schema';
const conversationRoute = Router();

// CREATE
conversationRoute.post(
	'/',
	[authRequired, validateSchema(CreateConversationSchema)],
	createConversationHandler,
);

// READ
conversationRoute.get('/', requireUser, readConversationsHandler);
conversationRoute.get('/:id', requireUser, readConversationHandler);

// DELETE
conversationRoute.delete('/:id', [requireUser], deleteConversationHandler);

export default conversationRoute;
