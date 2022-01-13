import { Post } from '../model/postModel';
import { User } from '../model/userModel';
import { postCreateType } from '../validator/postValidator';

export const createPost = async (user: User, postData: postCreateType) => {
	const post = new Post();
	post.message = postData.message;
	post.parent = user;
	await post.save();
	return post;
};

export const getAllPost = async () => {
	const posts = await Post.find({ relations: ['parent'] });
	return posts;
};

export const getPost = async (id: number) => {
	const post = await Post.findOne({ where: { id }, relations: ['parent'] });
	return post;
};
