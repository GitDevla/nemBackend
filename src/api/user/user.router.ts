import { Router } from 'express';
import requireUser from 'src/middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import { createUserHandler, readUsersHandler } from './user.controller';
import { CreateUserSchema } from './user.schema';

const userRoute = Router();

// CREATE
userRoute.post('/', validateSchema(CreateUserSchema), createUserHandler);

// READ
userRoute.get('/', requireUser, readUsersHandler);

export default userRoute;
