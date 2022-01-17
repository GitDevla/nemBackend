import { ConversationRoom } from '../model/conversationRoomModel';
import { User } from '../model/userModel';
import { conversationRoomCreateType } from '../validator/conversationRoomValidator';
import { findUsersByIds } from './userService';

export const createRoom = async (user: User, createData: conversationRoomCreateType) => {
	const room = new ConversationRoom();
	room.name = createData.name;
	room.creator = user;
	let users;
	if (createData.users) users = await findUsersByIds(createData.users);
	room.users = users || [];
	await room.save();
	return room;
};

export const getAllRooms = async () => {
	const rooms = await ConversationRoom.find({ relations: ['creator', 'users'] });
	return rooms;
};

export const getRoom = async (id: number) => {
	const post = await ConversationRoom.findOne({ where: { id }, relations: ['parent'] });
	return post;
};
