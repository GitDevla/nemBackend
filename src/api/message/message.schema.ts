import { InferType, number, object, string } from 'yup';

export const body = object({
	room: number()
		.typeError('Az szobaId-nek számnak kell lennie')
		.required('SzobaId megadása kötelező'),
	message: string()
		.typeError('Az üzenetnek stringnek kell lennie')
		.min(1, 'Az üzenetnek minimum 1 karakterből kell állnia')
		.max(80, 'Az üzenet maximum 80 karakterből állhat')
		.required(),
});

export const CreateMessageSchema = object({ body });

export type CreateMessageType = InferType<typeof CreateMessageSchema>;
