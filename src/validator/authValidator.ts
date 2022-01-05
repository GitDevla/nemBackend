import * as Yup from 'yup';

export const loginSchema = Yup.object({
	email: Yup.string().email().lowercase().required(),
	password: Yup.string().min(5).required(),
});

export type loginType = Yup.InferType<typeof loginSchema>;
