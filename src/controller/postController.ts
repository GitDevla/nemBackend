import { Request, Response } from 'express';
import { tokenType } from '../model/types/tokenType';
import { createPost, getAllPost, getPost } from '../service/postService';
import { findUserById } from '../service/userService';
import { NotFound } from '../util/ApiErrors';
import responseWrapper from '../util/responseWrapper';
import { postCreateType, postReadType } from '../validator/postValidator';

export const postCreateHandler = async (req: Request<{}, {}, postCreateType>, res: Response) => {
	const token: tokenType = res.locals.token;
	console.log(token);

	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');
	const createdPost = await createPost(user, req.body);

	responseWrapper(res, createdPost);
};

export const postsReadHandler = async (req: Request, res: Response) => {
	const posts = await getAllPost();

	responseWrapper(res, posts);
};

export const postReadHandler = async (req: Request<postReadType, {}, {}>, res: Response) => {
	const posts = await getPost(req.params.id);

	responseWrapper(res, posts);
};
