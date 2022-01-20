import { array, InferType, number, object, string } from 'yup';

const body = object().shape({
	name: string()
		.typeError('Az névnek stringnek kell lennie')
		.min(1, 'A névnek minimum 1 karakterből kell állnia')
		.max(30, 'Az név maximum 30 karakterből állhat')
		.required('Név megadása kötelező'),
	users: array(number().typeError('Az user id-knek számnak kell lennie').required()).typeError(
		'Az usereknek tömbnek kell lennie',
	),
});

const params = object().shape({
	id: number().typeError('Az id-nek számnak kell lennie').required(),
});

const updateBody = object().shape({
	ownerId: number().typeError('A tulajdonos id-nek számnak kell lennie'),
	name: string()
		.typeError('Az névnek stringnek kell lennie')
		.min(1, 'A névnek minimum 1 karakterből kell állnia')
		.max(30, 'Az név maximum 30 karakterből állhat'),
	users: array(number().typeError('Az user id-knek számnak kell lennie').required()).typeError(
		'Az usereknek tömbnek kell lennie',
	),
});

export const CreateConversationSchema = object({ body });
export const ReadConversationSchema = object({ params });
export const UpdateConversationSchema = object({ params, body: updateBody });
export const DeleteConversationSchema = object({ params });

export type CreateConversationType = InferType<typeof CreateConversationSchema>;
export type ReadConversationType = InferType<typeof ReadConversationSchema>;
export type DeleteConversationType = InferType<typeof DeleteConversationSchema>;
export type UpdateConversationType = InferType<typeof UpdateConversationSchema>;
