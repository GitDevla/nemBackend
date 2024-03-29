import { Router } from 'express';
import requireUser from 'src/middleware/requireUser';
import { NotFound } from '../util/ApiErrors';
import authRoute from './auth/auth.router';
import conversationRoute from './conversation/conversation.router';
import messageRoute from './message/message.router';
import profileRoute from './profile/profile.router';
import userRoute from './user/user.router';
const routes = Router();

routes.use('/auth', authRoute);
routes.use('/user', userRoute);
routes.use('/profile', profileRoute);
routes.use('/conversation', requireUser, conversationRoute);
routes.use('/message', messageRoute);
routes.all('*', () => {
	throw new NotFound('Nincs ilyen route');
}); //404

export default routes;
