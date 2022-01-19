import { Conversation } from '../conversation/conversation.model';
import { User } from '../user/user.model';
import { Message } from './message.model';
import { messageCreateType } from './message.schema';

export const createMessage = async (input: messageCreateType, user: User, conv: Conversation) => {
	const message = new Message();
	message.creator = user;
	message.room = conv;
	message.message = input.message;
	await message.save();
	return message;
};
