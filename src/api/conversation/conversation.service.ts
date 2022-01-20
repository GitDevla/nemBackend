import { NotFound } from 'src/util/ApiErrors';
import { User } from '../user/user.model';
import { findUsersByIds } from '../user/user.service';
import { Conversation } from './conversation.model';
import { CreateConversationType } from './conversation.schema';

export const createConversation = async (creator: User, createData: CreateConversationType) => {
	const room = new Conversation();
	room.name = createData.name;
	room.creator = creator;
	let users;
	if (createData.users) users = await findUsersByIds(createData.users);
	room.users = users || [];

	const index = room.users.findIndex((user) => user.id === creator.id);
	if (index === -1) {
		room.users.push(creator);
	}

	room.messages = [];
	await room.save();
	return room;
};

export const getAllConversationsUserHasAccessTo = async (userId: number) => {
	const rooms = await Conversation.find({ relations: ['creator', 'users'] });
	return rooms;
};

export const getConversation = async (id: number) => {
	const post = await Conversation.findOne({
		where: { id },
		relations: ['creator', 'users', 'messages'],
	});
	return post;
};

export const deleteConversation = async (id: number) => {
	const post = await Conversation.findOne({
		where: { id },
	});
	if (!post) throw new NotFound('Ez a szoba nem létezik');
	await post?.remove();
	return true;
};
