import { Router } from 'express';
import validateSchema from '../../middleware/schemaValidator';
import { loginHandler } from './auth.controller';
import { loginSchema } from './auth.schema';
const authRoute = Router();

authRoute.post('/', validateSchema(loginSchema), loginHandler);

export default authRoute;
