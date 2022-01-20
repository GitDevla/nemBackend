import { Request, Response } from 'express';
import { TokenType } from 'src/types/tokenType';
import { NotFound, Unauthorized } from '../../util/ApiErrors';
import responseWrapper from '../../util/responseWrapper';
import { findUserById } from '../user/user.service';
import {
	CreateConversationType,
	DeleteConversationType,
	ReadConversationType,
	UpdateConversationType,
} from './conversation.schema';
import {
	createConversation,
	deleteConversation,
	getAllConversations,
	getConversation,
	updateConversation,
} from './conversation.service';

export const createConversationHandler = async (
	req: Request<{}, {}, CreateConversationType['body']>,
	res: Response,
) => {
	const token: TokenType = res.locals.user;

	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');
	const createdRoom = await createConversation(user, req.body);

	responseWrapper(res, createdRoom);
};

export const readConversationsHandler = async (req: Request, res: Response) => {
	const requestUser: TokenType = res.locals.user;
	const rooms = await getAllConversations();
	const roomsUserIsPartOf = rooms.filter((room) =>
		room.users.some((user) => user.id == requestUser.userId),
	);
	const filtered = roomsUserIsPartOf.map(({ id, name }) => ({ id, name }));
	responseWrapper(res, filtered);
};

export const readConversationHandler = async (
	req: Request<ReadConversationType['params']>,
	res: Response,
) => {
	const requestUser: TokenType = res.locals.user;
	const room = await getConversation(req.params.id);
	if (!room) throw new NotFound('Ez a szoba nem létezik');
	if (!room.users.some((user) => user.id == requestUser.userId))
		throw new Unauthorized('Ezt a chat szobát nem nézheted meg');
	responseWrapper(res, room);
};

export const deleteConversationHandler = async (
	req: Request<DeleteConversationType['params']>,
	res: Response,
) => {
	const token: TokenType = res.locals.user;
	const room = await getConversation(req.params.id);
	if (!room) throw new NotFound('Ez a szoba nem létezik');
	if (room.owner.id != token.userId)
		throw new Unauthorized('Ennek a szobának nem te vagy a tulajdonosa');

	await deleteConversation(room);

	responseWrapper(res);
};

export const updateConversationHandler = async (
	req: Request<UpdateConversationType['params'], {}, UpdateConversationType['body']>,
	res: Response,
) => {
	const token: TokenType = res.locals.user;
	const room = await getConversation(req.params.id);
	if (!room) throw new NotFound('Ez a szoba nem létezik');
	if (room.owner.id != token.userId)
		throw new Unauthorized('Ennek a szobának nem te vagy a tulajdonosa');

	const updated = await updateConversation(room, req.body);

	responseWrapper(res, updated);
};
