import * as Yup from 'yup';

export const CreateUserSchema = Yup.object({
	username: Yup.string()
		.typeError('A felhasználónévnek stringnek kell lennie')
		.required('Felhasználónév megadása kötelező'),
	email: Yup.string()
		.typeError('Az emailnek stringnek kell lennie')
		.email('Nem valós email')
		.required('Email megadása kötelező')
		.lowercase(),
	password: Yup.string()
		.typeError('A jelszónak stringnek kell lennie')
		.min(8, 'A jeszónak minimum 8 karakterből kell állnia')
		.max(70, 'A jeszónak maximum 70 karakterből állhat')
		.required('Jelszó megadása kötelező'),
});

export type CreateUserType = Yup.InferType<typeof CreateUserSchema>;
