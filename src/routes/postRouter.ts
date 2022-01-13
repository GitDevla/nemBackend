import { Router } from 'express';
import { postCreateHandler, postReadHandler, postsReadHandler } from '../controller/postController';
import authRequired from '../middleware/authRequired';
import validateSchema from '../middleware/schemaValidator';
import { postCreateSchema } from '../validator/postValidator';
const postRoute = Router();

postRoute.post('/', [authRequired, validateSchema(postCreateSchema)], postCreateHandler);
postRoute.get('/', postsReadHandler);
postRoute.get('/:id', postReadHandler);

export default postRoute;
