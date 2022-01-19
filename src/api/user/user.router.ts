import { Router } from 'express';
import validateSchema from '../../middleware/schemaValidator';
import { registerHandler } from './user.controller';
import { registerSchema } from './user.schema';

const userRoute = Router();

//CREATE
userRoute.post('/', validateSchema(registerSchema), registerHandler);

export default userRoute;
