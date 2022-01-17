import { Request, Response } from 'express';
import { tokenType } from '../model/types/tokenType';
import { createRoom, getAllRooms, getRoom } from '../service/conversationRoomService';
import { findUserById } from '../service/userService';
import { NotFound } from '../util/ApiErrors';
import responseWrapper from '../util/responseWrapper';
import {
	conversationRoomCreateType,
	conversationRoomReadType,
} from '../validator/conversationRoomValidator';

export const conversationRoomCreateHandler = async (
	req: Request<{}, {}, conversationRoomCreateType>,
	res: Response,
) => {
	const token: tokenType = res.locals.token;
	console.log(token);

	const user = await findUserById(token.userId);
	if (!user) throw new NotFound('Ez a felhasználó nem létezik');
	const createdRoom = await createRoom(user, req.body);

	responseWrapper(res, createdRoom);
};

export const conversationRoomsReadHandler = async (req: Request, res: Response) => {
	const posts = await getAllRooms();

	responseWrapper(res, posts);
};

export const conversationRoomReadHandler = async (
	req: Request<conversationRoomReadType, {}, {}>,
	res: Response,
) => {
	const posts = await getRoom(req.params.id);

	responseWrapper(res, posts);
};
