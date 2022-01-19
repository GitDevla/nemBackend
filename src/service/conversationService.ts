import { Conversation } from '../model/conversationModel';
import { User } from '../model/userModel';
import { conversationCreateType } from '../validator/conversationValidator';
import { findUsersByIds } from './userService';

export const createConversation = async (user: User, createData: conversationCreateType) => {
	const room = new Conversation();
	room.name = createData.name;
	room.creator = user;
	let users;
	if (createData.users) users = await findUsersByIds(createData.users);
	room.users = users || [];
	room.messages = [];
	await room.save();
	return room;
};

export const getAllConversations = async () => {
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
