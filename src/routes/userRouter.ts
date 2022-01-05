import { Router } from 'express';
import { loginHandler } from '../controller/authController';
import { registerHandler } from '../controller/userController';
import validateSchema from '../middleware/schemaValidator';
import { registerSchema } from '../validator/userValidator';

const userRoute = Router();

userRoute.post('/register', validateSchema(registerSchema), registerHandler);

export default userRoute;
