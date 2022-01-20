import { InferType, object, string } from 'yup';

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

export const CreateUserSchema = object({ body });

export type CreateUserType = InferType<typeof CreateUserSchema>;
