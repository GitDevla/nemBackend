import * as Yup from 'yup';

export const loginSchema = Yup.object({
	email: Yup.string().email().lowercase().required(),
	password: Yup.string().required(),
});

export type loginType = Yup.InferType<typeof loginSchema>;
