import { Router } from 'express';
import validateSchema from '../../middleware/schemaValidator';
import {
	createConversationHandler,
	deleteConversationHandler,
	readConversationHandler,
	readConversationsHandler,
	updateConversationHandler,
} from './conversation.controller';
import {
	CreateConversationSchema,
	DeleteConversationSchema,
	ReadConversationSchema,
	UpdateConversationSchema,
} from './conversation.schema';
const conversationRoute = Router();

// CREATE
conversationRoute.post('/', validateSchema(CreateConversationSchema), createConversationHandler);

// READ
conversationRoute.get('/', readConversationsHandler);
conversationRoute.get('/:id', validateSchema(ReadConversationSchema), readConversationHandler);

// Update
conversationRoute.put('/:id', validateSchema(UpdateConversationSchema), updateConversationHandler);

// DELETE
conversationRoute.delete(
	'/:id',
	validateSchema(DeleteConversationSchema),
	deleteConversationHandler,
);

export default conversationRoute;
