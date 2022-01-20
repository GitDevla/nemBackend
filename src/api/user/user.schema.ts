import { InferType, number, object, string } from 'yup';

export const body = object().shape({
	username: string()
		.typeError('A felhasználónévnek stringnek kell lennie')
		.required('Felhasználónév megadása kötelező'),
	email: string()
		.typeError('Az emailnek stringnek kell lennie')
		.email('Nem valós email')
		.required('Email megadása kötelező')
		.lowercase(),
	password: string()
		.typeError('A jelszónak stringnek kell lennie')
		.min(8, 'A jeszónak minimum 8 karakterből kell állnia')
		.max(70, 'A jeszónak maximum 70 karakterből állhat')
		.required('Jelszó megadása kötelező'),
});

export const params = object().shape({
	id: number().typeError('Az id-nek számnak kell lennie').required(),
});

export const notRequiredBody = object().shape({
	username: string().typeError('A felhasználónévnek stringnek kell lennie'),
	email: string()
		.typeError('Az emailnek stringnek kell lennie')
		.email('Nem valós email')
		.lowercase(),
	password: string()
		.typeError('A jelszónak stringnek kell lennie')
		.min(8, 'A jeszónak minimum 8 karakterből kell állnia')
		.max(70, 'A jeszónak maximum 70 karakterből állhat'),
});

export const CreateUserSchema = object({ body });
export const ReadUserSchema = object({ params });
export const UpdateUserSchema = object({ body: notRequiredBody });

export type CreateUserType = InferType<typeof CreateUserSchema>;
export type ReadUserType = InferType<typeof ReadUserSchema>;
export type UpdateUserType = InferType<typeof UpdateUserSchema>;
