import { Router } from 'express';
import { loginHandler } from '../controller/authController';
import validateSchema from '../middleware/schemaValidator';
import { loginSchema } from '../validator/authValidator';
const authRoute = Router();

authRoute.post('/', validateSchema(loginSchema), loginHandler);

export default authRoute;
