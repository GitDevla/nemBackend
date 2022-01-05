import { Router } from 'express';
import { NotFound } from '../util/ApiErrors';
import authRoute from './authRouter';
const routes = Router();

routes.use('/auth', authRoute);
routes.all('*', () => {
	throw new NotFound('Nincs ilyen route');
}); //404

export default routes;
