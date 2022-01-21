import { Router } from 'express';
import requireUser from 'src/middleware/requireUser';
import validateSchema from '../../middleware/schemaValidator';
import { updateUserInfoHandler } from './profile.contoller';
import { UpdateProfileSchema } from './profile.schema';

const profileRoute = Router();

// READ
// userRoute.get('/', requireUser, readUsersHandler);
// userRoute.get('/:id', [requireUser, validateSchema(ReadUserSchema)], readUserHandler);

// EDIT
profileRoute.put('/', [requireUser, validateSchema(UpdateProfileSchema)], updateUserInfoHandler);

export default profileRoute;
