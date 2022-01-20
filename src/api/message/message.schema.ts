import * as Yup from 'yup';

export const CreateMessageSchema = Yup.object({
	room: Yup.number()
		.typeError('Az szobaId-nek számnak kell lennie')
		.required('SzobaId megadása kötelező'),
	message: Yup.string()
		.typeError('Az üzenetnek stringnek kell lennie')
		.min(1, 'Az üzenetnek minimum 1 karakterből kell állnia')
		.max(80, 'Az üzenet maximum 80 karakterből állhat')
		.required(),
});

export type CreateMessageType = Yup.InferType<typeof CreateMessageSchema>;
