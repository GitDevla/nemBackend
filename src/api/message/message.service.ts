import { NotFound } from 'src/util/ApiErrors';
import { Conversation } from '../conversation/conversation.model';
import { User } from '../user/user.model';
import { Message } from './message.model';
import { CreateMessageType } from './message.schema';

export const createMessage = async (input: CreateMessageType['body'], creatorId: number) => {
	const conv = await Conversation.findOne({ id: input.room });
	if (!conv) throw new NotFound('Nincs ilyen beszélgetés');

	const creator = await User.findOne({ id: creatorId });
	if (!creator) throw new NotFound('Nincs ilyen felhasználó');

	const message = new Message();
	message.creator = creator;
	message.room = conv;
	message.message = input.message;
	await message.save();
	return message;
};
