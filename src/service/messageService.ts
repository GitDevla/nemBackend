import { Conversation } from '../model/conversationModel';
import { Message } from '../model/messageModel';
import { User } from '../model/userModel';
import { messageCreateType } from '../validator/messageValidator';

export const createMessage = async (input: messageCreateType, user: User, conv: Conversation) => {
	const message = new Message();
	message.creator = user;
	message.room = conv;
	message.message = input.message;
	await message.save();
	return message;
};
