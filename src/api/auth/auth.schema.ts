import * as Yup from 'yup';

export const AuthSchema = Yup.object({
	email: Yup.string()
		.typeError('Az emailnek stringnek kell lennie')
		.required('Email megadása kötelező')
		.lowercase(),
	password: Yup.string()
		.typeError('A jelszónak stringnek kell lennie')
		.required('Jelszó megadása kötelező'),
});

export type AuthType = Yup.InferType<typeof AuthSchema>;
