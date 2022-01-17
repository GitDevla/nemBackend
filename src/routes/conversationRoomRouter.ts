import { Router } from 'express';
import {
	conversationRoomCreateHandler,
	conversationRoomReadHandler,
	conversationRoomsReadHandler,
} from '../controller/conversationRoomController';
import authRequired from '../middleware/authRequired';
import validateSchema from '../middleware/schemaValidator';
import { conversationRoomCreateSchema } from '../validator/conversationRoomValidator';
const conversationRoomRoute = Router();

conversationRoomRoute.post(
	'/',
	[authRequired, validateSchema(conversationRoomCreateSchema)],
	conversationRoomCreateHandler,
);
conversationRoomRoute.get('/', conversationRoomsReadHandler);
conversationRoomRoute.get('/:id', conversationRoomReadHandler);

export default conversationRoomRoute;
