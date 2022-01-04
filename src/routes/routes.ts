import { Router } from 'express';
import { NotFound } from '../util/ApiErrors';
const routes = Router();

routes.all('*', () => {
	throw new NotFound('Nincs ilyen route');
}); //404

export default routes;
