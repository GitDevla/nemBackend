import * as Yup from 'yup';

export const conversationRoomCreateSchema = Yup.object({
	name: Yup.string()
		.typeError('Az névnek stringnek kell lennie')
		.min(1, 'A névnek minimum 1 karakterből kell állnia')
		.max(20, 'Az név maximum 20 karakterből állhat')
		.required('Név megadása kötelező'),
	users: Yup.array(
		Yup.number().typeError('Az user id-knek számnak kell lennie').required(),
	).typeError('Az usereknek tömbnek kell lennie'),
});

export const conversationRoomReadSchema = Yup.object({
	id: Yup.number().typeError('Az id-nek számnak kell lennie').required('Üzenet megadása kötelező'),
});

export type conversationRoomCreateType = Yup.InferType<typeof conversationRoomCreateSchema>;
export type conversationRoomReadType = Yup.InferType<typeof conversationRoomReadSchema>;
