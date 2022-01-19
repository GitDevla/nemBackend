import { Router } from 'express';
import { messageCreateHandler } from '../controller/messageController';
import authRequired from '../middleware/requireUser';
import validateSchema from '../middleware/schemaValidator';
import { messageCreateSchema } from '../validator/messageValidator';
const messageRoute = Router();

messageRoute.post('/', [authRequired, validateSchema(messageCreateSchema)], messageCreateHandler);

export default messageRoute;
