import { Router } from 'express';
import {
	conversationCreateHandler,
	conversationReadHandler,
	conversationsReadHandler,
} from '../controller/conversationController';
import authRequired from '../middleware/requireUser';
import validateSchema from '../middleware/schemaValidator';
import { conversationCreateSchema } from '../validator/conversationValidator';
const conversationRoute = Router();

conversationRoute.post(
	'/',
	[authRequired, validateSchema(conversationCreateSchema)],
	conversationCreateHandler,
);
conversationRoute.get('/', conversationsReadHandler);
conversationRoute.get('/:id', conversationReadHandler);

export default conversationRoute;
