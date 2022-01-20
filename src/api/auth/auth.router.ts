import { Router } from 'express';
import validateSchema from '../../middleware/schemaValidator';
import { authHandler } from './auth.controller';
import { AuthSchema } from './auth.schema';
const authRoute = Router();

authRoute.post('/', validateSchema(AuthSchema), authHandler);

export default authRoute;
