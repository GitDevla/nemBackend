import * as Yup from 'yup';

export const CreateConversationSchema = Yup.object({
	name: Yup.string()
		.typeError('Az névnek stringnek kell lennie')
		.min(1, 'A névnek minimum 1 karakterből kell állnia')
		.max(30, 'Az név maximum 30 karakterből állhat')
		.required('Név megadása kötelező'),
	users: Yup.array(
		Yup.number().typeError('Az user id-knek számnak kell lennie').required(),
	).typeError('Az usereknek tömbnek kell lennie'),
});

export const ReadConversationSchema = Yup.object({
	id: Yup.number().typeError('Az id-nek számnak kell lennie').required('Üzenet megadása kötelező'),
});

export type CreateConversationType = Yup.InferType<typeof CreateConversationSchema>;
export type ReadonversationType = Yup.InferType<typeof ReadConversationSchema>;
