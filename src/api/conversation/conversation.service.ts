import { NotFound } from 'src/util/ApiErrors';
import { User } from '../user/user.model';
import { findUserById, findUsersByIds } from '../user/user.service';
import { Conversation } from './conversation.model';
import { CreateConversationType, UpdateConversationType } from './conversation.schema';

export const createConversation = async (
	creator: User,
	createData: CreateConversationType['body'],
) => {
	const room = new Conversation();
	room.name = createData.name;
	room.owner = creator;
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

export const getAllConversations = async () => {
	const rooms = await Conversation.find({ relations: ['owner', 'users'] });
	return rooms;
};

export const getConversation = async (id: number) => {
	const post = await Conversation.findOne({
		where: { id },
		relations: ['owner', 'users', 'messages'],
	});
	return post;
};

export const deleteConversation = async (conversation: Conversation) => {
	await conversation.remove();
	return true;
};

export const updateConversation = async (
	conversation: Conversation,
	input: UpdateConversationType['body'],
) => {
	if (input.ownerId) {
		const newOwner = await findUserById(input.ownerId);
		if (!newOwner) throw new NotFound('Nincs ilyen felhasználó');
		conversation.owner = newOwner;
	}
	conversation.name = input.name || conversation.name;
	if (input.users) {
		const newUsers = await findUsersByIds(input.users);
		conversation.users = newUsers;
	}
	await conversation.save();
	return conversation;
};
