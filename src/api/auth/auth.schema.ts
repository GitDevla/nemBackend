import { InferType, object, string } from 'yup';

export const body = object().shape({
	email: string()
		.typeError('Az emailnek stringnek kell lennie')
		.required('Email megadása kötelező')
		.lowercase(),
	password: string()
		.typeError('A jelszónak stringnek kell lennie')
		.required('Jelszó megadása kötelező'),
});

export const AuthSchema = object({ body });

export type AuthType = InferType<typeof AuthSchema>;
