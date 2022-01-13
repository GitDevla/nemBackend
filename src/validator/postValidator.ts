import * as Yup from 'yup';

export const postCreateSchema = Yup.object({
	message: Yup.string()
		.typeError('Az üzenetnek stringnek kell lennie')
		.min(8, 'Az üzenetnek minimum 8 karakterből kell állnia')
		.max(200, 'Az üzenetnek maximum 200 karakterből állhat')
		.required('Üzenet megadása kötelező'),
});

export const postReadSchema = Yup.object({
	id: Yup.number().typeError('Az id-nek számnak kell lennie').required('Üzenet megadása kötelező'),
});

export type postCreateType = Yup.InferType<typeof postCreateSchema>;
export type postReadType = Yup.InferType<typeof postReadSchema>;
