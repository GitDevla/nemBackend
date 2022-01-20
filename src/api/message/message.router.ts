import { Router } from 'express';
import authRequired from '../../middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import { createMessageHandler } from './message.controller';
import { CreateMessageSchema } from './message.schema';
const messageRoute = Router();

messageRoute.post('/', [authRequired, validateSchema(CreateMessageSchema)], createMessageHandler);

export default messageRoute;
