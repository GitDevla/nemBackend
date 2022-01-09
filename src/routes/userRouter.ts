import { Router } from 'express';
import { registerHandler } from '../controller/userController';
import validateSchema from '../middleware/schemaValidator';
import { registerSchema } from '../validator/userValidator';

const userRoute = Router();

//CREATE
userRoute.post('/', validateSchema(registerSchema), registerHandler);

export default userRoute;
