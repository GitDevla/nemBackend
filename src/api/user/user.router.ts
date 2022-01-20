import { Router } from 'express';
import requireUser from 'src/middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import {
	createUserHandler,
	readUserHandler,
	readUsersHandler,
	updateUserHandler,
} from './user.controller';
import { CreateUserSchema, ReadUserSchema, UpdateUserSchema } from './user.schema';

const userRoute = Router();

// CREATE
userRoute.post('/', validateSchema(CreateUserSchema), createUserHandler);

// READ
userRoute.get('/', requireUser, readUsersHandler);
userRoute.get('/:id', [requireUser, validateSchema(ReadUserSchema)], readUserHandler);

// UPDATE
userRoute.put('/', [requireUser, validateSchema(UpdateUserSchema)], updateUserHandler);

export default userRoute;
