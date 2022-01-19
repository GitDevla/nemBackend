import { Router } from 'express';
import { NotFound } from '../util/ApiErrors';
import authRoute from './auth/auth.router';
import conversationRoute from './conversation/conversation.router';
import messageRoute from './message/message.router';
import userRoute from './user/user.router';
const routes = Router();

routes.use('/auth', authRoute);
routes.use('/user', userRoute);
routes.use('/conversation', conversationRoute);
routes.use('/message', messageRoute);
routes.all('*', () => {
	throw new NotFound('Nincs ilyen route');
}); //404

export default routes;
