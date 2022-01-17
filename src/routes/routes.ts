import { Router } from 'express';
import { NotFound } from '../util/ApiErrors';
import authRoute from './authRouter';
import conversationRoomRoute from './conversationRoomRouter';
import userRoute from './userRouter';
const routes = Router();

routes.use('/auth', authRoute);
routes.use('/user', userRoute);
routes.use('/conversationRoom', conversationRoomRoute);
routes.all('*', () => {
	throw new NotFound('Nincs ilyen route');
}); //404

export default routes;
