import { Router } from 'express';
import authRequired from '../../middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import { messageCreateHandler } from './message.controller';
import { messageCreateSchema } from './message.schema';
const messageRoute = Router();

messageRoute.post('/', [authRequired, validateSchema(messageCreateSchema)], messageCreateHandler);

export default messageRoute;
